import React, { useEffect, useState } from 'react'
import { app } from "../firebase-config";
import { E_Font, Font } from './Font';

export default function Contact() {

    return (
        <div>
            <Font weight={"light"} size={E_Font.FONT_SIZE_TITLE}>Kontakt</Font>
            <Font weight={"light"}>Telefon</Font>
            <Font weight={"light"}>Epost</Font>
        </div>
    )
}