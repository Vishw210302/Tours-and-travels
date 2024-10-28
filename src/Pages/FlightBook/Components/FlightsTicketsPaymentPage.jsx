import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plane, Users, Coffee, CreditCard, Map, Tag } from 'lucide-react';
import { useGetFlightAllBookingDetailsQuery, useLazyGetParticularFlightQuery, useSubmitFlightTicketDataMutation } from '../../../Api/Api';
import { useFlightTicketsDetailsContext } from '../../../Context/FlightTicketsDetailsContext';
import StripePayment from '../../Payment/PaymentForm';
import Modal from '../../Modal/Modal';
import PaymentSuccess from '../../Payment/PaymentSuccess';

const ThankYouPage = ({ pdfLink }) => {
    const bookingDetails = {
        flightNumber: 'FL123',
        departure: 'New York (JFK)',
        arrival: 'London (LHR)',
        date: '2024-10-15',
        passengerName: 'John Doe'
    };

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = pdfLink;
        a.download = 'ticket.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(pdfLink);
    };

    return (
        <div className="w-full mx-auto bg-white rounded-lg p-8">
            <div className="relative">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            </div>

            <h1 className="text-4xl font-bold text-center text-green-500 mb-6 mt-12">Booking Confirmed!</h1>
            <p className="text-center text-gray-700 mb-8 text-lg">Thank you for choosing us. Your journey awaits!</p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-indigo-900">Booking Summary:</h3>
                <div className="space-y-4">
                    <p className="flex justify-between items-center border-b border-indigo-100 pb-2">
                        <span className="font-medium text-gray-700">Flight</span>
                        <span className="text-indigo-600">{bookingDetails.flightNumber}</span>
                    </p>
                    <p className="flex justify-between items-center border-b border-indigo-100 pb-2">
                        <span className="font-medium text-gray-700">From</span>
                        <span className="text-indigo-600">{bookingDetails.departure}</span>
                    </p>
                    <p className="flex justify-between items-center border-b border-indigo-100 pb-2">
                        <span className="font-medium text-gray-700">To</span>
                        <span className="text-indigo-600">{bookingDetails.arrival}</span>
                    </p>
                    <p className="flex justify-between items-center border-b border-indigo-100 pb-2">
                        <span className="font-medium text-gray-700">Date</span>
                        <span className="text-indigo-600">{bookingDetails.date}</span>
                    </p>
                    <p className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Passenger</span>
                        <span className="text-indigo-600">{bookingDetails.passengerName}</span>
                    </p>
                </div>
            </div>

            <div className="text-center mb-8">
                <button
                    onClick={handleDownload}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:from-indigo-700 hover:to-blue-600 transition duration-300 transform hover:scale-105"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Ticket (PDF)
                </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-lg mb-4 text-gray-800">Important Information:</h4>
                <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Please arrive at the airport at least 2 hours before departure.
                    </li>
                    <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Check our website for baggage allowance and policies.
                    </li>
                    <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        For any changes or queries, please contact our customer support.
                    </li>
                </ul>
            </div>
        </div>
    );
};

const FlightsTicketsPaymentPage = () => {
    const navigate = useNavigate();
    const { id, className } = useParams();
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');
    const [flight, setFlight] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [showPaymentSucess, setShowPaymnetSucess] = useState(false);
    const [pdfLink, setPdfLink] = useState('');
    const [contactDetails, setContactDetails] = useState('');

    const [fetchFlight, { data, isSuccess, isError, error }] = useLazyGetParticularFlightQuery();

    const contactId = localStorage.getItem('contactId');

    const { data: fetchBookingData, isSuccess: isSuccessfullyFetchedBookingData, error: fetchingBookingErr, isError: hasFetchingBookingErr } = useGetFlightAllBookingDetailsQuery(contactId);

    const [submitFlightTicketData, {
        data: submittedTicketData,
        isSuccess: isSubmissionSuccess,
        error: submissionError,
        isError: hasSubmissionError
    }] = useSubmitFlightTicketDataMutation();

    const backend_url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    const {
        selectedMealData,
        setSelectedMealData,
        passengerPersonalDetails,
        setPassengerPersonalDetails,
        flightSeatData,
        setFlightSeatData,
        totalTicketPrice,
        setotalTicketPrice
    } = useFlightTicketsDetailsContext();

    const handleCouponApply = () => {
        if (couponCode.toUpperCase() === 'SAVE20') {
            const discountAmount = totalPrice * 0.20;
            setDiscount(discountAmount);
            setCouponSuccess('Coupon applied successfully! You saved ₹' + discountAmount.toFixed(2));
            setCouponError('');
        } else {
            setCouponError('Invalid coupon code');
            setCouponSuccess('');
            setDiscount(0);
        }
    };

    useEffect(() => {
        if (id) {
            fetchFlight({ key: '1', id });
        }
    }, [fetchFlight, id]);

    useEffect(() => {
        if (fetchBookingData && isSuccessfullyFetchedBookingData) {
            console.log(fetchBookingData, 'fetchBookingDatafetchBookingDatafetchBookingData')

            setContactDetails(fetchBookingData?.data?.contactDetails)

        } else if (hasFetchingBookingErr) {
            console.log(fetchingBookingErr, 'fetchingBookingErrfetchingBookingErrfetchingBookingErrfetchingBookingErrfetchingBookingErr')
        }
    }, [fetchBookingData, isSuccessfullyFetchedBookingData, hasFetchingBookingErr, fetchingBookingErr]);

    useEffect(() => {
        if (isSuccess) {
            setFlight(data?.data);
        }
    }, [data, isSuccess, isError, error]);

    useEffect(() => {
        if (isSubmissionSuccess) {
            const pdfUrl = `${backend_url}${submittedTicketData?.pdfUrl}`;
            setPdfLink(pdfUrl);
            setIsModalOpen(false);
            setShowPaymnetSucess(true);
        }
    }, [submittedTicketData, isSubmissionSuccess, submissionError, hasSubmissionError]);

    const handleSeatBookingPage = () => {
        navigate(`/flight-seat-booking/${className}/${id}`);
    };

    function formatDateTime(isoString) {
        const date = new Date(isoString);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const formattedDate = date.toLocaleString('en-US', options);
        const day = date.getDate();
        const suffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            return ['st', 'nd', 'rd'][((day % 10) - 1)] || 'th';
        };
        return formattedDate.replace(/(\d{1,2})(?=,)/, `${day}${suffix(day)}`);
    }

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const totalSeatPrice = flightSeatData.reduce((acc, seat) => acc + seat.seat_price, 0);
    const totalMealPrice = selectedMealData?.reduce((acc, meal) => acc + (meal?.count * meal?.price), 0);
    const ticketPrice = flight?.class_details?.[className]?.prices?.adult;
    const totalPrice = ticketPrice + totalSeatPrice + totalMealPrice;
    const finalPrice = totalPrice - discount;

    useEffect(() => {
        setotalTicketPrice(finalPrice);
    }, [finalPrice]);

    const handlePaymentSuccess = async () => {
        try {
            const payload = {
                flightId: id,
                passengerPersonalDetails,
                selectedMealData,
                flightSeatData,
                paymentId: 'sfsdfdnsfndfnsdf'
            };

            const response = await fetch('http://localhost:7781/api/addFlightTicketsData', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/pdf'
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const pdfBlob = await response.blob();
            const pdfUrl = window.URL.createObjectURL(pdfBlob);
            setPdfLink(pdfUrl);
            setIsModalOpen(false);
            setShowPaymnetSucess(true);
        } catch (error) {
            console.log('flightSubmission_error:', error);
        }
    };

    const handleThankYouPage = () => {
        setShowPaymnetSucess(false);
        setShowThankYou(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="relative h-[400px] w-full bg-[url('https://assets.gqindia.com/photos/6540e2ba4622f7146b12b76b/16:9/w_2560%2Cc_limit/best-time-to-book-flights.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Complete Your Booking</h1>
                    <p className="text-lg text-gray-200">You're just a few steps away from your journey</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-8">


                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <Users className="text-white" size={24} />
                                        <h2 className="text-xl font-semibold text-white">Passenger Information</h2>
                                    </div>
                                </div>
                                <div className="p-6 grid md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-800 mb-3">Contact Details</h3>
                                        <div className="space-y-2">
                                            <p className="text-sm">
                                                <span className="text-gray-600">Name:</span>
                                                <span className="ml-2 font-medium">{passengerPersonalDetails?.contactDetails?.fullName}</span>
                                            </p>
                                            <p className="text-sm">
                                                <span className="text-gray-600">Email:</span>
                                                <span className="ml-2 font-medium">{passengerPersonalDetails?.contactDetails?.email}</span>
                                            </p>
                                            <p className="text-sm">
                                                <span className="text-gray-600">Phone:</span>
                                                <span className="ml-2 font-medium">{passengerPersonalDetails?.contactDetails?.phoneNumber}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-800 mb-3">Passenger List</h3>
                                        <div className="space-y-3">
                                            {passengerPersonalDetails?.passengerDetailsData?.map((passenger, index) => (
                                                <div key={index} className="flex items-center justify-between text-sm">
                                                    <div>
                                                        <span className="font-medium">{passenger.fullName}</span>
                                                        <span className="text-gray-500 ml-2">({passenger.gender})</span>
                                                    </div>
                                                    <span className="text-gray-600">{passenger.age} years</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <Plane className="text-white" size={24} />
                                        <h2 className="text-xl font-semibold text-white">Flight Details</h2>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                        <div className="flex-1">
                                            <p className="text-lg font-semibold text-gray-800">{flight?.departure?.city}</p>
                                            <p className="text-sm text-gray-600">{formatDateTime(flight?.departure?.time)}</p>
                                        </div>
                                        <div className="flex-shrink-0 my-4 md:my-0">
                                            <div className="w-24 h-[2px] bg-gray-300 relative">
                                                <Plane className="absolute -top-4 -right-2 text-purple-500 transform rotate-90" size={20} />
                                            </div>
                                        </div>
                                        <div className="flex-1 text-right">
                                            <p className="text-lg font-semibold text-gray-800">{flight?.arrival?.city}</p>
                                            <p className="text-sm text-gray-600">{formatDateTime(flight?.arrival?.time)}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-purple-50 rounded-lg p-3">
                                            <p className="text-sm text-purple-600">Flight Number</p>
                                            <p className="font-semibold">{flight?.flightCode}</p>
                                        </div>
                                        <div className="bg-purple-50 rounded-lg p-3">
                                            <p className="text-sm text-purple-600">Class</p>
                                            <p className="font-semibold">{capitalizeFirstLetter(className)}</p>
                                        </div>
                                        <div className="bg-purple-50 rounded-lg p-3">
                                            <p className="text-sm text-purple-600">Seats</p>
                                            <p className="font-semibold">
                                                {flightSeatData?.map((seat, index) => (
                                                    <span key={index}>
                                                        {seat?.seat_name}
                                                        {index < flightSeatData?.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                        <div className="bg-purple-50 rounded-lg p-3">
                                            <p className="text-sm text-purple-600">Duration</p>
                                            <p className="font-semibold">2h 30m</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <Coffee className="text-white" size={24} />
                                        <h2 className="text-xl font-semibold text-white">Meal Selection</h2>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {selectedMealData?.map((meal, index) => (
                                            <div key={index} className="flex justify-between items-center bg-green-50 rounded-lg p-4">
                                                <div>
                                                    <p className="font-medium text-gray-800">{meal?.meal_name}</p>
                                                    <p className="text-sm text-gray-600">Quantity: {meal?.count}</p>
                                                </div>
                                                <p className="font-semibold text-green-600">₹{meal?.count * meal?.price}</p>
                                            </div>
                                        ))}
                                        <div className="flex justify-end">
                                            <p className="font-semibold text-lg">Total: ₹{totalMealPrice || 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg sticky top-6">
                                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4 rounded-t-xl">
                                    <div className="flex items-center space-x-3">
                                        <CreditCard className="text-white" size={24} />
                                        <h2 className="text-xl font-semibold text-white">Payment Summary</h2>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Base Fare</span>
                                            <span className="font-medium">₹{ticketPrice}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Seat Selection</span>
                                            <span className="font-medium">₹{totalSeatPrice || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Meals</span>
                                            <span className="font-medium">₹{totalMealPrice || 0}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount</span>
                                                <span>-₹{discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between text-lg font-semibold">
                                                <span>Total Amount</span>
                                                <span>₹{finalPrice}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Have a coupon code?</p>
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Enter code"
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            <button
                                                onClick={handleCouponApply}
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        {couponError && (
                                            <p className="mt-2 text-sm text-red-600">{couponError}</p>
                                        )}
                                        {couponSuccess && (
                                            <p className="mt-2 text-sm text-green-600">{couponSuccess}</p>
                                        )}
                                    </div>

                                    <div className="space-y-4 mt-6">
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                                        >
                                            <CreditCard size={20} />
                                            <span>Proceed to Payment</span>
                                        </button>
                                        <button
                                            onClick={handleSeatBookingPage}
                                            className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition duration-300 flex items-center justify-center space-x-2"
                                        >
                                            <ArrowLeft size={20} />
                                            <span>Back to Seat Selection</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <StripePayment onPaymentSuccess={handlePaymentSuccess} />
            </Modal>

            <Modal isOpen={showPaymentSucess} onClose={() => setShowPaymnetSucess(false)} hideCloseButton={true}>
                <PaymentSuccess openThankYouPage={handleThankYouPage} />
            </Modal>

            <Modal isOpen={showThankYou} onClose={() => setShowThankYou(false)}>
                <ThankYouPage pdfLink={pdfLink} />
            </Modal>
        </div>
    );
};

export default FlightsTicketsPaymentPage;