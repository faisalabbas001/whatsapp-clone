import React from 'react';
import {  Navbar,Tooltip } from 'flowbite-react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
const Showed = () => {

  return (
    <Navbar fluid rounded>
     <Tooltip content="visit the whatsapp website ">
      <Navbar.Brand href="https://www.whatsapp.com/">
        <img src="/images/light.jpg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Whatsapp</span>
      </Navbar.Brand>
      </Tooltip>
      <Tooltip content="Turn to light or Dark Mode ">
        <Flowbite>
      <DarkThemeToggle />
    </Flowbite>
     
      </Tooltip>
    </Navbar>
  );
}

export default Showed;
