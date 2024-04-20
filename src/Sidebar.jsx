import React, { useEffect, useState } from 'react'
import {Avatar,IconButton} from '@material-ui/core';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import { collection,getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useStateValue } from './StateProvidar';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOutUser } from './firebase';

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
const [{user},dispatch]=useStateValue()
  const fetchPost = async () => {
       
    await getDocs(collection(db, "rooms"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setRooms(newData);                
            
        })
   
}
    fetchPost();
   

const logout=()=>{
  signOutUser();
}

 return (
      <div className='lg:flex-[0.25] sm:flex-full max-sm:w-full overflow-hidden bg-white '>
        <div className='flex justify-between border-r-2 p-3 bg-[#ededed]'>
          <Avatar  src={user.photoURL}  className='flex items-center min-w-10 cursor-pointer lg:w-14 lg:h-14 md:w-12 md:h-12 sm:w-10 sm:h-10' />
          <div className='flex items-center'>
     
            <IconButton>
              <DonutLargeIcon className='lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-6 sm:h-6 sm:ml-auto' />
            </IconButton>
            <IconButton>
          
              <ChatIcon className='lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-6 sm:h-6 sm:ml-auto' />
            </IconButton>
            <IconButton>
              <LogoutIcon className='lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-6 sm:h-6 sm:ml-auto' onClick={logout} />
            </IconButton>
          </div>
        </div>
        <div className='flex items-center bg-gray-200 w-full h-16 p-4'>
          <div className='flex items-center bg-white w-full h-12 rounded-lg p-2'>
            <SearchIcon />
            <div className='flex flex-wrap items-center border-b border-gray-300 py-3'>
              <input
                type="text"
                className='flex-1 appearance-none bg-transparent border-none w-full py-2 px-4 leading-tight focus:outline-none'
                placeholder='Search Chat...'
              />
              
            </div>
          </div>

        </div>
        <div className='flex flex-col h-full sm:w-[400px] md:w-[400px] lg:w-[600px] overflow-x-auto  '>
<SidebarChat addnewChat/>

{
    rooms.map(room => {
        return (
            <SidebarChat
                key={room.id} 
                id={room.id}
                name={room.name}
            />
        );
    })
}
 




          </div>
      </div>
    );
  }

export default Sidebar


/* apiKey: "AIzaSyA3JeCu_CkK-2PRPyiAcq8GrzUQ_FyrEkA",
  authDomain: "whatsapp-clone-671a7.firebaseapp.com",
  projectId: "whatsapp-clone-671a7",
  storageBucket: "whatsapp-clone-671a7.appspot.com",
  messagingSenderId: "237657585496",
  appId: "1:237657585496:web:7d2b9fadf9cbd24901d72d"*/