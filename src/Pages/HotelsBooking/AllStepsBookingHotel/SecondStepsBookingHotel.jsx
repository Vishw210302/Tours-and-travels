import React, { useRef, useState } from 'react';
import { CgCalendarDates } from "react-icons/cg";
import { FaShower, FaTv } from "react-icons/fa";
import { FaPerson, FaWifi } from "react-icons/fa6";
import { MdOutlineLogin, MdOutlinePets } from "react-icons/md";
import { RiDrinksLine } from "react-icons/ri";
import { TbAirConditioning, TbDisabled } from "react-icons/tb";
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const SecondStepsBookingHotel = ({ setHotelPriceSelect, selectedHotel }) => {

    const swiperRef = useRef(null);
    const [selectedHotelPrice, setSelectedHotelPrice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    const handleSelectHotelPrice = (indexHotel) => {
        setSelectedHotelPrice(indexHotel);
        setHotelPriceSelect(true);
    };

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
    };

    return (
        <>
            <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 w-[95%] h-fit'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='flex flex-row items-center gap-3'>
                            <MdOutlineLogin size={25} color='#3cb7ff' />
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Check In</p>
                                <p className='text-gray-600 text-sm font-semibold'>22/01/2025</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <MdOutlineLogin size={25} color='#3cb7ff' />
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Check Out</p>
                                <p className='text-gray-600 text-sm font-semibold'>23/01/2025</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <CgCalendarDates size={25} color='#3cb7ff' />
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Night</p>
                                <p className='text-gray-600 text-sm font-semibold'>1</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <FaPerson size={25} color='#3cb7ff' />
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Adult</p>
                                <p className='text-gray-600 text-sm font-semibold'>1</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <FaPerson size={25} color='#3cb7ff' />
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Children</p>
                                <p className='text-gray-600 text-sm font-semibold'>1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg my-2 w-[95%] h-fit rounded-md py-2'>
                <div className='px-3 flex flex-row gap-2'>
                    <div className='w-[33%] h-fit relative'>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 3000 }}
                            modules={[Autoplay]}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                        >
                            {selectedHotel?.hotelImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className='relative w-[100%] h-[250px]' onClick={() => handleImageClick(image?.url)}>
                                        <img
                                            src={image?.url}
                                            alt={`Slide ${index + 1}`}
                                            className='object-cover w-full h-full cursor-pointer'
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className='flex flex-row justify-between gap-3 w-[100%] absolute bottom-[36%] z-10 p-2'>
                            <div className='w-fit h-fit' style={{ lineHeight: 0 }} onClick={() => swiperRef.current.slidePrev()}>
                                <p className='text-3xl text-center text-black p-1 cursor-pointer bg-white rounded-lg'>
                                    ←
                                </p>
                            </div>
                            <div className='w-fit h-fit' style={{ lineHeight: 0 }} onClick={() => swiperRef.current.slideNext()}>
                                <p className='text-3xl text-center text-black p-1 cursor-pointer bg-white rounded-lg'>
                                    →
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className='text-[26px] text-gray-700 font-semibold'>{selectedHotel?.hotelName}</h1>
                        <p className='text-justify text-lg tracking-wide'>
                            {selectedHotel?.description}
                        </p>
                    </div>
                </div>

                <div className='px-3'>
                    <p className='text-2xl text-gray-500 font-semibold my-2'>Characteristics</p>
                    <div className='flex flex-row items-center gap-3 my-3'>
                        {selectedHotel?.amenities?.wifi &&
                            <FaWifi size={25} color='#3cb7ff' className='cursor-pointer' />
                        }
                        {selectedHotel?.amenities?.tv &&
                            <FaTv size={25} color='#3cb7ff' className='cursor-pointer' />
                        }
                        {selectedHotel?.amenities?.ac &&
                            <TbAirConditioning size={25} color='#3cb7ff' className='cursor-pointer' />
                        }
                        {selectedHotel?.amenities?.bathroom &&
                            <FaShower size={25} color='#3cb7ff' className='cursor-pointer' />
                        }
                        {selectedHotel?.amenities?.miniBar &&
                            <RiDrinksLine size={25} color='#3cb7ff' className='cursor-pointer' />
                        }
                        {selectedHotel?.amenities?.petsAllowed &&
                            <MdOutlinePets size={25} color='#3cb7ff' className='cursor-pointer' />
                        }
                        {selectedHotel?.amenities?.disableFacilities &&
                            <TbDisabled size={25} color='#3cb7ff' className='cursor-pointer' />
                        }
                    </div>
                </div>

                <div className='px-3'>
                    <h2 className='text-2xl text-gray-500 font-semibold mb-4'>Price</h2>
                    <div className='space-y-3'>
                        {selectedHotel?.pricingOptions.map((items, indexHotel) => (
                            <div key={indexHotel} className={`mt-3 card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg w-[100%] h-fit mb-2 ${selectedHotelPrice === indexHotel ? 'border-4 border-blue-500' : ''}`}>
                                <div className="border border-gray-300 rounded-lg p-4 shadow-sm" onClick={() => handleSelectHotelPrice(indexHotel)}>
                                    <label className="flex items-center space-x-4 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="price-option"
                                            className="form-radio h-5 w-5 text-blue-600"
                                        />
                                        <div className="flex-1 flex justify-between items-center">
                                            <div>
                                                <p className="text-lg text-gray-700 font-semibold">{items?.type}</p>
                                                <div className='flex gap-2'>
                                                    <p className="text-md text-gray-500">{items?.description}</p>
                                                    {items?.inclusions && <span className='border-r-2 border-gray-400'></span>}
                                                    <p className="text-md text-gray-500">{items?.inclusions}</p>
                                                </div>
                                            </div>
                                            <span className="text-red-600 text-xl font-semibold">{items?.totalPrice}</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
                        <div>
                            <button
                                className="absolute top-2 right-2 p-[5px] w-fit h-fit bg-black text-white font-bold text-2xl"
                                onClick={closeModal}
                            >
                                x
                            </button>
                        </div>
                        <img
                            src={modalImage}
                            alt="Modal View"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default SecondStepsBookingHotel;