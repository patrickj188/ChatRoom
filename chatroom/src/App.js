import React from 'react';
import NavBar from "./Components/nav/NavBar";
import Footer from './Components/footer/Footer'
import ChatContainer from './Components/ChatComponent/ChatContainer';
import styled from 'styled-components';

const footerHeight = '40px';

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
        <NavBar />
        <ChatContainer />
        <Footer footerHeight={footerHeight} />
    </AppStyle>
}

export default App;
