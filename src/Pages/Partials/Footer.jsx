import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Plane, Sun, Umbrella } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaCcPaypal } from "react-icons/fa";
import { FaCcDiscover } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useGetSocialMediaLinkListingQuery } from '../../Api/Api';
import recentTours from "../../assets/image.jpg";

const Footer = ({ settingData, settingIsSuccess, settingIsError, settingError }) => {

  const navigate = useNavigate();
  const { isError, error, data, isLoading, isSuccess } = useGetSocialMediaLinkListingQuery();
  const [socialMediaLinkListing, setSocialMediaLinkListing] = useState([]);
  const [websiteLogo, setWebsiteLogo] = useState("");
  const mainLogoImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/setting-image/`

  const handleNavigateAboutUs = () => {
    navigate("aboutUs");
  }

  const handleNavigateContactUs = () => {
    navigate("contact");
  }

  const handleNavigateBlogs = () => {
    navigate("Blogs");
  }

  const handleNavigateInternationalPackages = () => {
    navigate("International");
  }

  const handleNavigateDomesticPackages = () => {
    navigate("Domestic");
  }

  const handleNavigateFlightBooking = () => {
    navigate("flights");
  }

  const handleNavigateHotelBooking = () => {
    navigate("hotels");
  }

  useEffect(() => {
    if (isSuccess) {
      setSocialMediaLinkListing(data?.data);
    } else if (isError) {
      console.log("error", error);
    }
  }, [error, data, isSuccess, isError]);

  useEffect(() => {
    if (settingIsSuccess) {
      setWebsiteLogo(settingData?.data)
    } else if (settingIsError) {
      console.log("settingIsError", settingIsError);
    }
  }, [settingData, settingIsSuccess, settingIsError])

  return (

    <footer className="relative bg-[#1f2746] text-white overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full">
          <Plane className="absolute text-white/10 w-24 h-24 animate-plane-fly" style={{ top: '10%', left: '25%' }} />
          <Sun className="absolute text-yellow-300/20 w-32 h-32 animate-rotate-sun" style={{ top: '30%', right: '10%' }} />
          <Umbrella className="absolute text-pink-300/20 w-20 h-20 animate-bounce" style={{ bottom: '20%', left: '15%' }} />
        </div>
      </div>

      <div className="2xl:container 2xl:mx-auto px-8 py-16 relative z-10">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full'>
          <div>

            <div className='w-fit h-fit'>
              {websiteLogo && websiteLogo.map((items, index) => {
                if (items?.keyName == "Main_Logo") {
                  return (
                    <div key={index + "key"}>
                      <img src={`${mainLogoImage}${items?.valueContent}`} alt={items?.keyName} className='w-[266px]' />
                    </div>
                  )
                }
              })}
            </div>

            <div className='text-sm font-medium mt-3' style={{ letterSpacing: '-0.4px' }}>
              {websiteLogo && websiteLogo.map((items, index) => {
                if (items?.keyName == "Footer_Description") {
                  return (
                    <p className='text-justify' key={index + "key"}>
                      {items?.valueContent}
                    </p>
                  )
                }
              })}
            </div>

            {socialMediaLinkListing && socialMediaLinkListing.length > 0 ?
              <div className='w-fit bg-[#15304d] rounded-lg p-3 mt-3'>
                <p className='text-sm font-semibold'>Social Networks:</p>
                <div className='text-gray-400 text-[25px] flex flex-row gap-2'>
                  {socialMediaLinkListing && socialMediaLinkListing.map((item, index) => {
                    return (
                      <div key={index}>
                        {item.socialMediaName === 'facebook' && (
                          <a href={`https://${item.socialMediaLink}`} target="_blank" rel="noopener noreferrer">
                            <FacebookIcon fontSize='medium' />
                          </a>
                        )}
                        {item.socialMediaName === 'Instagram' && (
                          <a href={`https://${item.socialMediaLink}`} target="_blank" rel="noopener noreferrer">
                            <InstagramIcon fontSize='medium' />
                          </a>
                        )}
                        {item.socialMediaName === 'linkedin' && (
                          <a href={`https://${item.socialMediaLink}`} target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon fontSize='medium' />
                          </a>
                        )}
                        {item.socialMediaName === 'youtube' && (
                          <a href={`https://${item.socialMediaLink}`} target="_blank" rel="noopener noreferrer">
                            <YouTubeIcon fontSize='medium' />
                          </a>
                        )}
                        {item.socialMediaName === 'twitter' && (
                          <a href={`https://${item.socialMediaLink}`} target="_blank" rel="noopener noreferrer">
                            <XIcon fontSize='medium' />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              :
              <>
              </>
            }

          </div>

          <div>
            <p className='text-base font-semibold border-b-2 border-red-500 w-fit'>Company</p>
            <div className='mt-2 space-y-2'>

              <div onClick={() => {
                handleNavigateAboutUs()
              }}>
                <p className='text-sm relative inline-block hover:text-red-500 hover:cursor-pointer after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300'>
                  About Us
                </p>
              </div>

              <div onClick={() => {
                handleNavigateContactUs()
              }}>
                <p className='text-sm relative inline-block hover:text-red-500 hover:cursor-pointer after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300'>
                  Contact Us
                </p>
              </div>

              <div onClick={() => {
                handleNavigateBlogs()
              }}>
                <p className='text-sm relative inline-block hover:text-red-500 hover:cursor-pointer after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300'>
                  Blogs
                </p>
              </div>

            </div>
          </div>

          <div>
            <p className='text-base font-semibold border-b-2 border-red-500 w-fit'>Service</p>
            <div className='mt-2 space-y-2'>
              <div onClick={() => {
                handleNavigateInternationalPackages()
              }}>
                <p className='text-sm relative inline-block hover:text-red-500 hover:cursor-pointer after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300'>International Package</p>
              </div>

              <div onClick={() => {
                handleNavigateDomesticPackages()
              }}>
                <p className='text-sm relative inline-block hover:text-red-500 hover:cursor-pointer after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300'>Domestic Package</p>
              </div>

              <div onClick={() => {
                handleNavigateFlightBooking()
              }}>
                <p className='text-sm relative inline-block hover:text-red-500 hover:cursor-pointer after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300'>Flight Booking</p>
              </div>

              <div onClick={() => {
                handleNavigateHotelBooking()
              }}>
                <p className='text-sm relative inline-block hover:text-red-500 hover:cursor-pointer after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300'>Hotel Booking</p>
              </div>

              <div>
                <p className='text-sm relative inline-block hover:text-red-500 hover:cursor-pointer after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300'>Visa Services</p>
              </div>

            </div>
          </div>

          <div>
            <p className='text-base font-semibold border-b-2 border-red-500 w-fit'>Famous Tours</p>
            <div className='mt-2'>
              <div className='flex flex-row gap-3'>
                <div className='w-fit h-fit'>
                  <img src={recentTours} alt="Famous_tours" className='h-24 w-24 rounded-lg' />
                </div>
                <div>
                  <div className='flex flex-row gap-3'>
                    <p className='text-sm'>vishw prajapati</p>
                    <p className='text-sm'>Feb 05 2024</p>
                  </div>
                  <div>
                    <p className='text-sm relative inline-block hover:text-red-500 hover:cursor-pointer after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300'>Honeymoon Kashmir</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <div className='flex flex-row gap-3'>
                <div className='w-fit h-fit'>
                  <img src={recentTours} alt="Famous_tours" className='h-24 w-24 rounded-lg' />
                </div>
                <div>
                  <div className='flex flex-row gap-3'>
                    <p className='text-sm'>vishw prajapati</p>
                    <p className='text-sm'>Feb 05 2024</p>
                  </div>
                  <div>
                    <p className='text-sm relative inline-block hover:text-red-500 hover:cursor-pointer after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300'>Honeymoon Kashmir</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        <div className="2xl:container 2xl:mx-auto p-5 border-t border-white/20 mt-16">
          <div className='flex flex-row items-center justify-between h-fit'>
            <div>
              <p className='text-sm font-semibold'>© 2024 Travel Wonders. All rights reserved.</p>
            </div>
            <div className='flex flex-row gap-2'>
              <div className='border bg-black px-3 py-1 h-fit'>
                <RiVisaLine size={20} />
              </div>
              <div className='border bg-black px-3 py-1 h-fit'>
                <FaCcDiscover size={20} />
              </div>
              <div className='border bg-black px-3 py-1 h-fit'>
                <FaCcPaypal size={20} />
              </div>
            </div>
          </div>
        </div>

      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-600/50 to-transparent"
        style={{ clipPath: 'polygon(0% 100%, 5% 60%, 10% 100%, 15% 70%, 20% 100%, 25% 85%, 30% 100%, 35% 50%, 40% 100%, 45% 65%, 50% 100%, 55% 75%, 60% 100%, 65% 60%, 70% 100%, 75% 70%, 80% 100%, 85% 80%, 90% 100%, 95% 70%, 100% 100%)' }}>
      </div>

    </footer>
  );
};

export default Footer;