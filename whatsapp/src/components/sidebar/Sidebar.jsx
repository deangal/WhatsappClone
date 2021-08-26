import './sidebar.scss'

import React, { useEffect, useState } from 'react';
import { actionTypes } from '../../Reducer';
import  { DonutLarge, MoreVert, Chat, SearchOutlined,Clear } from '@material-ui/icons';
import SidebarChat from './sidebarchat/SidebarChat';
import { Avatar, IconButton, Menu, MenuItem, Dialog } from '@material-ui/core';
import db from '../../firebase'
import { useStateValue } from '../../StateProvider';


const Sidebar = () => {
    const [{ user }, dispatch] = useStateValue();
    const [rooms,setRooms] = useState([])
    const [searchData,setSearchData] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);



    useEffect(() =>{
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),

            })
            ))
        ))

        return () => {
            unsubscribe();
        }

    },[])


    

    const handleProfile = () => {
        setOpen(true);
      };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleProfileClose = (value) => {
        setOpen(false);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
      };

    const logout = () => {
        dispatch({type: actionTypes.LOGOUT})
      };

    const Search = (e) => {
        setSearchData(e.target.value);
    }

    
       let obj = rooms.map(room => {
           
        if (room.data.name.toLowerCase().includes(searchData)){
            return <SidebarChat key={room.id} id={room.id} name={room.data.name} />
               
       }
    })
            
     
   
    return (
        
            <div className="sidebar">
                <div className="sidebarHeader">
                <Avatar src={user?.photoURL}/>
                   <div className="headerRight">
                       <IconButton>
                       <DonutLarge />
                       </IconButton>

                       <IconButton>
                       <Chat />
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

                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>

                        
                        </Menu>
                </div>


                <div className="sidebarSearch">

                    <div className="searchContainer">
                    <SearchOutlined />   
                    <input type="text" onChange={Search} placeholder="Search" />   
                    </div>
                  
                </div>

               
                <div className="sidebarChat">
                    <SidebarChat addNewChat />
                   {obj}
                  
                   
                </div>
           
                <Dialog open={open} onClose={handleProfileClose}>

                    <span className="clear">
                    <IconButton onClick={handleProfileClose}>
                       <Clear />
                    </IconButton>
                    </span>
                    
                    <div className="dialog">
                    
                    <img src={user.photoURL}/><br /><br />
                    
                    <h2>{user.displayName}</h2><br />
                    <span>{user.email}</span>
                    </div>
                    
                    
                </Dialog>
           

            </div>
       
    );
};

export default Sidebar;