import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';


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
          <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2 w-[95%] h-fit'>
            <div className="2xl:container 2xl:mx-auto p-5">
              <div className="">
                <p className="text-xl font-bold text-center text-red-400 mb-6">
                  Love to hear from you, Get in touch
                </p>

                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline focus:border-red-400"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline focus:border-red-400"
                      placeholder="Your Email"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline focus:border-red-400"
                      placeholder="Your Mobile Number"
                    />
                  </div>


                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline focus:border-red-400"
                      placeholder="Your Message"
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-red-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
          <div>
            <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-10 my-2 w-[95%] h-fit'>
              <div>
                <p className='text-red-400 text-[18px] font-bold'>
                  Registered office
                </p>
                <p className='text-gray-400 text-base font-medium text-justify'>
                  Shakti -21 Complex, Opp. Sudarshan Bunglow, Nr. European Catalog, Opp, Shivalik Highstreet Building, Keshav Bagh Party Plot to Mansi Circle, Vastrapur Road, Ahmedabad - 380 015
                </p>
              </div>
              <div className='mt-3'>
                <p className='text-red-400 text-[18px] font-bold'>
                  Call us
                </p>
                <p className='text-gray-400 text-base font-medium text-justify'>
                  Request a quote or just chat about your next vacation. We're always happy to help!
                </p>
                <div>
                  <div className='flex flex-row'>
                    <p className='text-red-400 text-[15px] font-semibold'>Domestic :-</p>
                    <p className='font-semibold text-black'>+91-8490820875 , +91-7069950571</p>
                  </div>
                  <div className='flex flex-row'>
                    <p className='text-red-400 text-[15px] font-semibold'>International :-</p>
                    <p className='font-semibold text-black'>+91-9173211901 , +91-7016525632</p>
                  </div>
                </div>
              </div>
              <div className='mt-3'>
                <p className='text-red-400 text-[18px] font-bold'>
                  Write to us
                </p>
                <p className='text-gray-400 text-base font-medium m-0 text-justify'>
                  Be it an enquiry, feedback or a simple suggestion, write to us.
                  vishwprajapati66@gmail.com
                </p>
              </div>
            </div>
            <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 w-[95%] h-fit'>
              <div>
                <p className='text-red-400 text-[18px] font-bold'>
                  Social Media
                </p>
                <div className="grid grid-cols-5 gap-2 text-4xl">
                  <div className="w-full">
                    <FacebookIcon fontSize="inherit" sx={{ color: '#0866ff' }} />
                  </div>
                  <div className="w-full">
                    <InstagramIcon fontSize="inherit" sx={{ color: '#fe0161' }} />
                  </div>
                  <div className="w-full">
                    <LinkedInIcon fontSize="inherit" sx={{ color: '#0866ff' }} />
                  </div>
                  <div className="w-full">
                    <YouTubeIcon fontSize="inherit" sx={{ color: '#f70303' }} />
                  </div>
                  <div className="w-full">
                    <XIcon fontSize="inherit" sx={{ color: '#fffff' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='2xl:container 2xl:mx-auto p-5'>
        <div>
          <div className='text-center'>
            <p className='text-[40px] font-semibold'>Our Branches</p>
          </div>
          <div className='flex flex-row justify-center'>
            <div className='grid grid-cols-8 gap-2 text-4xl'>
              <div className='w-40 h-12'>
                <span className='border text-[#111315] font-poppins text-[20px] font-semibold p-[6px_16px] rounded-md'>
                  Ahmedabad
                </span>
              </div>
              <div className='w-40 h-12'>
                <span className='border text-[#111315] font-poppins text-[20px] font-semibold p-[6px_16px] rounded-md'>
                  Vadodara
                </span>
              </div>
              <div className='w-40 h-12'>
                <span className='border text-[#111315] font-poppins text-[20px] font-semibold p-[6px_16px] rounded-md'>
                  Rajkot
                </span>
              </div>
              <div className='w-40 h-12'>
                <span className='border text-[#111315] font-poppins text-[20px] font-semibold p-[6px_16px] rounded-md'>
                  Surat
                </span>
              </div>
              <div className='w-40 h-12'>
                <span className='border text-[#111315] font-poppins text-[20px] font-semibold p-[6px_16px] rounded-md'>
                  Gandhinagar
                </span>
              </div>
              <div className='w-40 h-12'>
                <span className='border text-[#111315] font-poppins text-[20px] font-semibold p-[6px_16px] rounded-md'>
                  Mumbai
                </span>
              </div>
              <div className='w-40 h-12'>
                <span className='border text-[#111315] font-poppins text-[20px] font-semibold p-[6px_16px] rounded-md'>
                  Pune
                </span>
              </div>
              <div className='w-40 h-12'>
                <span className='border text-[#111315] font-poppins text-[20px] font-semibold p-[6px_16px] rounded-md'>
                  Other
                </span>
              </div>

            </div>
          </div>

        </div >
      </div >

    </>
  );
};

export default ContactUs;