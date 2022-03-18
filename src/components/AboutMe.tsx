import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { app } from "../firebase-config";
import { E_Font, Font } from "./Font";
import profileImg from "../images/profileImg.jpeg";
import { E_Padding } from "../LayoutEnums";

const TextWrapper = styled.div`
    background-color: white;
    opacity: 1;
    border-radius: 8px;
    padding: ${E_Padding.CONTENT_WRAPPER};
    width: 600px;
    margin: 30px auto 0 auto;
    white-space: pre-wrap;
    line-height: 1.5;
    @media (max-width: 768px) {
        width: 280px;
    }
`;

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
            <TextWrapper>
                <Font weight={"light"} size={E_Font.FONT_SIZE_TITLE}>
                    Om mig
                </Font>
                <br></br>
                <Font weight={"light"}>{aboutMe && aboutMe.text}</Font>
            </TextWrapper>
    );
}
