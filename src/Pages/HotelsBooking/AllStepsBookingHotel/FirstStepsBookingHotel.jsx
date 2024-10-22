import React from 'react';
import { CgCalendarDates } from "react-icons/cg";
import { FaShower, FaTv } from "react-icons/fa";
import { FaPerson, FaWifi } from "react-icons/fa6";
import { MdOutlineLogin, MdOutlinePets } from "react-icons/md";
import { RiDrinksLine } from "react-icons/ri";
import { TbAirConditioning, TbDisabled } from "react-icons/tb";
import { Swiper, SwiperSlide } from 'swiper/react';
import hotelImage from "../../../assets/banner-hotel-image.jpg";

const FirstStepsBookingHotel = () => {

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
    ];

    return (
        <>
            <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 w-[95%] h-fit'>
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
                    <div className='bg-red-300 p-2 rounded-md cursor-pointer hover:bg-red-400'>
                        <p className='text-white font-semibold text-base'>Change Date</p>
                    </div>
                </div>
            </div>

            {allHotelListing && allHotelListing.map((items, index) => {
                return (
                    <div key={index + "1"} className='mt-3 card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg  w-[95%] h-fit mb-2'>
                        <div className='flex flex-row justify-between items-center gap-5'>

                            <div className='w-[33%]'>
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    loop={true}
                                >
                                    {items && items?.hotelImages.map((hotelImage, index) => (
                                        <SwiperSlide key={index + "index"} className="swiperItem">
                                            <img src={hotelImage?.hotelImage} alt="hotel_image" className='w-[400px] h-[200px]' />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <div className='w-[65%]'>
                                <p className='font-bold text-gray-700 text-[24px]'>{items?.hotelName}</p>
                                <p className='text-justify'>{items?.hotelContent}</p>

                                <div className='flex flex-row items-center gap-2 mt-2'>
                                    {items?.hotelAccessories?.wifi == 1 && (
                                        <div className='w-fit h-fit cursor-pointer'>
                                            <FaWifi size={25} color='gray' />
                                        </div>
                                    )}
                                    {items?.hotelAccessories?.tv == 1 && (
                                        <div className='w-fit h-fit cursor-pointer'>
                                            <FaTv size={25} color='gray' />
                                        </div>
                                    )}
                                    {items?.hotelAccessories?.ac == 1 && (
                                        <div className='w-fit h-fit cursor-pointer'>
                                            <TbAirConditioning size={25} color='gray' />
                                        </div>
                                    )}
                                    {items?.hotelAccessories?.bathroom == 1 && (
                                        <div className='w-fit h-fit cursor-pointer'>
                                            <FaShower size={25} color='gray' />
                                        </div>
                                    )}
                                    {items?.hotelAccessories?.miniBar == 1 && (
                                        <div className='w-fit h-fit cursor-pointer'>
                                            <RiDrinksLine size={25} color='gray' />
                                        </div>
                                    )}
                                    {items?.hotelAccessories?.petsAllowed == 1 && (
                                        <div className='w-fit h-fit cursor-pointer'>
                                            <MdOutlinePets size={25} color='gray' />
                                        </div>
                                    )}
                                    {items?.hotelAccessories?.disableFacilities == 1 && (
                                        <div className='w-fit h-fit cursor-pointer'>
                                            <TbDisabled size={25} color='gray' />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='w-[15%]'>
                                <div className='w-fit text-center'>
                                    <div className='flex flex-row justify-center mb-2'>
                                        <FaPerson size={27} color='#3cb7ff' />
                                    </div>
                                    <div className='mb-2'>
                                        <p className='text-lg font-semibold'>{items?.hotelPrice}</p>
                                    </div>
                                    <div className='bg-red-300 p-3 rounded-md hover:bg-red-400 cursor-pointer'>
                                        <p className='text-white font-semibold'>Select Hotels</p>
                                    </div>
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