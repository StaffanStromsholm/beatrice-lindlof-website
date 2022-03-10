import React, { useEffect, useState } from 'react'
import { app } from "../firebase-config";
import { E_Font, Font } from './Font';

const db = app.database();

type T_AboutMe = {
    text: string;
}

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
    }, [])

    return (
        <div>
            <Font weight={"light"} size={E_Font.FONT_SIZE_TITLE}>Om mig</Font>

            <Font weight={"light"}>{aboutMe && aboutMe.text}</Font>
        </div>
    )
}
