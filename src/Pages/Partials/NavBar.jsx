import { ChevronDownIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useAllApiContext } from '../../Context/allApiContext';
import AddToCartDrawer from '../AddToCartDrawer/AddToCartDrawer';

const NavBar = ({ settingData, settingIsSuccess, settingIsError, settingError }) => {

  const pathname = window.location.pathname.replace('/', '');
  const [activeLink, setActiveLink] = useState(pathname);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [websiteLogo, setWebsiteLogo] = useState(null);
  const mainLogoImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/setting-image/`;
  const { addToCart } = useAllApiContext();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link, isDropdownItem = false) => {
    setActiveLink(isDropdownItem ? 'holidays' : link);
    navigate(`/${link}`);
    if (isPackagesOpen) {
      setIsPackagesOpen(false);
    }
  };

  const getActiveClass = (link) => (
    activeLink === link || (link === 'holidays' && activeLink === 'holidays')
      ? 'bg-[#161b31] border-b-4 border-b-[#c62a82]'
      : 'hover:bg-[#161b31] hover:border-b-4 hover:border-b-[#c62a82]'
  );

  const togglePackagesDropdown = () => {
    setIsPackagesOpen(!isPackagesOpen);
    setActiveLink('holidays');
  };

  const handleClickOnDashboard = () => {
    navigate('/');
  };

  useEffect(() => {
    if (settingIsSuccess) {
      setWebsiteLogo(settingData?.data);
    } else if (settingIsError) {
      console.log('settingIsError', settingError);
    }
  }, [settingData, settingIsSuccess, settingIsError]);

  return (
    <nav className="sticky top-0 bg-[#1f2746] shadow-lg z-50">
      <div className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            handleClickOnDashboard();
          }}
        >
          {websiteLogo &&
            websiteLogo.map((item, index) => {
              if (item?.keyName === 'Main_Logo') {
                return (
                  <img
                    key={index + 'key'}
                    src={`${mainLogoImage}${item?.valueContent}`}
                    alt={item?.keyName}
                    className="h-12"
                  />
                );
              }
              return null;
            })}
        </div>

        <div className="flex items-center space-x-8">
          <button
            className={`font-semibold text-white ${getActiveClass('')}`}
            onClick={() => handleLinkClick('')}
          >
            Home
          </button>
          <button
            className={`font-semibold text-white ${getActiveClass('aboutUs')}`}
            onClick={() => handleLinkClick('aboutUs')}
          >
            About Us
          </button>
          <div className="relative">
            <button
              className={`font-semibold text-white flex items-center ${getActiveClass('holidays')}`}
              onClick={togglePackagesDropdown}
            >
              Packages
              <ChevronDownIcon className="ml-2 text-white" />
            </button>
            {isPackagesOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => handleLinkClick('International', true)}
                >
                  International
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => handleLinkClick('Domestic', true)}
                >
                  Domestic
                </button>
              </div>
            )}
          </div>
          <button
            className={`font-semibold text-white ${getActiveClass('flights')}`}
            onClick={() => handleLinkClick('flights')}
          >
            Flights Booking
          </button>
          <button
            className={`font-semibold text-white ${getActiveClass('hotels')}`}
            onClick={() => handleLinkClick('hotels')}
          >
            Hotels Booking
          </button>
          <button
            className={`font-semibold text-white ${getActiveClass('Blogs')}`}
            onClick={() => handleLinkClick('Blogs')}
          >
            Blogs
          </button>
          <button
            className={`font-semibold text-white ${getActiveClass('contact')}`}
            onClick={() => handleLinkClick('contact')}
          >
            Contacts
          </button>
        </div>
        <div className='cursor-pointer' onClick={toggleDrawer}>
          <div className='relative'>
            <div>
              <IoCartOutline size={35} color='#ef4444' />
            </div>
            <div className='absolute bottom-5 left-7 py-[1px] px-[7px] bg-yellow-500 rounded-full h-fit'>
              <p className='text-black h-fit'>{addToCart?.length}</p>
            </div>
          </div>
        </div>

        <AddToCartDrawer toggleDrawer={toggleDrawer} isOpen={isOpen} />

      </div>
    </nav>
  );
};

export default NavBar;