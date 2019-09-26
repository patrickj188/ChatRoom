import React from "react";
import styled from 'styled-components'
import GoogleAuth from '../GoogleAuth'



const Wrapper = styled.div` 
    width: 100%;
    height: 60px;
    background-color: lightblue;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    > * {
        padding: 10px 20px;
    }
`;


const NavBar = () =>{
    return <Wrapper>
        <div>
            <GoogleAuth />
        </div>
    </Wrapper>
}

export default NavBar;
