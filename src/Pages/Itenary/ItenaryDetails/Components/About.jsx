import '@fortawesome/fontawesome-free/css/all.min.css';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import { ArrowRight, Calendar, Car, Clock, FileDown, Hotel, MapPin, Plane } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BsCalendar2Date } from "react-icons/bs";
import { FaHotel } from "react-icons/fa";
import { LuPlane } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAddItenaryParsonDetailsMutation } from '../../../../Api/Api';
import PackagesBookingModal from '../../../AllPackages/PackagesBookingModal';
import Modal from '../../../Modal/Modal';
import StripePayment from '../../../Payment/PaymentForm';
import PaymentSuccess from '../../../Payment/PaymentSuccess';

const ReadMoreText = ({ text }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const words = text?.split(' ');
    const shortText = words?.slice(0, 100).join(' ');

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <p className='text-[15px] text-justify'>
                {isExpanded ? text : `${shortText}`}
            </p>
            {words?.length > 100 && (
                <button onClick={toggleReadMore} className="text-blue-500">
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </div>
    );
};

const About = ({ data, allData }) => {

    const [departureDates, setDepartureDates] = useState([]);
    const [allItenaryData, setAllItenaryData] = useState();
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [stripeModalOpen, setStripeModalOpen] = useState(false)
    const [payMentSucessodalOpen, setPaymentsucessModelOpen] = useState(false)
    const [personDetails, setPersonDetails] = useState({})
    const [itenaryFlightsDetails, setItenaryFlightsDetails] = useState([])
    const [handlePersonDetailsApi] = useAddItenaryParsonDetailsMutation()
    const [paymentId, setPaymentId] = useState('')
    const [showDatesContent, setShowDatesContent] = useState(false);
    const [showHotelContent, setShowHotelContent] = useState(false);
    const [showFlightsContent, setShowFlightsContent] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [activeDatesIcon, setActiveDatesIcon] = useState(false);
    const [activeHotelIcon, setActiveHotelIcon] = useState(false);
    const [activeFlightsIcon, setActiveFlightsIcon] = useState(false);
    const navigate = useNavigate()
    const longText = data;

    const groupedDates = departureDates.reduce((acc, date) => {
        const dateObj = new Date(date);
        const monthYear = dateObj.toLocaleDateString('en-GB', {
            month: 'long',
            year: 'numeric',
        });
        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }
        acc[monthYear].push(date);
        return acc;
    }, {});

    useEffect(() => {
        if (Array.isArray(allData?.itenaryData?.departureDates)) {
            setDepartureDates(allData?.itenaryData?.departureDates);
        }
        setAllItenaryData(allData?.itenaryData);
        setItenaryFlightsDetails(allData?.itenaryData?.flightDetails)
    }, [allData]);

    const openStraipeModel = (itenryData) => {
        setPersonDetails(itenryData)
        setStripeModalOpen(true)
        setBookingModalOpen(false)
    }

    const handleDatesClick = () => {
        setShowDatesContent(!showDatesContent);
        setActiveDatesIcon(!activeDatesIcon);
    }

    const handleHotelClick = () => {
        setShowHotelContent(!showHotelContent);
        setActiveHotelIcon(!activeHotelIcon);
    }

    const handleFlightsClick = () => {
        setShowFlightsContent(!showFlightsContent);
        setActiveFlightsIcon(!activeFlightsIcon);
    }

    const handleDownloadClick = () => {
        console.log("on click working")
    }

    const handlePackageBookingModal = () => {
        setBookingModalOpen(true)
    }

    const handlePaymentSuccess = async (details) => {
        try {
            const payload = {
                paymentId: details?.id,
                personDetail: personDetails?.formData,
                payPrice: personDetails?.payPrice,
                itenaryId: allItenaryData?._id,
                remainingBalance: personDetails?.remainingBalance
            }
            const response = await handlePersonDetailsApi(payload).unwrap();

            if (response.status === 201) {
                setPaymentId(details?.id)
                setStripeModalOpen(false)
                setPaymentsucessModelOpen(true)
            } else {
                console.log('Unexpected response:', response);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const openBookingConfirmPage = () => {
        setPaymentsucessModelOpen(false)
        navigate(`/itenary-details/${allItenaryData?._id}`);
        toast.success("Itenary booked successfully! Your payment details have been recorded.");
    }

    return (
        <>
            <div className='flex justify-around w-[100%]'>
                <div className='w-[60%]'>
                    <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'>
                        <h1 className='text-[20px] font-semibold text-red-500'>{allItenaryData?.packageTitle}</h1>
                        <div>
                            <h3 className='text-[15px] font-medium text-red-500 mt-2'>
                                Package Includes
                            </h3>
                        </div>
                        <div className='flex items-center gap-3 border-b-2 p-2'>
                            {itenaryFlightsDetails && itenaryFlightsDetails?.length > 0 ?
                                <div
                                    onClick={handleFlightsClick}
                                    className={`group border border-red-400 rounded-lg p-2 transition-all duration-300 ease-in-out 
                                    hover:bg-red-500 hover:shadow-lg cursor-pointer hover:scale-105 active:scale-95 
                                    ${activeFlightsIcon ? 'bg-red-500' : ''}`}>
                                    <div className="flex justify-center items-center h-full">
                                        <LuPlane
                                            size={25}
                                            className={`${activeFlightsIcon ? 'text-white' : 'text-red-500'} 
                                        group-hover:text-white transition-colors duration-300`}
                                        />
                                    </div>
                                    <p className={`text-[15px] ${activeFlightsIcon ? 'text-white' : 'text-red-500'}group-hover:text-white transition-colors duration-300`}>
                                        Flight
                                    </p>
                                </div>
                                :
                                <></>
                            }

                            <div
                                onClick={handleDatesClick}
                                className={`group border border-red-400 rounded-lg p-2 transition-all duration-300 ease-in-out 
                                 hover:bg-red-500 hover:shadow-lg cursor-pointer hover:scale-105 active:scale-95 
                                 ${activeDatesIcon ? 'bg-red-500' : ''}`}>
                                <div className="flex justify-center items-center h-full">
                                    <BsCalendar2Date
                                        size={25}
                                        className={`${activeDatesIcon ? 'text-white' : 'text-red-500'} 
                                        group-hover:text-white transition-colors duration-300`}
                                    />
                                </div>
                                <p className={`text-[15px] ${activeDatesIcon ? 'text-white' : 'text-red-500'}group-hover:text-white transition-colors duration-300`}>
                                    Dates
                                </p>
                            </div>

                            <div
                                onClick={handleHotelClick}
                                className={`group border border-red-400 rounded-lg p-2 transition-all duration-300 ease-in-out 
                                    hover:bg-red-500 hover:shadow-lg cursor-pointer hover:scale-105 active:scale-95 
                                    ${activeHotelIcon ? 'bg-red-500' : ''}`}
                            >
                                <div className="flex justify-center items-center h-full">
                                    <FaHotel
                                        size={25}
                                        className={`${activeHotelIcon ? 'text-white' : 'text-red-500'} 
                                            group-hover:text-white transition-colors duration-300`}
                                    />
                                </div>
                                <p className={`text-[15px] ${activeHotelIcon ? 'text-white' : 'text-red-500'} 
                                group-hover:text-white transition-colors duration-300`}>
                                    Hotels
                                </p>
                            </div>

                            <div
                                onClick={handleDownloadClick}
                                className="group border border-red-400 rounded-lg p-1 transition-all duration-300 ease-in-out 
                                hover:bg-red-500 hover:shadow-lg cursor-pointer hover:scale-105 active:scale-95 text-red-500"
                            >
                                <div className="flex justify-center items-center h-full">
                                    <FileDown
                                        size={25}
                                        className="group-hover:text-white transition-colors duration-300 text-red-500"
                                    />
                                </div>
                                <p className="group-hover:text-white transition-colors duration-300 text-red-500 text-base"
                                >
                                    Brochure
                                </p>
                            </div>

                        </div>
                    </div>
                    {showDatesContent && (
                        <div className="bg-white rounded-lg shadow-lg p-4 mt-2">
                            <h3 className="text-lg font-medium mb-2">Departure Dates:</h3>
                            <div className="grid grid-cols-6 gap-3">
                                {Object.keys(groupedDates).map((monthYear, index) => (
                                    <button
                                        key={index + "month"}
                                        className=
                                        {`px-4 py-2 rounded-md text-white transition-colors 
                                            ${selectedMonth === monthYear
                                                ? "bg-red-500"
                                                : "bg-red-400 hover:bg-red-500"
                                            }`
                                        }
                                        onClick={() => setSelectedMonth(monthYear)}
                                    >
                                        {monthYear}
                                    </button>
                                ))}
                            </div>

                            {selectedMonth && (
                                <div>
                                    <h4 className="text-md font-semibold mb-2 text-gray-800">
                                        {selectedMonth}
                                    </h4>
                                    <div className="grid grid-cols-6 gap-3">
                                        {groupedDates[selectedMonth].map((departureDate, idx) => {
                                            const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
                                            return (
                                                <div
                                                    key={idx + "date"}
                                                    className="rounded-md p-3 text-center hover:bg-opacity-80 transition-colors"
                                                    style={{
                                                        backgroundColor: randomColor,
                                                    }}
                                                >
                                                    <p className="text-gray-700 font-medium">
                                                        {new Date(departureDate).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                        })}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {showFlightsContent && (
                        <div className="container mx-auto px-4 py-8">
                            <div className="grid gap-8">
                                {itenaryFlightsDetails && itenaryFlightsDetails?.map((flight, index) => (
                                    <div
                                        key={flight?._id}
                                        className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 rounded-2xl p-1"
                                    >
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 -mr-32 -mt-32" />
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-20 -ml-32 -mb-32" />

                                        <div className="bg-white/80 rounded-xl p-6 relative">
                                            <div className="flex items-center justify-between mb-5">
                                                <div className="flex items-center space-x-4">
                                                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl rotate-12 transition-transform duration-300">
                                                        <Plane className="text-white" size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                            Flight {index + 1}
                                                        </h3>
                                                        <span className="text-sm text-gray-500">Direct Flight</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-7 items-center">
                                                <div className="col-span-3 space-y-4">
                                                    <div className="flex items-start space-x-3">
                                                        <div className="mt-1">
                                                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-500">DEPARTURE</p>
                                                            <h4 className="text-xl font-bold text-gray-800 mt-1">
                                                                {flight?.departure?.location}
                                                            </h4>
                                                            <div className="flex items-center mt-1 text-gray-500">
                                                                <MapPin size={14} className="mr-1" />
                                                                <span className="text-sm">{flight?.departure?.airportCode}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg w-fit">
                                                        <Clock size={16} className="text-blue-500" />
                                                        <span className="text-sm font-medium">{flight?.departure?.time}</span>
                                                    </div>
                                                </div>

                                                <div className="col-span-1 flex justify-center items-center px-4">
                                                    <div className="w-full relative">
                                                        <div className="absolute w-full h-[2px] bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-400 top-1/2 -translate-y-1/2" />
                                                        <div className="absolute w-2 h-2 bg-blue-500 rounded-full left-0 top-1/2 -translate-y-1/2" />
                                                        <div className="absolute w-2 h-2 bg-indigo-500 rounded-full right-0 top-1/2 -translate-y-1/2" />
                                                        <ArrowRight
                                                            size={20}
                                                            className="text-blue-600 relative mx-auto animate-pulse"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Arrival */}
                                                <div className="col-span-3 space-y-4">
                                                    <div className="flex items-start space-x-3">
                                                        <div className="mt-1">
                                                            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-500">ARRIVAL</p>
                                                            <h4 className="text-xl font-bold text-gray-800 mt-1">
                                                                {flight?.arrival?.location}
                                                            </h4>
                                                            <div className="flex items-center mt-1 text-gray-500">
                                                                <MapPin size={14} className="mr-1" />
                                                                <span className="text-sm">{flight?.arrival?.airportCode}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg w-fit ml-auto">
                                                        <Clock size={16} className="text-indigo-500" />
                                                        <span className="text-sm font-medium">{flight?.arrival?.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {showHotelContent && (
                        <div className="w-full max-w-4xl mx-auto p-4">
                            <h2 className="text-2xl font-bold mb-6 text-primary">Stay & Transfer Details</h2>

                            <div className="w-full bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
                                    {allItenaryData && allItenaryData?.days.map((day, index) => (
                                        <div
                                            key={index + "key"}
                                            className="bg-white rounded-xl overflow-hidden shadow-md"
                                        >
                                            <div className="bg-primary/5 p-4 border-b">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-primary text-white p-2 rounded-lg">
                                                            <Calendar className="h-5 w-5" />
                                                        </div>
                                                        <h3 className="text-lg font-bold text-gray-800">Day {index + 1}</h3>
                                                    </div>
                                                    <span className="text-sm text-primary font-medium px-3 py-1 bg-primary/10 rounded-full">
                                                        {day?.mealPlan}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-5 space-y-6">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-primary/10 rounded-lg">
                                                            <Hotel className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <h4 className="font-semibold text-gray-800">Stay Details</h4>
                                                    </div>

                                                    <div className="pl-12 space-y-3">
                                                        <div className="flex items-start gap-8">
                                                            <div className="w-1/3">
                                                                <span className="text-sm text-gray-500">Property</span>
                                                                <p className="font-medium text-gray-800">{day?.hotelName}</p>
                                                            </div>
                                                            <div>
                                                                <span className="text-sm text-gray-500">Room</span>
                                                                <p className="font-medium text-gray-800">{day?.hotelRoomType}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-primary/10 rounded-lg">
                                                            <Car className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <h4 className="font-semibold text-gray-800">Transfer Details</h4>
                                                    </div>

                                                    <div className="pl-12 space-y-4">
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="h-4 w-4 text-gray-400" />
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-500">Arrival:</span>
                                                                <span className="font-medium text-gray-800">
                                                                    {day?.arrivalTransfer || 'Not Included'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <ArrowRight className="h-4 w-4 text-gray-400" />
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-500">Pickup:</span>
                                                                <span className="font-medium text-gray-800">
                                                                    {day?.pickupTransfer || 'Not Included'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="mt-2 flex items-center gap-2">
                                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                                                                {day?.roadType}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'>
                        {longText && longText?.length > 0 ?
                            <>
                                <p className='text-[18px] text-red-500 font-medium'>About</p>
                                <ReadMoreText text={longText} />
                            </>
                            : <></>
                        }
                    </div>
                </div>

                <div className='w-[25%] h-[100%]'>
                    <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] p-3 transition-all duration-300 hover:shadow-lg'>
                        <div>
                            <span className='text-[20px] font-bold text-red-500'>₹{allItenaryData?.perPersonCost}</span>
                            <span className='text-md font-semibold text-red-500'> / person</span>
                        </div>

                        <div className='mt-4 grid grid-cols-[50%,50%]'>
                            <p><LocalDiningIcon /> Food</p>
                            <p><DirectionsBikeIcon /> Travelling</p>
                            <p><PersonIcon /> Instructor</p>
                            <p><LocalHospitalIcon /> First Aid</p>
                            <p><PaidIcon /> GST</p>
                            <p><ApartmentIcon /> Accommodation</p>
                        </div>

                        <div>
                            <button
                                onClick={() => {
                                    handlePackageBookingModal()
                                }}
                                className='w-full bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300 mt-2'
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div >

            <PackagesBookingModal
                bookingModalOpen={bookingModalOpen}
                setBookingModalOpen={setBookingModalOpen}
                allData={allData}
                openStraipeModel={openStraipeModel}
            />

            <Modal isOpen={stripeModalOpen} onClose={() => setStripeModalOpen(false)}>
                <StripePayment onPaymentSuccess={handlePaymentSuccess} personDetails={personDetails} description="Payment for itenary" />
            </Modal>

            <Modal isOpen={payMentSucessodalOpen} onClose={() => setPaymentsucessModelOpen(false)} hideCloseButton={true}>
                <PaymentSuccess openBookingConfirmPage={openBookingConfirmPage} paymentId={paymentId} payPrice={personDetails?.payPrice} title={'Itenary Booking'} />
            </Modal>

            <ToastContainer
                position="top-right"
                className="toast-container"
                draggable="true"
            />
        </>
    );
}

export default About;