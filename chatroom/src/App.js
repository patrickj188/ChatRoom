import React from 'react';
import NavBar from "./Components/nav/NavBar";
import Footer from './Components/footer/Footer'
import ChatContainer from './Components/ChatComponent/ChatContainer';


const App = () => {
    return <div>
        <div>
            <NavBar />
        </div>
        <ChatContainer />

        <div>
            <Footer />
        </div>
    </div>
}

export default App;