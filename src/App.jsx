import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvidar.jsx';

const App = () => {
  const [{ user }, dispatch] = useStateValue();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      dispatch({
        type: "SET_USER",
        user: user
      });
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      {user ? (
        <div className="grid place-items-center h-[100vh]">
          <div className="flex h-[90vh] w-[90vw] bg-[#ededed] shadow-[-1px 4px 20px -6px #000]">
            <Sidebar />
            <Routes>
              {/* Default route to redirect to the first chat room if no room ID is provided */}
              <Route path="/" element={<Navigate to="/room/1" />} />
              <Route path="/room/:roomId" element={<Chat />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
};

export default App;
