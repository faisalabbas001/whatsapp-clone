import React from 'react';
import { Carousel } from 'flowbite-react';
import { Button, Tooltip } from 'flowbite-react';
import { auth, provider, signInWithPopup } from './firebase';
import { useStateValue } from './StateProvidar';

const Navbar=()=>{
  
  const [{},dispatch]=useStateValue()
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      
      dispatch({
        type: "SET_USER",
        user: result.user
      });
  
      console.log("Successful sign-in:", result.user);
    } catch (error) {
      console.error("Error signing in:", error);
      alert(error.message); // Displaying error message in an alert
    }
  };
  
    return(
        <div className="login-container flex flex-col items-center justify-center h-screen">

    
        <Carousel
          slidesPerView={window.innerWidth <= 768 ? 1 : 2} 
          loop={true}
          className="carousel w-full max-w-sm lg:max-w-md" 
        >
          <img src="/images/go.jpg" alt="whatsapp images" />
          <img src="/images/pak.jpg" alt="whatsapp 2 images" />
          <img src="/images/ino.jpg" alt="whatsapp3 images" />
          <img src="/images/light.jpg" alt="..." />
          <img src="/images/pak.jpg" alt="..." />
        </Carousel>
  
       
        <Tooltip content="Login please with Gmail ">
        <Button
          outline
       gradientDuoTone="greenToBlue"
          className="login-button  w-full max-w-md px-6 py-3 text-center  mb-12 rounded-md focus:outline-none" 
      onClick={signIn}>
       Login with Gmail
        </Button>
        </Tooltip>
      </div>
    )
};
export default Navbar;