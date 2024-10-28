import React, { useEffect, useState } from 'react';
import { CgCalendarDates } from "react-icons/cg";
import { FaShower, FaTv } from "react-icons/fa";
import { FaPerson, FaWifi } from "react-icons/fa6";
import { MdOutlineLogin, MdOutlinePets } from "react-icons/md";
import { RiDrinksLine } from "react-icons/ri";
import { TbAirConditioning, TbDisabled } from "react-icons/tb";
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

const FirstStepsBookingHotel = ({ setIsHotelSelected, onSelectHotel }) => {
    const [selectedHotel, setSelectedHotel] = useState(null);
    const location = useLocation();
    const { formData, hotelCityData } = location.state || {};
    const [particularHotelListing, setParticularHotelListing] = useState([]);
    const [formInputData, setFormInputData] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(5);
    const [hoveredAmenity, setHoveredAmenity] = useState({});

    useEffect(() => {
        if (hotelCityData?.data && Array.isArray(hotelCityData.data)) {
            setParticularHotelListing(hotelCityData.data);
            setFormInputData(formData);
        } else {
            setParticularHotelListing([]);
            setFormInputData([]);
        }
    }, [hotelCityData]);

    const handleSelectHotel = (index) => {
        setSelectedHotel(index);
        setIsHotelSelected(true);
        onSelectHotel(particularHotelListing[index]);
    };

    const calculateNights = (checkinDate, checkoutDate) => {
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        const differenceInTime = checkout - checkin;
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return differenceInDays;
    };

    const nights = calculateNights(formInputData?.checkinDate, formInputData?.checkoutDate);

    const loadMoreHotels = () => {
        setItemsToShow(prev => prev + 5);
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
                                <p className='text-gray-600 text-sm font-semibold'>{formInputData?.checkinDate}</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <MdOutlineLogin size={25} color='#3cb7ff' />
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Check Out</p>
                                <p className='text-gray-600 text-sm font-semibold'>{formInputData?.checkoutDate}</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <div>
                                <CgCalendarDates size={25} color='#3cb7ff' />
                            </div>
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Night</p>
                                <p className='text-gray-600 text-sm font-semibold'>{nights}</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <div>
                                <FaPerson size={25} color='#3cb7ff' />
                            </div>
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Adult</p>
                                <p className='text-gray-600 text-sm font-semibold'>{formInputData?.adults}</p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <div>
                                <FaPerson size={25} color='#3cb7ff' />
                            </div>
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Children</p>
                                <p className='text-gray-600 text-sm font-semibold'>{formInputData?.children}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {particularHotelListing && particularHotelListing.slice(0, itemsToShow).map((items, index) => {
                const amenities = [
                    { name: 'Wifi', icon: <FaWifi size={25} color='#3cb7ff' className='cursor-pointer' />, condition: items?.amenities?.wifi },
                    { name: 'TV', icon: <FaTv size={25} color='#3cb7ff' className='cursor-pointer' />, condition: items?.amenities?.tv },
                    { name: 'Air Conditioning', icon: <TbAirConditioning size={25} color='#3cb7ff' className='cursor-pointer' />, condition: items?.amenities?.ac },
                    { name: 'Bathroom', icon: <FaShower size={25} color='#3cb7ff' className='cursor-pointer' />, condition: items?.amenities?.bathroom },
                    { name: 'Mini Bar', icon: <RiDrinksLine size={25} color='#3cb7ff' className='cursor-pointer' />, condition: items?.amenities?.miniBar },
                    { name: 'Pets Allowed', icon: <MdOutlinePets size={25} color='#3cb7ff' className='cursor-pointer' />, condition: items?.amenities?.petsAllowed },
                    { name: 'Disable Facilities', icon: <TbDisabled size={25} color='#3cb7ff' className='cursor-pointer' />, condition: items?.amenities?.disableFacilities }
                ];

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
                                                <img src={image.url} alt="hotel-images" className='w-[100%] h-[230px] object-cover' />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>

                            <div>
                                <h4 className='font-semibold text-2xl text-black'>{items?.hotelName}</h4>
                                <p className='font-medium text-lg text-black py-2'>{items?.description}</p>

                                <div className='flex flex-row flex-wrap gap-4 py-2'>
                                    {amenities.map((amenity, amenityIndex) => (
                                        amenity.condition && (
                                            <div
                                                key={amenityIndex}
                                                className="relative flex items-center"
                                                onMouseEnter={() => setHoveredAmenity({ name: amenity.name, index })}
                                                onMouseLeave={() => setHoveredAmenity({})}
                                            >
                                                {amenity.icon}
                                                {hoveredAmenity.name === amenity.name && hoveredAmenity.index === index && (
                                                    <div className='absolute top-[25px] py-[6px] px-[8px] text-white bg-black p-1 rounded-md text-sm'>
                                                        {amenity.name}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>

                            <div className='text-center flex flex-col items-center justify-center'>
                                <div className='w-fit'>
                                    <h3 className='font-semibold text-2xl text-black'>
                                        {items?.basePrice}
                                    </h3>
                                </div>
                                <div className='w-fit'>
                                    <button
                                        onClick={() => handleSelectHotel(index)}
                                        className='bg-red-500 px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 hover:bg-red-700'
                                    >
                                        Select Hotel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className='flex flex-row justify-center'>
                {itemsToShow < particularHotelListing.length && (
                    <button
                        onClick={loadMoreHotels}
                        className='flex flex-row justify-center bg-blue-500 px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 hover:bg-blue-700 mt-3'
                    >
                        Show More
                    </button>
                )}
            </div>
        </>
    )
};

export default FirstStepsBookingHotel;