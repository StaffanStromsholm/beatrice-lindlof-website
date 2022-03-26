import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

import { app } from "../firebase-config";
import { Context } from "../Context";
import styled from "styled-components";
import { E_Font, Font } from "../components/Font";
import { Button } from "../components/Button";

const db = app.database();

const EditPageWrapper = styled.div`
    width: fit-content;
    margin: 50px auto 30px auto;
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
    const [postSv, setPostSv] = useState({ text: "" });
    const [postFi, setPostFi] = useState({ text: "" });
    const [catchPhraseSv, setCatchPhraseSv] = useState({ text: "" });
    const [catchPhraseFi, setCatchPhraseFi] = useState({ text: "" });

    const history = useHistory();

    const handleChangeSv = (e: any) => {
        setPostSv({ text: e.target.value });
    };

    const handleChangeFi = (e: any) => {
        setPostFi({ text: e.target.value });
    };

    const handleChangeCatchPhraseSv = (e: any) => {
        setCatchPhraseSv({text: e.target.value})
    }

    const handleChangeCatchPhraseFi = (e: any) => {
        setCatchPhraseFi({text: e.target.value})
    }

    const handleAddPostSv = () => {
        if (postSv.text.length === 0) return;
        let ref = db.ref("aboutMeSv");
        ref.push(postSv);

        history.push(`/`);
    };

    const handleAddPostFi = () => {
        if (postFi.text.length === 0) return;
        let ref = db.ref("aboutMeFi");
        ref.push(postFi);

        history.push(`/`);
    };

    const handleAddCatchPhraseSv = () => {
        if (catchPhraseSv.text.length === 0) return;
        let ref = db.ref("catchPhraseSv");
        ref.push(catchPhraseSv);

        history.push(`/`);
    }

    const handleAddCatchPhraseFi = () => {
        if (catchPhraseFi.text.length === 0) return;
        let ref = db.ref("catchPhraseFi");
        ref.push(catchPhraseFi);

        history.push(`/`);
    }

    const getDbData = (dbRef: string) => {
        var postArray;
        const postRef = db.ref(dbRef);

        return postRef.on("value", (snapshot) => {
            const posts = snapshot.val();
            const postList = [];

            for (let id in posts) {
                postList.push({ id, ...posts[id] });
            }

            postArray = postList;

            return postArray[postArray.length - 1];
        });
    }

    useEffect(() => {
        var postArray;
        const postRef = db.ref("aboutMeSv");

        postRef.on("value", (snapshot) => {
            const posts = snapshot.val();
            const postList = [];

            for (let id in posts) {
                postList.push({ id, ...posts[id] });
            }

            postArray = postList;

            setPostSv(postArray[postArray.length - 1]);
        });
    }, []);

    useEffect(() => {
        var postArray;
        const postRef = db.ref("aboutMeFi");

        postRef.on("value", (snapshot) => {
            const posts = snapshot.val();
            const postList = [];

            for (let id in posts) {
                postList.push({ id, ...posts[id] });
            }

            postArray = postList;

            setPostFi(postArray[postArray.length - 1]);
        });
    }, []);

    useEffect(() => {
        var postArray;
        const postRef = db.ref("catchPhraseSv");

        postRef.on("value", (snapshot) => {
            const posts = snapshot.val();
            const postList = [];

            for (let id in posts) {
                postList.push({ id, ...posts[id] });
            }

            postArray = postList;

            setCatchPhraseSv(postArray[postArray.length - 1]);
        });
    }, []);

    useEffect(() => {
        var postArray;
        const postRef = db.ref("catchPhraseFi");

        postRef.on("value", (snapshot) => {
            const posts = snapshot.val();
            const postList = [];

            for (let id in posts) {
                postList.push({ id, ...posts[id] });
            }

            postArray = postList;

            setCatchPhraseFi(postArray[postArray.length - 1]);
        });
    }, []);
    
    return (
        <EditPageWrapper>
            <Font size={E_Font.FONT_SIZE_TITLE}>Om mig sv</Font>
            <br></br>
            <StyledTextarea
                rows={25}
                onChange={handleChangeSv}
                value={postSv.text}
            />
            <Button onClick={handleAddPostSv}>Spara</Button>
            <br />
            <br />

            <Font size={E_Font.FONT_SIZE_TITLE}>Om mig fi</Font>
            <br></br>
            <StyledTextarea
                rows={25}
                onChange={handleChangeFi}
                value={postFi.text}
            />
            <Button onClick={handleAddPostFi}>Spara</Button>
            <br />
            <br />

            <Font size={E_Font.FONT_SIZE_TITLE}>Catch phrase sv</Font>
            <br></br>
            <StyledTextarea
                rows={3}
                onChange={handleChangeCatchPhraseSv}
                value={catchPhraseSv.text ? catchPhraseSv.text : ""}
            />
            <Button onClick={handleAddCatchPhraseSv}>Spara</Button>

            <br />
            <br />
            <Font size={E_Font.FONT_SIZE_TITLE}>Catch phrase fi</Font>
            <br></br>
            <StyledTextarea
                rows={3}
                onChange={handleChangeCatchPhraseFi}
                value={catchPhraseFi.text ? catchPhraseFi.text : ""}
            />
            <Button onClick={handleAddCatchPhraseFi}>Spara</Button>
        </EditPageWrapper>
    );
};

export default EditAboutMe;
