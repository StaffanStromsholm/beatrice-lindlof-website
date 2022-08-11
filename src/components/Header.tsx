import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import styled from "styled-components";
import * as Scroll from "react-scroll";
import { animateScroll as scroll } from "react-scroll";
import { Context } from "../Context";

let Link = Scroll.Link;

const HeaderWrapper = styled.ul`
    width: 100%;
    height: 80px;
    background-color: rgb(240, 240, 240);
    margin: 0;
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    position: fixed;
    z-index: 2;
`;

const HeaderItem = styled.li`
    padding: 0 12px;
    margin: 0 26px;
    color: #776622;
    cursor: pointer;
    font-size: 1.3rem;
    :hover {
        border-top: 2px solid rgb(240, 240, 240);
        border-bottom: 2px solid #776622;
        color: black;
    }

    @media (max-width: 768px) {
        padding: 0 3px;
        margin: 0 3px;
        font-size: 0.9rem;
    }
`;

export default function Header() {
    const context = useContext(Context);

    return (
        <HeaderWrapper>
            <HeaderItem>
                <Link
                    onClick={() => scroll.scrollToTop({ duration: 0 })}
                    to="home"
                    smooth="true"
                >
                    Home
                </Link>
            </HeaderItem>
            <HeaderItem>
                <Link to="about" smooth="true" offset={-80}>
                    {context?.language === "sv" && "Om mig"}
                    {context?.language === "fi" && "Minusta"}
                </Link>
            </HeaderItem>
            <HeaderItem>
                <Link to="contact" smooth="true" offset={-80}>
                    {context?.language === "sv" && "Kontakt"}
                    {context?.language === "fi" && "Yhteystiedot"}
                </Link>
            </HeaderItem>
            <HeaderItem>
                <Link to="gallery" smooth="true" offset={-80}>
                    {context?.language === "sv" && "Galleri"}
                    {context?.language === "fi" && "Galleria"}
                </Link>
            </HeaderItem>
            <HeaderItem>
                <FontAwesomeIcon
                    color={"#776622"}
                    size={"2x"}
                    icon={faInstagram}
                    onClick={() => window.location.href = "https://www.instagram.com/malartrissan/"}
                />
            </HeaderItem>
        </HeaderWrapper>
    );
}
