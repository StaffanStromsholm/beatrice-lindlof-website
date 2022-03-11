import React from "react";
import styled from "styled-components";
import paintRollerSvg from "../images/roller-paint-roller-svgrepo-com.svg";
import { E_Font } from "./Font";
import { keyframes } from "styled-components";

const swipe = keyframes`
    0% { left: -1000px; }
    100% { left: 1500px; }
`;

const fadein = keyframes`
    0% { opacity: 0; }
    70% { opacity: 0; }
    100% { opacity: 1; }
`;

const HeroBannerWrapper = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const LogoWrapper = styled.div`
    width: 300px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    animation-name: ${fadein};
    animation-duration: 1.5s;
`;

const NickName = styled.div`
    font-family: "Sacramento", cursive;
    font-size: 3rem;
    color: white;
    margin-left: -10px;
`;

const PaintRoller = styled.img`
    width: 30px;
    filter: invert(100%) sepia(0%) saturate(1352%) hue-rotate(87deg)
    brightness(119%) contrast(119%);
`;

const PaintRollerSwipe = styled.img`
    width: 400px;
    filter: invert(100%) sepia(0%) saturate(1352%) hue-rotate(87deg)
    brightness(119%) contrast(119%);
    transform: rotate(-90deg);
    position: absolute;
    left: -1000px;
    animation-name: ${swipe};
    animation-duration: 2s;
`;

const Name = styled.div`
    font-family: ${E_Font.FONT_FAMILY}
    letter-spacing: 5px;
    font-size: 1.8rem;
    color: white;
`;

const CatchPhrase = styled.div`
    color: #776622;
    font-family: ${E_Font.FONT_FAMILY}
    animation-name: ${fadein};
    animation-duration: 1.5s;`;

export default function HeroBanner() {
    return (
        <HeroBannerWrapper>
            <LogoWrapper>
                <NickName>
                    Målar
                    <PaintRoller src={paintRollerSvg} />
                    rissan
                </NickName>
                <Name>Beatrice Lindlöf</Name>
            </LogoWrapper>
            <CatchPhrase>En bra mening om vad jag håller på med</CatchPhrase>
            <PaintRollerSwipe src={paintRollerSvg} />
        </HeroBannerWrapper>
    );
}
