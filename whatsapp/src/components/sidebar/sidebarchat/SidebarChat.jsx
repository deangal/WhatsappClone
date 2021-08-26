import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import './sidebarChat.scss'
import db from '../../../firebase';

const SidebarChat = ({ id, name, addNewChat }) => {
    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState([])


    useEffect(() => {
        if(id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) =>
                doc.data()
                ))
            ))

            db.collection('rooms').doc(id).onSnapshot(snapshot => {
                if(snapshot.data() != undefined){
                
                setSeed(snapshot.data().seed)
                }
            })
        }

       
    })
    

    const createChat = () => {
        const roomName = prompt("Please enter name for chat")

        if(roomName){
            let randomSeed = Math.random()
            db.collection('rooms').add({
                name: roomName,
                seed: randomSeed
                
            })
        }
    }

    

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChatItem">
            <Avatar src={`https://avatars.dicebear.com/api/micah/${seed}.svg`}/>
            <div className="sidebarChatInfo">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
            </div>
           
        </div>
        </Link>
       
    ) : (
        <div onClick={createChat}  className="sidebarChatItem">
            <h2>Add New Chat</h2>

        </div>
    )
};

export default SidebarChat;