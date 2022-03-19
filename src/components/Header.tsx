import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import * as Scroll from 'react-scroll';
import { animateScroll as scroll} from 'react-scroll';


let Link = Scroll.Link;

const HeaderWrapper = styled.ul`
    width: 100%;
    height: 80px;
    background-color: white;
    margin: 0;
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    position: fixed;
    z-index: 90;
    
`

const HeaderItem = styled.li`
    padding: 0 12px;
    margin: 0 26px;
    color: #776622;
    cursor: pointer;
    font-size: 1.3rem;
    :hover {
        border-top: 2px solid white;
        border-bottom: 2px solid #776622;
        color: black;
    }

    @media (max-width: 768px) {
        padding: 0 8px;
        margin: 0 8px;
        font-size: 1rem;
      }
    
`

export default function Header() {
    return (
        <HeaderWrapper>
            <HeaderItem><Link onClick={() => scroll.scrollToTop({ duration: 0 })} to="home" smooth="true">Home</Link></HeaderItem>
            <HeaderItem><Link to="about" smooth="true" offset={-80}>Om mig</Link></HeaderItem>
            <HeaderItem><Link to="contact" smooth="true" offset={-80}>Kontakt</Link></HeaderItem>
            <HeaderItem><Link to="gallery" smooth="true" offset={-80}>Galleri</Link></HeaderItem>
            <HeaderItem><FontAwesomeIcon color={"#776622"} size={"2x"} icon={faInstagram} />
</HeaderItem>
        </HeaderWrapper>
    )
}
