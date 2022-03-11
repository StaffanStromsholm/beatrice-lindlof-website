import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { app } from "../firebase-config";
import { E_Font, Font } from './Font';

const ContactWrapper = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 10px;
    width: 280px;
    margin: 30px auto 0 auto;
`

export default function Contact() {

    return (
        <ContactWrapper>
            <Font weight={"light"} size={E_Font.FONT_SIZE_TITLE}>Kontakt</Font>
            <br></br>
            <Font weight={"light"}>Telefon</Font>
            <Font weight={"light"}>Epost</Font>
        </ContactWrapper>
    )
}