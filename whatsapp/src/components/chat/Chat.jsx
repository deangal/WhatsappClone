import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import  {SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons';
import './chat.scss'
import db from '../../firebase';
import firebase from 'firebase';
import { useStateValue } from '../../StateProvider'


const Chat = () => {
    const [input,setInput] = useState('')
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('')
    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue();
    const [anchorEl, setAnchorEl] = useState(null);

    const [handleEmoji, setHandleEmoji] = useState(false);

   
    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                if(snapshot.data() != undefined){
                setRoomName(snapshot.data().name)
                setSeed(snapshot.data().seed)
                }
                
            })

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp' , 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) =>
                doc.data()
                ))
            ))
        }

      

    },[roomId])

    const deleteChat = () => {
        

        if(roomId){
            db.collection("rooms").doc(roomId).delete().then(() => {
                console.log("Document successfully deleted!");
           

              
               
                
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    }

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("message >>" , input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        })

        setInput('')
    }


  

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        
      };
    
    const handleClose = () => {
        setAnchorEl(null);
      };

    


    return (
        <div className='chat'>
            
            <div className="chatHeader">
                <Avatar src={`https://avatars.dicebear.com/api/micah/${seed}.svg`} />

                <div className="headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at{" "}
                    {new Date(
                        messages[messages.length - 1 ]?.
                        timestamp?.toDate()).toUTCString().slice(16,25) 
                    }
                    </p>
                </div>

                <div className="chatHeaderRight">
                       <IconButton>
                       <AttachFile />
                       </IconButton>

                       <IconButton >
                       <SearchOutlined />
                       </IconButton>

                       <IconButton onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                       <MoreVert />
                       </IconButton>
                </div>
                        <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                        <MenuItem onClick={handleClose}>Group Info</MenuItem>
                        <MenuItem onClick={deleteChat}><Link to="/rooms" >Exit Group</Link></MenuItem>

                        
                        </Menu>
            </div>
            {/* when move to production switch displayName to more unique key like id */}
            <div className="chatBody">
                {messages.map((message,index) => (
                <p key={index} className={`chatMessage ${message.name === user.displayName && 'chatReciver'}`} >
                <span className="chatName">
                    {message.name}
                    </span>
                    {message.message}
                 <span className="timeStamp">
                    {new Date (message.timestamp?.toDate()).toUTCString().slice(16,25)}
                </span>   
                </p>
                ))}
            

            </div>

            <div className="chatFooter">
                <IconButton>
                <InsertEmoticon/>
                </IconButton>
               
          
                <form>        
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                <button onClick={sendMessage} type="submit">Send</button>
            </form>
           
           
            
            <IconButton>
            <Mic />
            </IconButton>
           
            </div>
        </div>
    );
};

export default Chat;