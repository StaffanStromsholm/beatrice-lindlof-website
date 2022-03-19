import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { app } from "../firebase-config";
import { E_Padding } from "../LayoutEnums";
import { E_Font, Font } from "./Font";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ContactWrapper = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: ${E_Padding.CONTENT_WRAPPER};
    width: 600px;
    margin: 30px auto 0 auto;
    @media (max-width: 768px) {
        width: 280px;
    }
`;

export default function Contact() {
    return (
        <ContactWrapper id="contact">
            <Font weight={"light"} size={E_Font.FONT_SIZE_TITLE}>
                Kontakt
            </Font>
            <br></br>
            <Font weight={"light"}>
                <FontAwesomeIcon
                    style={{ marginRight: "5px" }}
                    color={"#776622"}
                    icon={faPhone}
                />{" "}
                0401633225
            </Font>
            <br />
            <Font weight={"light"}>
                <FontAwesomeIcon
                    style={{ marginRight: "5px" }}
                    color={"#776622"}
                    icon={faEnvelope}
                />{" "}
                lindlof.beatrice@gmail.com
            </Font>
        </ContactWrapper>
    );
}
