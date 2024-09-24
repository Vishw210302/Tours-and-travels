import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import { useContactUsPostMutation, useGetLocationListingQuery } from '../../Api/Api';

const ContactUs = () => {

  const [selectedCity, setSelectedCity] = useState('Ahmedabad');
  const [contactUsPost, { isLoading, isSuccess, isError }] = useContactUsPostMutation();
  const { isError: isLocationError, error, data, isLoading: isLocationLoading, isSuccess: isLocationSuccess } = useGetLocationListingQuery();
  const [allLocationListing, setAllLocationListing] = useState([])
  console.log("allLocationListingallLocationListingallLocationListingallLocationListing", allLocationListing)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    message: '',
  });

  useEffect(() => {
    if (isLocationSuccess) {
      setAllLocationListing(data?.data);
    } else if (isLocationError) {
      console.log("isLocationError", isLocationError);
    }
  }, [error, data, isLocationSuccess, isLocationError]);

  const cities = [
    'Ahmedabad',
    'Vadodara',
    'Rajkot',
    'Surat',
    'Gandhinagar',
    'Mumbai',
    'Pune',
    'Other',
  ];

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await contactUsPost(formData).unwrap();
      console.log('Form submitted successfully:', result);
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

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

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
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
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline focus:border-red-400"
                      placeholder="Your Email"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
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
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline focus:border-red-400"
                      placeholder="Your Message"
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-red-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                    {isSuccess && <p className="text-green-500 mt-2">Message sent successfully!</p>}
                    {isError && <p className="text-red-500 mt-2">Failed to send message.</p>}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-10 my-2 w-[95%] h-fit'>
            <p className='text-red-400 text-[18px] font-bold'>
              Registered office
            </p>
            <p className='text-gray-400 text-base font-medium text-justify'>
              Shakti -21 Complex, Opp. Sudarshan Bunglow, Nr. European Catalog, Opp, Shivalik Highstreet Building, Keshav Bagh Party Plot to Mansi Circle, Vastrapur Road, Ahmedabad - 380 015
            </p>
            <div className='mt-3'>
              <p className='text-red-400 text-[18px] font-bold'>
                Call us
              </p>
              <p className='text-gray-400 text-base font-medium text-justify'>
                Request a quote or just chat about your next vacation. We're always happy to help!
              </p>
              <div>
                <div className='flex flex-row my-2'>
                  <p className='text-red-400 text-[15px] font-semibold'>Domestic :-</p>
                  <p className='font-semibold text-black'>+91-8490820875 , +91-7069950571</p>
                </div>
                <div className='flex flex-row my-2'>
                  <p className='text-red-400 text-[15px] font-semibold'>International :-</p>
                  <p className='font-semibold text-black'>+91-9173211901 , +91-7016525632</p>
                </div>
              </div>
            </div>
            <div className='mt-3'>
              <p className='text-red-400 text-[18px] font-bold'>
                Write to us
              </p>
              <p className='text-gray-400 text-base font-medium text-justify'>
                info@chinmayatravels.com
              </p>
            </div>
            <div className='mt-3'>
              <p className='text-red-400 text-[18px] font-bold'>
                Follow us on
              </p>
              <div className='text-gray-400 text-[25px]'>
                <div className='flex flex-row'>
                  <div className='p-1'>
                    <FacebookIcon fontSize='large' className='hover:text-blue-500' />
                  </div>
                  <div className='p-1'>
                    <InstagramIcon fontSize='large' className='hover:text-pink-500' />
                  </div>
                  <div className='p-1'>
                    <LinkedInIcon fontSize='large' className='hover:text-blue-700' />
                  </div>
                  <div className='p-1'>
                    <YouTubeIcon fontSize='large' className='hover:text-red-500' />
                  </div>
                  <div className='p-1'>
                    <XIcon fontSize='large' className='hover:text-blue-400' />
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
          <div>
            <div className='grid grid-cols-8 gap-2 text-4xl mt-2'>
              {cities.map((city) => (
                <div
                  key={city}
                  onClick={() => handleCityClick(city)}
                  className={`border rounded-lg p-2 cursor-pointer hover:bg-red-400 ${selectedCity === city ? 'bg-red-400 text-white' : ''
                    }`}
                >
                  <p className='text-xl flex flex-1 justify-center items-center font-semibold hover:text-white'>
                    {city}
                  </p>
                </div>
              ))}
            </div>
            <div className='grid grid-cols-4 gap-4'>
              {allLocationListing && allLocationListing.map((location, index) => {
                console.log("locationlocationlocation", location)
                return (
                  <div>
                    <div className='card mt-10 bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-1 relative rounded-xl'>
                      <div className='p-2'>
                        <p className='text-lg text-center font-semibold text-red-400 my-2 bg-[#ededed]'>{location.branchName}</p>
                        <iframe
                          src={location.mapUrl}
                          width="100%"
                          height="150"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                        <div className='mt-2'>
                          <p className='text-red-500 text-base'>{location.branchNumber}</p>
                        </div>
                        <div className='mt-2'>
                          <p className='text-red-500 text-lg'>{location.branchLocation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
