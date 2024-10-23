import React, { useState } from 'react';
import { CgCalendarDates } from "react-icons/cg";
import { FaShower, FaTv } from "react-icons/fa";
import { FaPerson, FaWifi } from "react-icons/fa6";
import { MdOutlineLogin, MdOutlinePets } from "react-icons/md";
import { RiDrinksLine } from "react-icons/ri";
import { TbAirConditioning, TbDisabled } from "react-icons/tb";
import { Swiper, SwiperSlide } from 'swiper/react';
import hotelImage from "../../../assets/banner-hotel-image.jpg";

const FirstStepsBookingHotel = ({ setIsHotelSelected }) => {

    const [selectedHotel, setSelectedHotel] = useState(null);

    const allHotelListing = [
        {
            hotelImages: [
                { hotelImage: hotelImage },
                { hotelImage: hotelImage },
                { hotelImage: hotelImage },
            ],
            hotelName: "Taj Skyline",
            hotelContent: "Enjoy luxury at its finest in the heart of the city, with stunning skyline views and world-class amenities.",
            hotelAccessories: {
                wifi: 1,
                tv: 1,
                ac: 1,
                bathroom: 1,
                miniBar: 1,
                petsAllowed: 1,
                disableFacilities: 1,
            },
            hotelPrice: "5000₹"
        },
        {
            hotelImages: [
                { hotelImage: hotelImage },
                { hotelImage: hotelImage },
                { hotelImage: hotelImage },
            ],
            hotelName: "ITC Narmada",
            hotelContent: "Enjoy luxury at its finest in the heart of the city, with stunning skyline views and world-class amenities.",
            hotelAccessories: {
                wifi: 1,
                tv: 1,
                ac: 1,
                bathroom: 1,
                miniBar: 1,
                petsAllowed: 1,
                disableFacilities: 1,
            },
            hotelPrice: "8000₹"
        },
    ];

    const handleSelectHotel = (index) => {
        setSelectedHotel(index);
        setIsHotelSelected(true);
    };

    return (
        <>
            <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 w-[95%] h-fit rounded-lg'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='flex flex-row items-center gap-3'>
                            <div>
                                <MdOutlineLogin size={25} color='#3cb7ff' />
                            </div>
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Check In</p>
                                <p className='text-gray-600 text-sm font-semibold'>22/01/2025</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <div>
                                <CgCalendarDates size={25} color='#3cb7ff' />
                            </div>
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Night</p>
                                <p className='text-gray-600 text-sm font-semibold'>1</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <div>
                                <FaPerson size={25} color='#3cb7ff' />
                            </div>
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Adult</p>
                                <p className='text-gray-600 text-sm font-semibold'>1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {allHotelListing && allHotelListing.map((items, index) => {
                return (
                    <div
                        key={index + "1"}
                        className={`mt-3 card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg w-[95%] h-fit mb-2 ${selectedHotel === index ? 'border-4 border-blue-500' : ''}`}
                    >
                        <div className="grid grid-cols-[25%,55%,auto] gap-5 items-center">

                            <div>
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    loop={true}
                                >
                                    {items?.hotelImages && items?.hotelImages.map((image, index) => {
                                        return (
                                            <SwiperSlide key={index + "Hotel"}>
                                                <img src={image.hotelImage} alt="hotel-images" className='w-full rounded-md object-cover h-full' />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>

                            <div>
                                <div>
                                    <h4 className='font-semibold text-2xl text-black'>{items?.hotelName}</h4>
                                    <p className='font-medium text-lg text-black py-2'>{items?.hotelContent}</p>
                                </div>

                                <div className='flex flex-row flex-wrap gap-4 py-2'>
                                    {items?.hotelAccessories?.wifi === 1 &&
                                        <div className='cursor-pointer'>
                                            <FaWifi size={25} color='#3cb7ff' />
                                        </div>
                                    }
                                    {items?.hotelAccessories?.tv === 1 &&
                                        <div className='cursor-pointer'>
                                            <FaTv size={25} color='#3cb7ff' />
                                        </div>
                                    }
                                    {items?.hotelAccessories?.ac === 1 &&
                                        <div className='cursor-pointer'>
                                            <TbAirConditioning size={25} color='#3cb7ff' />
                                        </div>
                                    }
                                    {items?.hotelAccessories?.bathroom === 1 &&
                                        <div className='cursor-pointer'>
                                            <FaShower size={25} color='#3cb7ff' />
                                        </div>
                                    }
                                    {items?.hotelAccessories?.miniBar === 1 &&
                                        <div className='cursor-pointer'>
                                            <RiDrinksLine size={25} color='#3cb7ff' />
                                        </div>
                                    }
                                    {items?.hotelAccessories?.petsAllowed === 1 &&
                                        <div className='cursor-pointer'>
                                            <MdOutlinePets size={25} color='#3cb7ff' />
                                        </div>
                                    }
                                    {items?.hotelAccessories?.disableFacilities === 1 &&
                                        <div className='cursor-pointer'>
                                            <TbDisabled size={25} color='#3cb7ff' />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className='text-center flex flex-col items-center justify-center'>
                                <div className='w-fit'>
                                    <h3 className='font-semibold text-2xl text-black'>
                                        {items?.hotelPrice}
                                    </h3>
                                </div>
                                <div className='w-fit'>
                                    <button
                                        onClick={() => handleSelectHotel(index)}
                                        className='bg-red-500 px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 hover:bg-red-600'
                                    >
                                        Select Hotel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default FirstStepsBookingHotel;