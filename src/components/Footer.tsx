import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from "@fortawesome/free-brands-svg-icons"

import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.div`
    width: 100%;
    height: 50px;
    background-color: #A3C4CC;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`

export default function Footer() {
    return (
        <FooterWrapper>
            <FontAwesomeIcon size={"2x"} icon={faInstagram} />
        </FooterWrapper>
    )
}
