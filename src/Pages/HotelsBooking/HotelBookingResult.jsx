import React, { useEffect, useState } from 'react';
import FirstStepsBookingHotel from './AllStepsBookingHotel/FirstStepsBookingHotel';
import FourthStepsBookingHotel from './AllStepsBookingHotel/FourthStepsBookingHotel';
import SecondStepsBookingHotel from './AllStepsBookingHotel/SecondStepsBookingHotel';
import ThirdStepsBookingHotel from './AllStepsBookingHotel/ThirdStepsBookingHotel';
import { MdOutlineLogin } from 'react-icons/md';
import { CgCalendarDates } from 'react-icons/cg';
import { FaPerson, FaBed  } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import { useAllApiContext } from '../../Context/allApiContext';

const steps = [
    { id: 1, label: 'Dates' },
    { id: 2, label: 'Rooms' },
    { id: 3, label: 'Options' },
    { id: 4, label: 'Book' }
];

const HotelBookingResult = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [isHotelSelected, setIsHotelSelected] = useState(false);
    const [isHotelPriceSelect, setHotelPriceSelect] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [formInputData, setFormInputData] = useState([]);
    const { setPricingOptions, setTotalHotelPrice, setHotelBookingDetails } = useAllApiContext()
    const location = useLocation();
    const { formData } = location.state || {};
    const [finalHotelPrice, SetFinalHotelPrice] = useState(null)

    useEffect(() => {
        if (formData) {
            setFormInputData(formData);
            
        } else {
            setFormInputData([]);
        }
    }, [formData])


    const calculateNights = (checkinDate, checkoutDate) => {
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        const differenceInTime = checkout - checkin;
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return differenceInDays;
    };

    const nights = calculateNights(formInputData?.checkinDate, formInputData?.checkoutDate);

    const handleNext = () => {
        if (currentStep == 1) {
            setPricingOptions()
        }
        if (currentStep < steps.length) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleHotelPrice = (hotelPrice) => {
        let cleanedAmount = Number(hotelPrice.replace(/\s*₹\s*/, ""));
        const totalPrice = cleanedAmount * nights * Number(formInputData.rooms);
        setTotalHotelPrice(totalPrice)
    };

    const handleFinalHotelPrice = (finalPrice)=> {
        SetFinalHotelPrice(finalPrice)
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSelectHotel = (hotelData) => {
        setSelectedHotel(hotelData);
    };

    useEffect(() => {

     if(formInputData){

        const bookingDetails = {
            cityName : formInputData.city,
            checkInDate: formInputData.checkinDate,
            checkOutDate: formInputData.checkoutDate,
            totalGuests: Number(formInputData.adults) + Number(formInputData.children),
            numberOfNights:nights,
            numberOfRooms: formInputData.rooms
        }

        setHotelBookingDetails(bookingDetails)

     }
    }, [formInputData])
    

    return (
        <>
            <div className="relative w-full h-[500px] bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
            <div className='bg-[#f9f9f9]'>
                <div className="2xl:container 2xl:mx-auto px-5 py-3">

                    <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                        {steps && steps.map((step, index) => {
                            return (
                                <li
                                    key={index + "Steps"}
                                    className={`flex md:w-full items-center ${currentStep > step.id
                                        ? 'text-blue-600 dark:text-blue-500'
                                        : 'text-gray-500'
                                        } sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`
                                    }
                                >
                                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                        <svg
                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        <span>{step.label}</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ol>

                    <div className="py-6">

                        <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 w-[98%] h-fit rounded-lg'>
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
                                    <div className='flex flex-row items-center gap-3'>
                                        <div>
                                            <FaBed size={25} color='#3cb7ff' />
                                        </div>
                                        <div className='border-r border-gray-500 pr-3'>
                                            <p className='text-black text-sm font-semibold'>Rooms</p>
                                            <p className='text-gray-600 text-sm font-semibold'>{formInputData?.rooms}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {currentStep === 1 && (
                            <FirstStepsBookingHotel
                                setIsHotelSelected={setIsHotelSelected}
                                onSelectHotel={handleSelectHotel}
                            />
                        )}
                        {currentStep === 2 && (
                            <SecondStepsBookingHotel setHotelPriceSelect={setHotelPriceSelect} selectedHotel={selectedHotel} selectedHotelPrice={handleHotelPrice} />
                        )}
                        {currentStep === 3 && (
                            <ThirdStepsBookingHotel selectedHotel={selectedHotel} formData={formData} setFinalTotalPrice={handleFinalHotelPrice}/>
                        )}
                        {currentStep === 4 && (
                            <FourthStepsBookingHotel selectedHotel={selectedHotel} finalHotelPrice={finalHotelPrice}/>
                        )}
                    </div>

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className={`${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                } bg-gray-500 text-white px-4 py-2 rounded-lg`}
                        >
                            Previous
                        </button>
                        {currentStep < steps.length && (
                            <button
                                onClick={handleNext}
                                disabled={
                                    (currentStep === 1 && !isHotelSelected) ||
                                    (currentStep === 2 && !isHotelPriceSelect)
                                }
                                className={`bg-red-500 text-white px-4 py-2 rounded-lg 
                                ${(currentStep === 1 && !isHotelSelected) ||
                                        (currentStep === 2 && !isHotelPriceSelect) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Next
                            </button>
                        )}

                    </div>

                </div>
            </div>
        </>
    );
};

export default HotelBookingResult;