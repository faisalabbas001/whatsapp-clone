import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MoodIcon from '@mui/icons-material/Mood';
import { useParams } from 'react-router-dom';
import VideocamIcon from '@mui/icons-material/Videocam';
import { collection, getDocs,getDoc, doc, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from './firebase';
import { useStateValue } from './StateProvidar';
import CallIcon from '@mui/icons-material/Call';
const Chat = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState("");
  const [input, setInput] = useState("");
  const [message, setMessages] = useState([]);
  const [{user},dispatch]=useStateValue()
  
    const fetchRoom = async () => {
      try {
        const docSnapshot = await getDoc(doc(db, 'rooms', roomId));
        if (docSnapshot.exists()) {
          setRoom(docSnapshot.data().name);
        } else {
          console.log('No such document exists!');
        }
      } catch (error) {
        console.log('Error getting document: ', error);
      }
    };

    const fetchMessages = async () => {
      try {
        const messageCollection = collection(db, "rooms", roomId, "messages");
        const querySnapshot = await getDocs(query(messageCollection, orderBy("timestamp", "asc")));
        setMessages(querySnapshot.docs.map((doc) => doc.data()));
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };

    fetchRoom();
    fetchMessages();
 

  const submitForm = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter your message🙁🙁🙁🙁🙁");
      return;
    }
    setInput("");

    try {
      await addDoc(collection(db, "rooms", roomId, "messages"), {
        name: user.displayName,
        message: input,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className='lg:flex-[1] max-sm:hidden md:w-full flex flex-col'>
      <div className='flex items-center border-b-2 p-3'>
        <Avatar />
        <div className='ml-3 flex-1'>
          <h2 className='lg:font-bold lg:text-lg'>{room}</h2>
          <p className='lg:font-bold text-sm '>{
            new Date(message[message.length-1]?.timestamp?.seconds*1000).toLocaleTimeString()
          }</p>
        </div>
        <div className='flex items-center sm:ml-3'>
          <IconButton className='sm:ml-6'>
               <VideocamIcon/>
          </IconButton>
          <IconButton className='sm:ml-6'>
       
          <CallIcon/>
          </IconButton>
          <IconButton className='sm:ml-6'>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='bg-cover bg-center w-full sm:max-w-full flex-1 p-5 sm:p-10 overflow-y-auto' style={{ backgroundImage: "url('/images/whatsapp.png')"}}>
  {message.map((message, index) => (
    <p key={index} className="relative bg-[#d6f8c6] !important ml-auto w-full sm:max-w-xs p-3 sm:p-1 rounded-lg text-base sm:text-lg mb-4 sm:mb-9">
      <span className='block sm:inline-block lg:h-4 sm:relative sm:top-[-30px] sm:w-full ml-2 lg:ml-5  lg:text-base font-bold'>{message.name}</span>
      {message.message}
      <span className='text-xs sm:text-sm ml-2 lg:ml-5 sm:font-thin'>{new Date(message.timestamp?.seconds * 1000).toLocaleTimeString()}</span>
    </p>
  ))}
</div>

      <div className='flex items-center p-[10px]'>
        <MoodIcon className='cursor-pointer' />
        <AttachFileIcon className='cursor-pointer ml-3' />
        <form className='flex-1' onSubmit={submitForm}>
          <input className="border-0 h-[40px] outline-0 w-[100%]" 
            type="text" placeholder='Type your message' value={input} onChange={e => setInput(e.target.value)} />
          <input type="submit" hidden />
        </form>
        <KeyboardVoiceIcon className='cursor-pointer' />
      </div>
    </div>
  );
};

export default Chat;
