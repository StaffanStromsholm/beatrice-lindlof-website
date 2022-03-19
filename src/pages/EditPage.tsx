import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

import { app } from "../firebase-config";
import { AuthContext } from "../AuthContext";
import styled from "styled-components";
import { E_Font, Font } from "../components/Font";
import { Button } from "../components/Button";

const db = app.database();

const EditPageWrapper = styled.div`
    width: fit-content;
    margin: 50px auto 0 auto;
`;

const StyledTextarea = styled.textarea`
    border: 1px solid gray;
    border-radius: 5px;
    width: 300px;
    font-family: 'Raleway';
    line-height: 1.3;
    rows: 5;
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
            <Font size={E_Font.FONT_SIZE_TITLE}>Om mig</Font>
            <br></br>
            <StyledTextarea
                rows={25}
                onChange={handleChange}
                value={post.text}
            />
            <Button onClick={handleAddPost}>Spara</Button>
        </EditPageWrapper>
    );
};

export default EditAboutMe;
