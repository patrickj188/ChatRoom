import React from "react";
import styled from 'styled-components'
import GoogleAuth from '../GoogleAuth'



const Wrapper = styled.div` 
width: 100%;
height: 40vh;
background-color: lightblue;
text-align: center;
margin: 0 auto;
`;


const NavBar = () =>{
    return <Wrapper>I am a NavBar
        <div>
            <GoogleAuth />
        </div>
    </Wrapper>
}

export default NavBar;