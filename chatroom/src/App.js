import React from 'react';
import NavBar from "./Components/nav/NavBar";
import Footer from './Components/footer/Footer';
import styled from 'styled-components';
import ChatRoom from './Components/ChatComponent/ChatRoom';

const footerHeight = '40px';
const navHeight = '60px';

const AppStyle = styled.main`
    min-height: 100%;

    :after {
        content: "";
        display: block;
        height: ${footerHeight};
    }
`;

const App = () => {
    return <AppStyle>
        <NavBar navHeight={navHeight}/>
        <ChatRoom navHeight={navHeight} footerHeight={footerHeight}/>
        <Footer footerHeight={footerHeight} />
    </AppStyle>;
};

export default App;
