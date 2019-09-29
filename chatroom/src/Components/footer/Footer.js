import React from 'react';
import styled from 'styled-components';

const Footer = (props) => {

    const Footer = styled.footer` 
        width: 100%;
        height: ${props.footerHeight};
        background: #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 1rem;

    `;
        
    return (
        <Footer></Footer>
    );
};

export default Footer;
