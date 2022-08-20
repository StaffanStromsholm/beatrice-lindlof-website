import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import paintRollerSvg from "../images/roller-paint-roller-svgrepo-com.svg";
import { E_Font } from "./Font";
import { keyframes } from "styled-components";
import profileImg from "../images/profileImg.jpeg";
import { app } from "../firebase-config";
import { Context, T_Language } from "../Context";

const db = app.database();

type T_LanguageSelectionProps = {
    onClick?: (e?: any) => Promise<void> | void;
};

// const swipe = keyframes`
//     0% { left: -1000px; }
//     100% { left: 1500px; }
// `;

const fadein = keyframes`
    0% { opacity: 0; }
    70% { opacity: 0; }
    100% { opacity: 1; }
`;

const HeroBannerWrapper = styled.div`
    width: 100%;
    height: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 70px;
    @media (max-width: 768px) {
        // height: 900px;
    }
`;

const LogoWrapper = styled.div`
    width: 300px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    animation-name: ${fadein};
    animation-duration: 1s;
`;

const NickName = styled.div`
    font-family: "Sacramento", cursive;
    font-size: 3rem;
    color: white;
    margin-bottom: -20px;
    margin-left: -10px;
`;

const PaintRoller = styled.img`
    width: 30px;
    filter: invert(100%) sepia(0%) saturate(1352%) hue-rotate(87deg)
        brightness(119%) contrast(119%);
`;

// const PaintRollerSwipe = styled.img`
//     width: 400px;
//     filter: invert(100%) sepia(0%) saturate(1352%) hue-rotate(87deg)
//     brightness(119%) contrast(119%);
//     transform: rotate(-90deg);
//     position: absolute;
//     left: -1000px;
//     animation-name: ${swipe};
//     animation-duration: 4s;
// `;

const Name = styled.div`
    font-family: ${E_Font.FONT_FAMILY}
    letter-spacing: 5px;
    font-size: 1.8rem;
    color: white;
    border-top: 1px solid white;

`;

const CatchPhrasePhotoWrapper = styled.div`
    display: flex;
    width: 600px;
    align-items: center;
    @media (max-width: 768px) {
        flex-direction: column;
        width: 300px;
    }
`;

const CatchPhrase = styled.div`
    // color: #776622;
    color: white;
    font-family: ${E_Font.FONT_FAMILY}
    // font-family: "Sacramento", cursive;
    // font-family: 'Cookie', cursive;
    animation-name: ${fadein};
    animation-duration: 1s;
    width: 600px;
    text-align: center;
    font-size: 1.5rem;
    line-height: 1;
    margin-right: 5px;
    
    @media (max-width: 768px) {
        width: 330px;
        margin-bottom: 50px;
      }
`;

const ProfilePictureWrapper = styled.div`
    width: fit-content;
    margin: 0 auto;
    display: flex;
    // justify-content: flex-end;
    animation-name: ${fadein};
    animation-duration: 1s;

    @media (max-width: 768px) {
        width: 320px;
        height: 320px;
        border-radius: 8px;
    }
`;

const ProfilePicture = styled.div`
    background-image: url(${profileImg});
    background-color: #cccccc;
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;

    height: 300px;
    width: 300px;
    border-radius: 50%;
    border: 7px solid #776622;
    border: 1px solid white;
    box-shadow: 0px 2px 8px #2b2b2b;

    // @media (max-width: 768px) {
    //     width: 320px;
    //     height: 640px;
    //     border-radius: 8px;
    //     margin: 0 auto;
    //     position: relative;
    // }
`;

const LanguageWrapper = styled.div`
    position: absolute;
    right: 30px;
    top: 100px;
`;

const LanguageSelection = styled.span<T_LanguageSelectionProps>`
    cursor: pointer;
`;

export default function HeroBanner() {
    const [catchPhraseSv, setCatchPhraseSv] = useState<any>(null);
    const [catchPhraseFi, setCatchPhraseFi] = useState<any>(null);
    const context = useContext(Context);

    const languageHandler = (language: T_Language) => {
        context?.setLanguageHandler(language);
    };

    useEffect(() => {
    }, [context?.language])

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
        <HeroBannerWrapper id="home">
            <LanguageWrapper>
                <LanguageSelection onClick={() => languageHandler("sv")}>Sv</LanguageSelection> | 
                <LanguageSelection onClick={() => languageHandler("fi")}> Fi</LanguageSelection>
            </LanguageWrapper>
            <LogoWrapper>
                <NickName>
                    Målar
                    <PaintRoller src={paintRollerSvg} />
                    rissan
                </NickName>
                <Name>Beatrice Lindlöf</Name>
            </LogoWrapper>
            <CatchPhrasePhotoWrapper>
                {context?.language === "sv" && <CatchPhrase>
                    {catchPhraseSv && catchPhraseSv.text}
                </CatchPhrase>}
                {context?.language === "fi" && <CatchPhrase>
                    {catchPhraseFi && catchPhraseFi.text}
                </CatchPhrase>}
                
                {/* <PaintRollerSwipe src={paintRollerSvg} /> */}
                <ProfilePictureWrapper>
                    <ProfilePicture />
                </ProfilePictureWrapper>
            </CatchPhrasePhotoWrapper>
        </HeroBannerWrapper>
    );
}
