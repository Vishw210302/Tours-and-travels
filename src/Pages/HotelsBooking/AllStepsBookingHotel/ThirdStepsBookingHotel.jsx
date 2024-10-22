import React from 'react';
import { CgCalendarDates } from "react-icons/cg";
import { FaPerson } from "react-icons/fa6";
import { MdOutlineLogin } from "react-icons/md";
import HotelTestimonialForm from '../HotelTestimonialForm';

const ThirdStepsBookingHotel = () => {

    return (
        <>
            <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 h-fit rounded-md'>
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
            <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 h-fit rounded-md'>
                <div className='grid grid-cols-6 gap-2'>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Single Room</p>
                        <p className='text-base text-gray-400 font-medium'>Non-refundable Rate</p>
                    </div>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Guests</p>
                        <p className='text-base text-gray-400 font-medium'>1 Adult</p>
                    </div>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Nights</p>
                        <p className='text-base text-gray-400 font-medium'>1</p>
                    </div>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Net Price</p>
                        <p className='text-base text-gray-400 font-medium'>₹ 100</p>
                    </div>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Tax</p>
                        <p className='text-base text-gray-400 font-medium'>₹ 15</p>
                    </div>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Total Price</p>
                        <p className='text-base text-gray-400 font-medium'>₹ 115</p>
                    </div>
                </div>
            </div>
            <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 h-fit rounded-md'>
                <div className='grid grid-cols-6 gap-2'>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Total</p>
                    </div>
                    <div></div>
                    <div></div>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Net Price</p>
                        <p className='text-base text-gray-400 font-medium'>₹ 100</p>
                    </div>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Tax</p>
                        <p className='text-base text-gray-400 font-medium'>₹ 15</p>
                    </div>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Total Price</p>
                        <p className='text-base text-gray-400 font-medium'>₹ 115</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-2'>
                <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 h-fit rounded-md w-[100%]'>
                    <p className='text-gray-400 font-semibold text-lg'>Enter here your coupon code</p>
                    <div className="mt-4">
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                type="text"
                                id="promoCode"
                                className="flex-1 block w-full rounded-l-md sm:text-sm border border-gray-300 p-2"
                                placeholder="Enter coupon code"
                            />
                            <button
                                type="button"
                                className="bg-blue-600 text-white rounded-r-md px-4 py-2 hover:bg-blue-700 transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-[100%]'>
                    <HotelTestimonialForm />
                </div>
            </div>
        </>
    )
}

export default ThirdStepsBookingHotel