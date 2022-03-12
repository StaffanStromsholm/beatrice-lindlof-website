import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { app } from "../firebase-config";
import { E_Font, Font } from "./Font";
import profileImg from "../images/profileImg.jpeg";

const AboutMeWrapper = styled.div`
    background-image: url(${profileImg});
    background-color: #cccccc;
    height: fit-content;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 500px;
    width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin: 0 auto;
    border-radius: 8px;
    line-height: 1.3;
    `;   

const TextWrapper = styled.div`
    background-color: white;
    opacity: 1;
    border-radius: 8px;
    padding: 10px;
`

const db = app.database();

type T_AboutMe = {
    text: string;
};

export default function AboutMe() {
    const [aboutMe, setAboutMe] = useState<T_AboutMe | null>(null);

    useEffect(() => {
        var aboutMeArray;
        const aboutMeRef = db.ref("aboutMe");

        aboutMeRef.on("value", (snapshot: any) => {
            const aboutMes = snapshot.val();
            const aboutMeList = [];

            for (let id in aboutMes) {
                aboutMeList.push({ id, ...aboutMes[id] });
            }

            aboutMeArray = aboutMeList;

            setAboutMe(aboutMeArray[aboutMeArray.length - 1]);
        });
    }, []);

    return (
        <AboutMeWrapper>
            <TextWrapper>
                <Font weight={"light"} size={E_Font.FONT_SIZE_TITLE}>
                    Om mig
                </Font>
                <br></br>
                <Font weight={"light"}>{aboutMe && aboutMe.text}</Font>
            </TextWrapper>
        </AboutMeWrapper>
    );
}
