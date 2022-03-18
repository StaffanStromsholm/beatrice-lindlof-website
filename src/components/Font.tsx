import React from 'react'
import styled from 'styled-components'

type FontProps = {
    size?: string;
    margin?: string;
    padding?: string;
    weight?: string;
    fontFamily?: string;
    children: React.ReactNode;
}

export enum E_Font {
    FONT_SIZE_BASIC = "16px",
    FONT_SIZE_BIGGER = "18px",
    FONT_SIZE_TITLE = "24px",
    FONT_WEIGHT_LIGHT = "light",
    FONT_WEIGHT_SEMIBOLD = "semi-bold",
    FONT_WEIGHT_BOLD = "bold",
    FONT_FAMILY = "Raleway, sans-serif;"
}

const FontStyledP = styled.p<FontProps>`
    font-size: ${(props) => props.size ? props.size : E_Font.FONT_SIZE_BASIC};
    margin: ${(props) => props.margin ? props.margin :  "0"};
    padding: ${(props) => props.padding ? props.padding :  "0"};
    font-weight: ${(props) => props.weight ? props.weight :  "regular"};
    font-family: ${(props) => props.fontFamily ? props.fontFamily : E_Font.FONT_FAMILY}
`

const FontStyledSpan = styled.span<FontProps>`
    font-size: ${(props) => props.size ? props.size : E_Font.FONT_SIZE_BASIC};
    font-weight: ${(props) => props.weight ? props.weight :  "regular"};
`


export function Font(props: FontProps) {
    return (
        <FontStyledP {...props}>
            {props.children}
        </FontStyledP>
    )
}

export function FontSpan(props: FontProps) {
    return (
        <FontStyledSpan {...props}>
            {props.children}
        </FontStyledSpan>
    )
}
