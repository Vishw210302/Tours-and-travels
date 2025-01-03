import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import ContactusForm from './Components/ContactusForm';
import Details from './Components/Details';
import Braches from './Components/Braches';

const ContactUs = () => {

  return (
    <>
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] flex flex-col justify-center items-center bg-[url('https://t4.ftcdn.net/jpg/03/95/04/15/360_F_395041586_h21AxqD0dNjxUw3lKFiV5t7qMBJs6wfe.jpg')] bg-cover bg-center relative">
        <div>
          <p className='text-[24px] text-white font-semibold'>Contact Us</p>
        </div>
      </div>
      <div className='2xl:container 2xl:mx-auto p-5'>
        <div className='grid sm:grid-cols-2 lg:grid-cols-2 grid-cols-1'>
          <ContactusForm />
          <Details />
        </div>
      </div>
      <Braches />
    </>
  );
};

export default ContactUs;
