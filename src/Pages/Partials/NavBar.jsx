import React, { useEffect, useState } from 'react';
import { ChevronDown, Search, Phone, MapPin, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAllApiContext } from '../../Context/allApiContext';
import AddToCartDrawer from '../AddToCartDrawer/AddToCartDrawer';

const NavBar = ({ settingData, settingIsSuccess, settingIsError, settingError }) => {

  const pathname = window.location.pathname.replace('/', '');
  const [activeLink, setActiveLink] = useState(pathname);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [websiteLogo, setWebsiteLogo] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const mainLogoImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/setting-image/`;
  const { addToCart } = useAllApiContext();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (link, isDropdownItem = false) => {
    setActiveLink(isDropdownItem ? 'holidays' : link);
    navigate(`/${link}`);
    if (isPackagesOpen) {
      setIsPackagesOpen(false);
    }
  };

  const getActiveClass = (link) => {
    const baseClasses = "px-4 py-2 rounded-[6px] transition-all duration-300";
    const activeClasses = activeLink === link || (link === 'holidays' && activeLink === 'holidays')
      ? "bg-red-500 text-lg text-white font-medium"
      : "hover:bg-[#1a3a75] text-lg text-white font-medium";
    return `${baseClasses} ${activeClasses}`;
  };

  const togglePackagesDropdown = () => {
    setIsPackagesOpen(!isPackagesOpen);
    setActiveLink('holidays');
  };

  useEffect(() => {
    if (settingIsSuccess) {
      setWebsiteLogo(settingData?.data);
    } else if (settingIsError) {
      console.log('settingIsError', settingError);
    }
  }, [settingData, settingIsSuccess, settingIsError]);

  return (
    <>
      <nav className={`${isScrolled ? 'shadow-lg bg-[#213c5e]' : 'bg-[#213c5e]'} transition-all duration-300 sticky top-0 z-50`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => navigate('/')}
            >
              {websiteLogo && websiteLogo.map((item, index) => {
                if (item?.keyName === 'Main_Logo') {
                  return (
                    <img
                      key={index + 'key'}
                      src={`${mainLogoImage}${item?.valueContent}`}
                      alt={item?.keyName}
                      className='w-[296px]'
                    />
                  );
                }
                return null;
              })}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button
                className={getActiveClass('')}
                onClick={() => handleLinkClick('')}
              >
                Home
              </button>
              <button
                className={getActiveClass('aboutUs')}
                onClick={() => handleLinkClick('aboutUs')}
              >
                About
              </button>
              <div className="relative">
                <button
                  className={`flex items-center ${getActiveClass('holidays')}`}
                  onClick={togglePackagesDropdown}
                >
                  Packages
                  <ChevronDown size={16} className="ml-1 text-white" />
                </button>

                {isPackagesOpen && (
                  <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200">
                    <button
                      className="block w-full text-left px-4 py-3 text-base font-normal text-gray-800 hover:bg-gray-200 hover:rounded-[6px]"
                      onClick={() => handleLinkClick('International', true)}
                    >
                      International
                    </button>
                    <button
                      className="block w-full text-left px-4 py-3 text-base font-normal text-gray-800 hover:bg-gray-200 hover:rounded-[6px]"
                      onClick={() => handleLinkClick('Domestic', true)}
                    >
                      Domestic
                    </button>
                  </div>
                )}
              </div>

              <button
                className={getActiveClass('flights')}
                onClick={() => handleLinkClick('flights')}
              >
                Flights
              </button>
              <button
                className={getActiveClass('hotels')}
                onClick={() => handleLinkClick('hotels')}
              >
                Hotels
              </button>
              <button
                className={getActiveClass('Blogs')}
                onClick={() => handleLinkClick('Blogs')}
              >
                Blog
              </button>
              <button
                className={getActiveClass('contact')}
                onClick={() => handleLinkClick('contact')}
              >
                Contact
              </button>
            </div>

            <div className="hidden space-x-4 lg:flex items-center ml-4">
              <button
                className="relative p-2 hover:bg-gray-700 rounded-full transition-colors"
                onClick={toggleDrawer}
              >
                <ShoppingCart
                  size={30}
                  className="text-white"
                />
                {addToCart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full">
                    {addToCart?.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AddToCartDrawer toggleDrawer={toggleDrawer} isOpen={isOpen} />
    </>
  );
};

export default NavBar;