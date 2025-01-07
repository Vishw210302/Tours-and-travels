import { ChevronDown, Menu, ShoppingCart, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllApiContext } from '../../Context/allApiContext';
import AddToCartDrawer from '../AddToCartDrawer/AddToCartDrawer';

const NavBar = ({ settingData, settingIsSuccess, settingIsError, settingError }) => {

  const pathname = window.location.pathname.replace('/', '');
  const [activeLink, setActiveLink] = useState(pathname);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const getActiveClass = (link) => {
    const isActive = activeLink === link || (link === 'holidays' && activeLink === 'holidays');
    return isActive
      ? "relative text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500"
      : "text-gray-300 hover:text-white";
  };

  const getMobileActiveClass = (link) => {
    const isActive = activeLink === link || (link === 'holidays' && activeLink === 'holidays');
    return isActive
      ? "bg-gradient-to-r from-red-500 to-red-600 text-gray-900"
      : "text-gray-300 hover:bg-gray-700";
  };

  const togglePackagesDropdown = () => {
    setIsPackagesOpen(!isPackagesOpen);
    setActiveLink('holidays');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      <nav className={`${isScrolled ? 'bg-gray-900/95 backdrop-blur-md' : 'bg-gray-900'} 
        transition-all duration-300 sticky top-0 z-50 border-gray-800`}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
              {websiteLogo && websiteLogo.map((item, index) => {
                if (item?.keyName === 'Main_Logo') {
                  return (
                    <img
                      key={index + 'key'}
                      src={`${mainLogoImage}${item?.valueContent}`}
                      alt={item?.keyName}
                      className="sm:h-[48px] h-[44px]"
                    />
                  );
                }
                return null;
              })}
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              <button
                className={`px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200 ${getActiveClass('')}`}
                onClick={() => handleLinkClick('')}
              >
                Home
              </button>
              <button
                className={`px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200 ${getActiveClass('aboutUs')}`}
                onClick={() => handleLinkClick('aboutUs')}
              >
                About
              </button>

              <div className="relative">
                <button
                  className={`px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200 flex items-center space-x-1 ${getActiveClass('holidays')}`}
                  onClick={togglePackagesDropdown}
                >
                  <span>Packages</span>
                  <ChevronDown size={14} className={`transform transition-transform duration-200 ${isPackagesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isPackagesOpen && (
                  <div className="absolute top-full mt-1 w-48 bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="py-1">
                      <button
                        className="block w-full text-left px-4 py-2 text-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                        onClick={() => handleLinkClick('International', true)}
                      >
                        International
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                        onClick={() => handleLinkClick('Domestic', true)}
                      >
                        Domestic
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                className={`px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200 ${getActiveClass('flights')}`}
                onClick={() => handleLinkClick('flights')}
              >
                Flights
              </button>
              <button
                className={`px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200 ${getActiveClass('hotels')}`}
                onClick={() => handleLinkClick('hotels')}
              >
                Hotels
              </button>
              <button
                className={`px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200 ${getActiveClass('Blogs')}`}
                onClick={() => handleLinkClick('Blogs')}
              >
                Blog
              </button>
              <button
                className={`px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200 ${getActiveClass('contact')}`}
                onClick={() => handleLinkClick('contact')}
              >
                Contact
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="relative p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                onClick={toggleDrawer}
              >
                <ShoppingCart size={25} />
                {addToCart?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                    {addToCart?.length}
                  </span>
                )}
              </button>

              <button
                className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={25} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="border-t border-gray-800 py-2">
                <div className="space-y-1 px-2">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${getMobileActiveClass('')}`}
                    onClick={() => handleLinkClick('')}
                  >
                    Home
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${getMobileActiveClass('aboutUs')}`}
                    onClick={() => handleLinkClick('aboutUs')}
                  >
                    About
                  </button>

                  <div>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-between ${getMobileActiveClass('holidays')}`}
                      onClick={togglePackagesDropdown}
                    >
                      <span>Packages</span>
                      <ChevronDown size={14} className={`transform transition-transform duration-200 ${isPackagesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isPackagesOpen && (
                      <div className="mt-1 space-y-1">
                        <button
                          className="w-full text-left pl-6 pr-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                          onClick={() => handleLinkClick('International', true)}
                        >
                          International
                        </button>
                        <button
                          className="w-full text-left pl-6 pr-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                          onClick={() => handleLinkClick('Domestic', true)}
                        >
                          Domestic
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${getMobileActiveClass('flights')}`}
                    onClick={() => handleLinkClick('flights')}
                  >
                    Flights
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${getMobileActiveClass('hotels')}`}
                    onClick={() => handleLinkClick('hotels')}
                  >
                    Hotels
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${getMobileActiveClass('Blogs')}`}
                    onClick={() => handleLinkClick('Blogs')}
                  >
                    Blog
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${getMobileActiveClass('contact')}`}
                    onClick={() => handleLinkClick('contact')}
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AddToCartDrawer toggleDrawer={toggleDrawer} isOpen={isOpen} />
    </>
  );
};

export default NavBar;