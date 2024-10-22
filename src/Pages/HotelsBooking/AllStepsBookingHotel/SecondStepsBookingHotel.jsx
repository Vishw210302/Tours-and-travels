import React, { useRef } from 'react';
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
import image1 from "../../../assets/bg-img2.jpg";
import image2 from "../../../assets/image.jpg";
import image3 from "../../../assets/people-travels.jpg";


const SecondStepsBookingHotel = () => {

    const swiperRef = useRef(null);
    const staticImages = [image1, image2, image3];

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
                                <MdOutlineLogin size={25} color='#3cb7ff' />
                            </div>
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Check Out</p>
                                <p className='text-gray-600 text-sm font-semibold'>23/01/2025</p>
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
            <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg my-2 w-[95%] h-fit rounded-md py-2'>

                <div className='px-3'>
                    <h1 className='text-[26px] text-gray-700 font-semibold mb-3'>Single Room</h1>
                </div>

                <div className='px-3 flex flex-row gap-2'>
                    <div className='w-[33%] h-fit relative'>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            loop={true}
                            modules={[Autoplay]}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                        >
                            {staticImages.map((image, index) => (
                                <SwiperSlide key={index} >
                                    <div className='relative w-[100%] h-[250px]'>
                                        <img
                                            src={image}
                                            alt={`Slide ${index + 1}`}
                                            className='object-cover w-full h-full'
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className='flex flex-row justify-between gap-3 w-[100%] absolute bottom-[30%] z-10 p-2'>
                            <div
                                className='w-fit h-fit'
                                style={{ lineHeight: 0 }}
                                onClick={() => swiperRef.current.slidePrev()}
                            >
                                <p className='text-3xl text-center text-black p-1 cursor-pointer bg-white rounded-lg '>
                                    ←
                                </p>
                            </div>
                            <div
                                className='w-fit'
                                style={{ lineHeight: 0 }}
                                onClick={() => swiperRef.current.slideNext()}
                            >
                                <p className='text-3xl text-center text-black p-1 cursor-pointer bg-white rounded-lg'>
                                    →
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-justify'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, aspernatur magnam adipisci illo ut, quae nisi pariatur distinctio ab qui est maxime. Velit architecto ullam natus tempore debitis culpa consectetur veritatis, error placeat perferendis inventore eveniet molestias ab suscipit cumque porro officia amet. Nam culpa, ea ad at tempora quod!
                        </p>
                    </div>
                </div>

                <div className='px-3'>
                    <p className='text-2xl text-gray-500 font-semibold my-2'>Characteristics</p>
                    <div className='flex flex-row items-center gap-2 my-3'>
                        <div className='w-fit h-fit cursor-pointer'>
                            <FaWifi size={20} color='gray' />
                        </div>
                        <div className='w-fit h-fit cursor-pointer'>
                            <FaTv size={20} color='gray' />
                        </div>
                        <div className='w-fit h-fit cursor-pointer'>
                            <TbAirConditioning size={20} color='gray' />
                        </div>
                        <div className='w-fit h-fit cursor-pointer'>
                            <FaShower size={20} color='gray' />
                        </div>
                        <div className='w-fit h-fit cursor-pointer'>
                            <RiDrinksLine size={20} color='gray' />
                        </div>
                        <div className='w-fit h-fit cursor-pointer'>
                            <MdOutlinePets size={20} color='gray' />
                        </div>
                        <div className='w-fit h-fit cursor-pointer'>
                            <TbDisabled size={20} color='gray' />
                        </div>
                    </div>
                </div>

                <div className="px-3">
                    <h2 className="text-2xl text-gray-500 font-semibold mb-4">Price</h2>
                    <div className="space-y-3">
                        <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                            <label className="flex items-center space-x-4 cursor-pointer">
                                <input
                                    type="radio"
                                    name="price-option"
                                    value="non-refundable"
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <div className="flex-1 flex justify-between items-center">
                                    <div>
                                        <p className="text-lg text-gray-700 font-semibold">Non-refundable Rate</p>
                                        <p className="text-sm text-gray-500">Best available rate</p>
                                    </div>
                                    <span className="text-red-600 text-xl font-semibold">₹ 300</span>
                                </div>
                            </label>
                        </div>

                        <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
                            <label className="flex items-center space-x-4 cursor-pointer">
                                <input
                                    type="radio"
                                    name="price-option"
                                    value="flexible"
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <div className="flex-1 flex justify-between items-center">
                                    <div>
                                        <p className="text-lg text-gray-700 font-semibold">Standard Rate</p>
                                        <div className='flex flex-1 gap-2'>
                                            <p className="text-md text-gray-500">Free cancellation</p>
                                            <span className='border-r-2 border-gray-400'></span>
                                            <p className="text-md text-gray-500">Free cancellation</p>
                                        </div>
                                    </div>
                                    <span className="text-red-600 text-xl font-semibold">₹ 350</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SecondStepsBookingHotel