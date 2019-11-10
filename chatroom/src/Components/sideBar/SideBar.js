import React, {useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const SideContainer = styled.div`
width: 70px;
height: 100vh;
border: 1px solid black;
position: absolute;
top: 0;
left: 0;

`;


const SideBar = (props) =>{


    const renderRoomNames = props.rooms.map( x =>{
        return <div>{x.name}</div>
    })
console.log(props.rooms)
    return (
        <SideContainer>
            {renderRoomNames}
        </SideContainer>
    )
}
const mapStateToProps = (state) => {
    return { userId: state.auth.userId, displayName: state.auth.displayName, isSignedIn: state.auth.isSignedIn, rooms: state.auth.rooms};
  };

export default connect(mapStateToProps, { })(SideBar);
