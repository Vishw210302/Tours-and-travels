import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const [activeLink, setActiveLink] = useState('');
  const [windowHeight, setWindowHeight] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setActiveLink(link);
    navigate(`/${link}`)
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setWindowHeight(window.scrollY);
    });
  }, []);

  const getActiveClass = (link) => (activeLink === link ? "bg-[#161b31] border-t-4 border-t-[#c62a82]" : "");

  return (
    <>
      <nav className={`sticky top-0 bg-[#1f2746] ${windowHeight > 55 ? "h-[80px]" : "h-[100px]"}  z-50 transition-all duration-300`}>
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
              <button
                className={`flex flex-row justify-center px-7 items-center ${getActiveClass('blog')}`}
                onClick={() => handleLinkClick('blog')}
              >
                <div className='font-semibold text-lg text-white'>BLOG</div>
              </button>
              <button
                className={`flex flex-row justify-center px-7 items-center ${getActiveClass('contact')}`}
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
