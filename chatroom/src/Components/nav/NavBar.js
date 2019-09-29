import React from "react";
import styled from 'styled-components'
import GoogleAuth from '../GoogleAuth'

const NavBar = (props) => {
    const Wrapper = styled.header` 
        width: 100%;
        height: ${props.navHeight};
        background-color: lightblue;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        > * {
            padding: 10px 20px;
        }
    `;

    return (
        <Wrapper>
            <GoogleAuth />
        </Wrapper>
    );
}

export default NavBar;
