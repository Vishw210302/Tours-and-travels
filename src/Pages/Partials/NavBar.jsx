import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const pathname = window.location.pathname.replace('/', '')
  const [activeLink, setActiveLink] = useState(pathname);
  const [windowHeight, setWindowHeight] = useState(false);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (link, isDropdownItem = false) => {
    setActiveLink(isDropdownItem ? 'holidays' : link); // Keep "holidays" active for dropdown items
    navigate(`/${link}`);
    if (isPackagesOpen) {
      setIsPackagesOpen(false); // Close dropdown when clicking any link
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setWindowHeight(window.scrollY);
    });
  }, []);

  const getActiveClass = (link) => (activeLink === link || (link === 'holidays' && activeLink === 'holidays') ? "bg-[#161b31] border-t-4 border-t-[#c62a82]" : "");

  const togglePackagesDropdown = () => {
    setIsPackagesOpen(!isPackagesOpen);
    setActiveLink('holidays');
  };

  return (
    <>
      <nav className={`sticky top-0 bg-[#1f2746] ${windowHeight > 55 ? "h-[80px]" : "h-[90px]"}  z-50 transition-all duration-300`}>
        <div className='h-full container mx-auto flex flex-row justify-between px-4'>
          <div className='w-[15%] h-full flex flex-row justify-center items-center'>
            <img src="https://ld-wt73.template-help.com/wt_61270/images/logo-white.png" alt="" />
          </div>
          <div className='w-[40%]'>
            <div className='w-full h-full flex flex-row justify-between px-9'>
              <button
                className={`flex flex-row justify-center px-7 items-center ${getActiveClass('')}`}
                onClick={() => handleLinkClick('')}
              >
                <div className='font-semibold text-lg text-white'>HOME</div>
              </button>
              <button
                className={`flex flex-row justify-center px-7 items-center ${getActiveClass('about')}`}
                onClick={() => handleLinkClick('about')}
              >
                <div className='font-semibold text-lg text-white'>ABOUT</div>
              </button>
              <div className="relative">
                <button
                  className={`flex flex-row justify-center px-7 items-center h-[100%] ${getActiveClass('holidays')}`}
                  onClick={togglePackagesDropdown}
                >
                  <div className='font-semibold text-lg text-white mr-2'>PACKAGES</div>
                  <span className="text-white text-lg">&#9662;</span>
                </button>
                {isPackagesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                      onClick={() => handleLinkClick('International', true)}
                    >
                      International
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                      onClick={() => handleLinkClick('Domestic', true)}
                    >
                      Domestic
                    </button>
                  </div>
                )}
              </div>

              <button
                className={` ${getActiveClass('flights')}`}
                onClick={() => handleLinkClick('flights')}
              >
                <div className='font-semibold text-lg text-white'>flights Details</div>
              </button>
              <button
                className={` ${getActiveClass('contact')}`}
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
