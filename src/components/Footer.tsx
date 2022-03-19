import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from "@fortawesome/free-brands-svg-icons"

import React from 'react'
import styled from 'styled-components'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const FooterWrapper = styled.div`
    width: 100%;
    height: 80px;
    background-color: #A3C4CC;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    position: relative;
`

export default function Footer() {
    return (
        <FooterWrapper>
            <span style={{color: "grey"}}>Website by Staffan Strömsholm <a style={{color: "#776622"}} href="mailto: staffan.stromsholm@gmail.com"><FontAwesomeIcon icon={faEnvelope} size={"1x"} /></a></span>
        </FooterWrapper>
    )
}
