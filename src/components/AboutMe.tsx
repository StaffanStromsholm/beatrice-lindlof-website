import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { app } from "../firebase-config";
import { E_Font, Font } from "./Font";
import { E_Padding } from "../LayoutEnums";
import { Context } from "../Context";
import { getDbData } from "../api";

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
    const [aboutMeSv, setAboutMeSv] = useState<T_AboutMe | null>(null);
    const [aboutMeFi, setAboutMeFi] = useState<T_AboutMe | null>(null);
    const context = useContext(Context);

    useEffect(() => {
        const aboutMeSv: any = getDbData("aboutMeSv");
        aboutMeSv && setAboutMeSv(aboutMeSv);
    }, []);

    useEffect(() => {
        const aboutMeFi: any = getDbData("aboutMeFi");
        setAboutMeFi(aboutMeFi);
    }, []);

    return (
        <TextWrapper id="about">
            <Font weight={"light"} size={E_Font.FONT_SIZE_TITLE}>
                {context?.language === "sv" && "Om mig"}
                {context?.language === "fi" && "Tietoa minusta"}
            </Font>
            <br></br>
            <Font weight={"light"}>
                {context?.language === "sv" && aboutMeSv && aboutMeSv.text}
                {context?.language === "fi" && aboutMeFi && aboutMeFi.text}
            </Font>
        </TextWrapper>
    );
}
