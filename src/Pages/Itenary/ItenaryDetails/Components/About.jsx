import '@fortawesome/fontawesome-free/css/all.min.css';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import { Plane } from 'lucide-react';
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
    const [showFlightsContent, setShowFlightsContent] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [activeDatesIcon, setActiveDatesIcon] = useState(false);
    const [activeFlightsIcon, setActiveFlightsIcon] = useState(false);
    const navigate = useNavigate()
    const longText = data;
    const handlePackageBookingModal = () => {
        setBookingModalOpen(true)
    }

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

    const handleBrochureDownload = (urlOfFiles) => {
        const brochureUrl = urlOfFiles
        const a = document.createElement('a');
        a.href = brochureUrl;
        a.download = 'Brochure.pdf';
        a.click();
    }

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

    const handleFlightsClick = () => {
        setShowFlightsContent(!showFlightsContent);
        setActiveFlightsIcon(!activeFlightsIcon);
    }

    const handlePaymentSuccess = async (details) => {
        try {
            const payload = {
                paymentId: details?.id,
                personDetail: personDetails.formData,
                payPrice: personDetails.payPrice,
                itenaryId: allItenaryData._id,
                remainingBalance: personDetails.remainingBalance
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
        navigate(`/itenary-details/${allData?._id}`);
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
                            <div
                                onClick={handleFlightsClick}
                                className={`group border border-red-400 rounded-lg p-2 transition-all duration-300 ease-in-out 
                                    hover:bg-red-500 hover:shadow-lg cursor-pointer hover:scale-105 active:scale-95 
                                    ${activeFlightsIcon ? 'bg-red-500' : ''}`}>
                                <div className="flex justify-center items-center h-full">
                                    <LuPlane
                                        size={30}
                                        className={`${activeFlightsIcon ? 'text-white' : 'text-red-500'} 
                                        group-hover:text-white transition-colors duration-300`}
                                    />
                                </div>
                                <p className={`text-[15px] ${activeFlightsIcon ? 'text-white' : 'text-red-500'} 
                                group-hover:text-white transition-colors duration-300`}>
                                    Flight
                                </p>
                            </div>

                            {itenaryFlightsDetails && itenaryFlightsDetails.length > 0 ?
                                <div
                                    onClick={handleDatesClick}
                                    className={`group border border-red-400 rounded-lg p-2 transition-all duration-300 ease-in-out 
                                 hover:bg-red-500 hover:shadow-lg cursor-pointer hover:scale-105 active:scale-95 
                                 ${activeDatesIcon ? 'bg-red-500' : ''}`}>
                                    <div className="flex justify-center items-center h-full">
                                        <BsCalendar2Date
                                            size={30}
                                            className={`${activeDatesIcon ? 'text-white' : 'text-red-500'} 
                                        group-hover:text-white transition-colors duration-300`}
                                        />
                                    </div>
                                    <p className={`text-[15px] ${activeDatesIcon ? 'text-white' : 'text-red-500'} 
                                group-hover:text-white transition-colors duration-300`}>
                                        Dates
                                    </p>
                                </div> : <></>
                            }


                            <div
                                className='group border border-red-400 rounded-lg p-2 transition-all duration-300 ease-in-out 
                                 hover:bg-red-500 hover:shadow-lg cursor-pointer hover:scale-105 active:scale-95'
                            >
                                <div className="flex justify-center items-center h-full">
                                    <FaHotel
                                        size={30}
                                        className="text-red-500 group-hover:text-white transition-colors duration-300"
                                    />
                                </div>
                                <p className='text-[15px] text-red-500 group-hover:text-white transition-colors duration-300'>
                                    Hotels
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
                                        className={`px-4 py-2 rounded-md text-white transition-colors ${selectedMonth === monthYear
                                            ? "bg-red-500"
                                            : "bg-red-400 hover:bg-red-500"
                                            }`}
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
                            <div className="grid gap-6">
                                {itenaryFlightsDetails && itenaryFlightsDetails.map((flight, index) => {
                                    return (
                                        <div
                                            key={flight._id}
                                            className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center">
                                                    <Plane className="mr-3 text-blue-600" size={24} />
                                                    <span className="font-semibold text-lg text-gray-800">
                                                        Flight {index + 1}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(flight.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="text-left">
                                                    <h3 className="text-sm text-gray-600 mb-1">Departure</h3>
                                                    <p className="font-medium text-gray-800">
                                                        {flight.departure.location} ({flight.departure.airportCode})
                                                    </p>
                                                    <p className="text-sm text-gray-600">{flight.departure.time}</p>
                                                </div>

                                                <div className="flex items-center mx-4">
                                                    <div className="w-8 h-px bg-gray-300 mr-2"></div>
                                                    <Plane className="text-gray-400" size={16} />
                                                    <div className="w-8 h-px bg-gray-300 ml-2"></div>
                                                </div>

                                                <div className="text-right">
                                                    <h3 className="text-sm text-gray-600 mb-1">Arrival</h3>
                                                    <p className="font-medium text-gray-800">
                                                        {flight.arrival.location} ({flight.arrival.airportCode})
                                                    </p>
                                                    <p className="text-sm text-gray-600">{flight.arrival.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'>
                        {longText && longText.length > 0 ?
                            <>
                                <p className='text-[18px] text-red-500 font-medium'>About</p>
                                <ReadMoreText text={longText} />
                            </>
                            : <></>
                        }
                        <div>
                            <button
                                onClick={() => {
                                    handleBrochureDownload(allItenaryData?.fileUpload)
                                }}
                                className='bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300 mt-2'
                            >
                                Brochure <i className="fa-solid fa-download"></i>
                            </button>
                        </div>
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
            </div>

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