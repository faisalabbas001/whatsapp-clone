import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";
import { db } from './firebase';
import { Link } from 'react-router-dom';

const SidebarChat = ({ id, name, addnewChat }) => {
  const [avatar, setAvatar] = useState("");
  const [lastMessage, setLastMessage] = useState([]);

  useEffect(() => {
    setAvatar(Math.floor(Math.random() * 500));
    
  }, []);
  if (id) {
    const fetchMessages = async () => {
      try {
        const messagesRef = collection(db, "rooms", id, "messages");
        const q = query(messagesRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map(doc => doc.data());

        setLastMessage(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }

  const createChat = () => {
    const room = prompt("Please enter your room name");
    if (room) {
      const currentTime = new Date().toLocaleTimeString();
      const ref = collection(db, 'rooms');
      const data = {
        name: room,
        timestamp: currentTime
      };

      try {
        addDoc(ref, data);
      } catch (err) {
        console.log("Error creating chat:", err);
      }
    }
  };

 
  return (
    !addnewChat ? (
      <Link to={`/room/${id}`}>
        <div className='flex items-center border-b border-gray-300 py-3 cursor-pointer hover:bg-gray-100'>
          <div className='flex-shrink-0 m-3'>
            <Avatar src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${avatar}`} className='lg:w-14 lg:h-14 md:w-12 md:h-12 sm:w-10 sm:h-10' />
          </div>
          <div className='lg:ml-4' >
            <h2 className='text-lg lg:font-bold sm:font-semibold'>{name}</h2>
            <p className='lg:text-lg text-gray-600 sm:font-thin'>
              {lastMessage.length > 0 ? lastMessage[0].message : "No messages"}
            </p>
          </div>
        </div>
      </Link>
    ) : (
      <div className='flex items-center border-b border-gray-300 py-3 cursor-pointer hover:bg-gray-100'>
        <h1 className='text-lg lg:font-bold sm:font-semibold sm:ml-9 lg:ml-9' onClick={createChat}>Add New Chat</h1>
      </div>
    )
  );
};

export default SidebarChat;
