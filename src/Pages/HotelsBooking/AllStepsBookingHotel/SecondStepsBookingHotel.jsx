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
import ImageModal from '../../ImageModal';

const SecondStepsBookingHotel = ({ setHotelPriceSelect, selectedHotel }) => {

    const swiperRef = useRef(null);
    const [selectedHotelPrice, setSelectedHotelPrice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredAmenity, setHoveredAmenity] = useState(null);
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

    const amenities = [
        { name: 'Wifi', icon: <FaWifi size={25} color='#3cb7ff' className='cursor-pointer' />, condition: selectedHotel?.amenities?.wifi },
        { name: 'TV', icon: <FaTv size={25} color='#3cb7ff' className='cursor-pointer' />, condition: selectedHotel?.amenities?.tv },
        { name: 'Air Conditioning', icon: <TbAirConditioning size={25} color='#3cb7ff' className='cursor-pointer' />, condition: selectedHotel?.amenities?.ac },
        { name: 'Bathroom', icon: <FaShower size={25} color='#3cb7ff' className='cursor-pointer' />, condition: selectedHotel?.amenities?.bathroom },
        { name: 'Mini Bar', icon: <RiDrinksLine size={25} color='#3cb7ff' className='cursor-pointer' />, condition: selectedHotel?.amenities?.miniBar },
        { name: 'Pets Allowed', icon: <MdOutlinePets size={25} color='#3cb7ff' className='cursor-pointer' />, condition: selectedHotel?.amenities?.petsAllowed },
        { name: 'Disable Facilities', icon: <TbDisabled size={25} color='#3cb7ff' className='cursor-pointer' />, condition: selectedHotel?.amenities?.disableFacilities }
    ];

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
                        <h1 className='text-[26px] text-black font-semibold'>{selectedHotel?.hotelName}</h1>
                        <p className='text-justify text-lg tracking-wide'>
                            {selectedHotel?.description}
                        </p>
                    </div>
                </div>

                <div className='px-3'>
                    <p className='text-2xl text-gray-500 font-semibold my-2'>Characteristics</p>
                    <div className='flex flex-row items-center gap-3 my-3'>
                        {amenities.map((amenity, index) => (
                            amenity.condition && (
                                <div
                                    key={index}
                                    className="relative flex items-center"
                                    onMouseEnter={() => setHoveredAmenity(amenity.name)}
                                    onMouseLeave={() => setHoveredAmenity(null)}
                                >
                                    {amenity.icon}
                                    {hoveredAmenity === amenity.name && (
                                        <div className='absolute top-[25px] py-[6px] px-[8px] text-white bg-black p-1 rounded-md text-sm'>
                                            {amenity.name}
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </div>

                <div className='px-3'>
                    <h2 className='text-2xl text-gray-500 font-semibold mb-4'>Price</h2>
                    <div className='space-y-3'>
                        {selectedHotel?.pricingOptions.map((items, indexHotel) => (
                            <div key={indexHotel} className={`mt-3 card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg w-[100%] h-fit mb-2 ${selectedHotelPrice === indexHotel ? 'border-4 border-blue-500' : ''}`} onClick={() => handleSelectHotelPrice(indexHotel)}>
                                <div className="border border-gray-300 rounded-lg p-4 shadow-sm" >
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
            <ImageModal
                isOpen={isModalOpen}
                onClose={closeModal}
                imageUrl={modalImage}
            />
        </>
    );
};

export default SecondStepsBookingHotel;