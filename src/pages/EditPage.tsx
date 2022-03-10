import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

import { app } from "../firebase-config";
import { AuthContext } from "../AuthContext";
import styled from "styled-components";
import { E_Font, Font } from "../components/Font";
import { Button } from "../components/Button";

const db = app.database();

const EditPageWrapper = styled.div`
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

const EditAboutMe = () => {
    const [post, setPost] = useState({ text: "" });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const history = useHistory();

    const handleChange = (e: any) => {
        setPost({ text: e.target.value });
    };

    const handleAddPost = () => {
        if (post.text.length === 0) return;
        let ref = db.ref("aboutMe");
        ref.push(post);

        history.push(`/`);
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
        <EditPageWrapper>
            <Font>Om mig</Font>
            <StyledTextarea onChange={handleChange} value={post.text} />
            <Button onClick={handleAddPost}>Spara</Button>
        </EditPageWrapper>
    );
};

export default EditAboutMe;
