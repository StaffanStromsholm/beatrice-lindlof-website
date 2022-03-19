import React from 'react'
import { Font, E_Font } from '../components/Font'
import Header from "../components/Header";
import AboutMe from '../components/AboutMe';
import Gallery from "../components/Gallery";
import Contact from '../components/Contact';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';

export default function FrontPage() {
    return (
        <>
            <Header />
            <HeroBanner />
            <AboutMe />
            <Contact />
            <Gallery />
            <Footer />
        </>
    )
}
