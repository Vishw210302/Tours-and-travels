import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainLogo from "../../assets/asgradLogo.png"

const NavBar = () => {
  const pathname = window.location.pathname.replace('/', '');
  const [activeLink, setActiveLink] = useState(pathname);
  const [windowHeight, setWindowHeight] = useState(false);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (link, isDropdownItem = false) => {
    setActiveLink(isDropdownItem ? 'holidays' : link);
    navigate(`/${link}`);
    if (isPackagesOpen) {
      setIsPackagesOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setWindowHeight(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getActiveClass = (link) => (
    activeLink === link || (link === 'holidays' && activeLink === 'holidays')
      ? "bg-[#161b31] border-t-4 border-t-[#c62a82]"
      : ""
  );

  const togglePackagesDropdown = () => {
    setIsPackagesOpen(!isPackagesOpen);
    setActiveLink('holidays');
  };

  const handleClickOnDashboard = () => {
    navigate("/");
  }

  return (
    <>
      <nav className={`sticky top-0 bg-[#1f2746] ${windowHeight > 55 ? "h-[80px]" : "h-[90px]"} z-50 transition-all duration-300`}>
        <div className='h-full container mx-auto grid grid-cols-3 px-4'>
          <div className='flex justify-start items-center cursor-pointer w-fit' onClick={() => {
            handleClickOnDashboard()
          }}>
            {/* <img src="https://ld-wt73.template-help.com/wt_61270/images/logo-white.png" alt="Logo" /> */}
            <img src={mainLogo} alt="Logo" className='h-[78px]' />
          </div>
          <div className='col-span-2'>
            <div className='grid grid-cols-6 gap-4 items-center h-full'>

              <button
                className={`flex justify-center items-center h-full ${getActiveClass('')}`}
                onClick={() => handleLinkClick('')}
              >
                <div className='font-semibold text-lg text-white'>HOME</div>
              </button>

              <button
                className={`flex justify-center items-center h-full ${getActiveClass('aboutUs')}`}
                onClick={() => handleLinkClick('aboutUs')}
              >
                <div className='font-semibold text-lg text-white'>About Us</div>
              </button>


              <div className="relative h-full">
                <button
                  className={`flex justify-center items-center h-full w-full ${getActiveClass('holidays')}`}
                  onClick={togglePackagesDropdown}
                >
                  <div className='font-semibold text-lg text-white mr-2'>PACKAGES</div>
                  <span className="text-white text-lg">&#9662;</span>
                </button>
                {isPackagesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg">
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
                className={`flex justify-center items-center h-full ${getActiveClass('flights')}`}
                onClick={() => handleLinkClick('flights')}
              >
                <div className='font-semibold text-lg text-white'>Flights Details</div>
              </button>

              <button
                className={`flex justify-center items-center h-full ${getActiveClass('Blogs')}`}
                onClick={() => handleLinkClick('Blogs')}
              >
                <div className='font-semibold text-lg text-white'>Blogs</div>
              </button>
              <button
                className={`flex justify-center items-center h-full ${getActiveClass('contact')}`}
                onClick={() => handleLinkClick('contact')}
              >
                <div className='font-semibold text-lg text-white'>CONTACTS</div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
