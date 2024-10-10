import React, { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const LocomotiveScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null);
  const scrollInstance = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollInstance.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        smoothMobile: true,
        getDirection: true,
        getSpeed: true,
        inertia: 0.8,
        multiplier: 1.2, // Увеличивает скорость скролла
        lerp: 0.1, // Уменьшает задержку скролла
      });

      const resizeObserver = new ResizeObserver(() => {
        if (scrollInstance.current) {
          scrollInstance.current.update();
        }
        // Update content height when size changes
        setContentHeight(scrollRef.current.scrollHeight);
      });

      resizeObserver.observe(scrollRef.current);

      // Set initial content height
      setContentHeight(scrollRef.current.scrollHeight);

      return () => {
        if (scrollInstance.current) {
          scrollInstance.current.destroy();
        }
        resizeObserver.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (scrollInstance.current) {
      scrollInstance.current.update();
    }
  }, [children, contentHeight]);

  return (
    <div 
      data-scroll-container 
      ref={scrollRef} 
      style={{ 
        overflow: 'visible',
        height: 'auto',
        minHeight: '100vh'
      }}
    >
      {children}
      <div style={{ height: '200px' }} /> 
    </div>
  );
};

export default LocomotiveScrollWrapper;