import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import ContactusForm from './Components/ContactusForm';
import Details from './Components/Details';
import Braches from './Components/Braches';

const ContactUs = () => {

  return (
    <>
      <div className="w-full h-[500px] flex flex-row justify-center items-center bg-[url('https://t4.ftcdn.net/jpg/03/95/04/15/360_F_395041586_h21AxqD0dNjxUw3lKFiV5t7qMBJs6wfe.jpg')] bg-cover bg-center bg-[#f7f7f7]">
        <div>
          <p className='text-[24px] text-white font-semibold'>Contact Us</p>
        </div>
      </div>
      <div className='2xl:container 2xl:mx-auto p-5'>
        <div className='grid grid-cols-2'>
          <ContactusForm />
          <Details />
        </div>
      </div>
     <Braches />
    </>
  );
};

export default ContactUs;
