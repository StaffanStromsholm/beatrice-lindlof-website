import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

import { app } from "../firebase-config";
import { AuthContext } from "../AuthContext";
import styled from "styled-components";
import { E_Font, Font } from "../components/Font";
import { Button } from "../components/Button";

const db = app.database();

const EditGalleryWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`;

const StyledTextarea = styled.textarea`
    border: 1px solid gray;
    border-radius: 5px;
    width: 300px;
    height: 30px;
`;

const EditGallery = () => {
    const [post, setPost] = useState({ text: "" });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const history = useHistory();

    const handleChange = (e: any) => {
        setPost({ text: e.target.value });
    };

    // const handleAddPost = () => {
    //     if (post.text.length === 0) return;
    //     let ref = db.ref("aboutMe");
    //     ref.push(post);

    //     history.push(`/`);
    // };

    const handleAddPost = () => {
        let postRef = app.database().ref("galleryImages");
        postRef.push({fileUrl});
        history.push("/");
    };

    const handleFileChange = async (e: any) => {
        const file = e.target.files[0];
        console.log(file);
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(new Date().toISOString() + file.name);
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL());
    };

    useEffect(() => {
        var postArray;
        const postRef = db.ref("aboutMe");

        postRef.on("value", (snapshot) => {
            const posts = snapshot.val();
            const postList = [];

            for (let id in posts) {
                postList.push({ id, ...posts[id] });
            }

            postArray = postList;

            setPost(postArray[postArray.length - 1]);
        });
    }, []);

    return (
        <EditGalleryWrapper>
            <Font>Lägg till gallerifoto</Font>

            <form id="image">
                <div>
                    <label htmlFor="image">Foto *</label>
                </div>
                <input
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    type="file"
                    required
                    style={{ width: "100%" }}
                />
                <Button onClick={handleAddPost}>Spara</Button>
            </form>
        </EditGalleryWrapper>
    );
};

export default EditGallery;
