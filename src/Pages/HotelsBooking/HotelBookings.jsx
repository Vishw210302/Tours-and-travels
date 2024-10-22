import React, { useState } from 'react';
import GetInTouchHotelBooking from './GetInTouchHotelBooking';
import HotelBookingResult from './HotelBookingResult';
import HotelBookingSearch from './HotelBookingSearch';
import HotelTestimonial from './HotelTestimonial';

const HotelBookings = () => {
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);

    const handleSearch = () => {
        setIsSearchPerformed(true);
    };

    return (
        <>
            <div className="relative w-full h-[500px] bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945')] bg-cover bg-center mb-2">
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
            <HotelBookingSearch onSearch={handleSearch} />
            {isSearchPerformed &&
                <HotelBookingResult />
            }
            <div className='bg-[#cbcccb70]'>
                <HotelTestimonial />
            </div>
            <GetInTouchHotelBooking />
        </>
    );
};

export default HotelBookings;