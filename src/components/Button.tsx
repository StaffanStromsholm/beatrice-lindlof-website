import React from "react";
import { Link, useHistory } from "react-router-dom";
import { app } from "../firebase-config";

import styled from "styled-components";

type ButtonProps = {
    onClick: () => void;
};

export const Button = styled.button<ButtonProps>`
    text-decoration: none;
    width: 300px;
    height: 50px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    border: none;
    border-radius: 5px;
    background-color: rgb(240, 240, 240);
    font-weight: bold;
    cursor: pointer;
    color: rgb(30, 30, 30);
    position: relative;
`;