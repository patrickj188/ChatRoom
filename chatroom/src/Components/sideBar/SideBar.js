import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const SideContainer = styled.div`
width: 10vw;
height: 100vh;
border: 1px solid black;
position: absolute;
top: 0;
left: 0;

`;

const RoomIcon = styled.button`
width: 8vw;
height: 12vh;
background-color: salmon;
position: absolute;
margin: 5px;
text-align: center;
border-radius: 15%;
top: 10%;
`;


const SideBar = (props) => {


    const renderRoomNames = props.rooms.map(x => {
        return <div>{x.name}</div>
    })
    console.log(props.rooms)
    return (
        <SideContainer>
            <RoomIcon>
                {renderRoomNames}
            </RoomIcon>
        </SideContainer>
    )
}
const mapStateToProps = (state) => {
    return { userId: state.auth.userId, 
        displayName: state.auth.displayName, 
        isSignedIn: state.auth.isSignedIn, 
        rooms: state.auth.rooms };
};

export default connect(mapStateToProps, {})(SideBar);
