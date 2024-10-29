import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plane, Users, Coffee, CreditCard, Map, Tag } from 'lucide-react';
import { useGetFlightAllBookingDetailsQuery } from '../../../Api/Api';
import StripePayment from '../../Payment/PaymentForm';
import Modal from '../../Modal/Modal';
import PaymentSuccess from '../../Payment/PaymentSuccess';
import { ToastContainer, toast } from 'react-toastify';
import { useFlightTicketsDetailsContext } from '../../../Context/FlightTicketsDetailsContext';

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
        <div className="w-full mx-auto h-[800px] bg-white rounded-lg p-8">
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

           
        </div>
    );
};

const FlightsTicketsPaymentPage = () => {
    const navigate = useNavigate();
    const { id, className } = useParams();
    const [couponCode, setCouponCode] = useState('');
    const [flight, setFlight] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [showPaymentSucess, setShowPaymnetSucess] = useState(false);
    const [pdfLink, setPdfLink] = useState('');
    const [contactDetails, setContactDetails] = useState('');
    const [passengerDetails, setPassengerDetails] = useState('')
    const [totalSeat, setTotalSeat] = useState([]);
    const [mealData, setMealData] = useState('')
    const [discountCoupon, setDiscountCoupon] = useState([]);
    const [promocode, setPromoCode] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0)
    const [paymentId, setPaymentId] = useState('');
    const { setotalTicketPrice } = useFlightTicketsDetailsContext()

    const contactId = localStorage.getItem('contactId');

    const { data: fetchBookingData, isSuccess: isSuccessfullyFetchedBookingData, error: fetchingBookingErr, isError: hasFetchingBookingErr, refetch } = useGetFlightAllBookingDetailsQuery(contactId);


    // useEffect(() => {
    //     console.log(seats, 'seatsseatsseatsseats')
    // }, [seats]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const backend_url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    const totalSeatPrice = totalSeat?.reduce((acc, seat) => acc + seat.price, 0);
    const totalMealPrice = mealData && mealData?.reduce((acc, meal) => acc + (meal?.mealCount * meal?.mealPrice), 0);
    const ticketPrice = (flight?.class_details?.[className]?.prices?.adult) * passengerDetails?.length;
    const totalPrice = ticketPrice + totalSeatPrice + totalMealPrice;
    const finalPrice = totalPrice - discountAmount;

    useEffect(() => {
        setotalTicketPrice(finalPrice)
    }, [finalPrice])


    useEffect(() => {
        if (fetchBookingData && isSuccessfullyFetchedBookingData) {

            setContactDetails(fetchBookingData?.data?.flightBookDetails?.contactDetails)
            setPassengerDetails(fetchBookingData?.data?.flightBookDetails?.passengerDetails)
            setFlight(fetchBookingData?.data?.flightBookDetails?.flightDetails)
            setMealData(fetchBookingData?.data?.flightBookDetails?.mealDetails)
            setDiscountCoupon(fetchBookingData?.data?.discountCouponData)
            setPromoCode(fetchBookingData?.data?.promocodeData)

        } else if (hasFetchingBookingErr) {
            console.log(fetchingBookingErr, 'fetchingBookingErrfetchingBookingErrfetchingBookingErrfetchingBookingErrfetchingBookingErr')
        }
    }, [fetchBookingData, isSuccessfullyFetchedBookingData, hasFetchingBookingErr, fetchingBookingErr]);

    useEffect(() => {

        if (passengerDetails) {
            const seats = passengerDetails?.map((passenger) => {
                return {
                    seatNumber: passenger?.seatInfo?.seat_number,
                    price: passenger?.seatInfo?.price
                };
            });

            setTotalSeat(seats)
        }

    }, [passengerDetails])

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

    const convertTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return `${parseInt(hours)}h ${parseInt(minutes)}m`;
    }

    const handleInputFocus = () => {
        setShowSuggestions(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => setShowSuggestions(false), 150);
    };

    const handleCouponApply = () => {

        const selectedCoupon = discountCoupon.find(coupon => coupon.discountCouponName === couponCode);

        console.log(selectedCoupon, 'couponCodecouponCodecouponCodecouponCode')
        if (selectedCoupon) {
            setDiscountAmount(selectedCoupon?.discountAmount)
            toast.success(`Coupon applied successfully! You saved ₹${selectedCoupon.discountAmount}`, { autoClose: 3000 });
        } else {

            const selectedPromoCode = promocode.find(coupon => coupon.promoCode === couponCode);

            if (selectedPromoCode) {

                if (ticketPrice >= 5000 && ticketPrice <= 25000) {
                    console.log('first if')
                    if (selectedPromoCode.discountAmount <= 3000) {
                        console.log('second if')
                        setDiscountAmount(selectedPromoCode?.discountAmount);
                        toast.success(`Promocode applied successfully! You saved ₹${selectedPromoCode.discountAmount}`, { autoClose: 3000 });
                    } else {
                        console.log('second else')
                        toast.error('Promo code is not valid for this ticket price range (must be ₹3000 or less)', { autoClose: 3000 });
                        setDiscountAmount(0);
                    }
                } else if (ticketPrice > 25000) {
                    console.log('first else')
                    setDiscountAmount(selectedPromoCode?.discountAmount);
                    toast.success(`Promocode applied successfully! You saved ₹${selectedPromoCode.discountAmount}`, { autoClose: 3000 });
                }

            } else {
                toast.error('Invalid promo code', { autoClose: 3000 });
                setDiscountAmount(0)
                setCouponCode('')
            }
        }
    };

    const handleCouponClick = (couponCode) => {
        setCouponCode(couponCode)
        setShowSuggestions(false);
    };

    const handlePaymentSuccess = async (payment) => {
        try {
            console.log(payment, 'paymentpaymentpaymentpayment')

            const payload = {
                paymentId: payment.id,
                contactId: localStorage.getItem('contactId')
            };

            setPaymentId(payment.id)

            const response = await fetch('http://localhost:7781/api/addFlightTicketsData', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
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

            <div className="2xl:container 2xl:mx-auto p-5">
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
                                        <h3 className="font-semibold text-gray-800 text-base mb-3">Contact Details</h3>
                                        <div className="space-y-2">
                                            <p className="text-sm">
                                                <span className="text-gray-600">Name:</span>
                                                <span className="ml-2 font-medium">{contactDetails?.fullName}</span>
                                            </p>
                                            <p className="text-sm">
                                                <span className="text-gray-600">Email:</span>
                                                <span className="ml-2 font-medium">{contactDetails?.email}</span>
                                            </p>
                                            <p className="text-sm">
                                                <span className="text-gray-600">Phone:</span>
                                                <span className="ml-2 font-medium">{contactDetails?.mobileNumber}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-800 text-base mb-3">Passenger List</h3>
                                        <div className="space-y-3">
                                            {passengerDetails && passengerDetails.map((passenger, index) => (
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
                                            <div className=" h-[2px] bg-gray-300 relative">
                                                <Plane className="absolute -top-4 -right-2 text-purple-500 transform rotate-[45deg]" size={20} />
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
                                                {totalSeat && totalSeat?.map((seat, index) => (
                                                    <span key={index}>
                                                        {seat.seatNumber}
                                                        {index < totalSeat?.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                        <div className="bg-purple-50 rounded-lg p-3">
                                            <p className="text-sm text-purple-600">Duration</p>
                                            <p className="font-semibold">{flight && convertTime(flight?.duration)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {mealData && mealData.length !== 0 && (
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <Coffee className="text-white" size={24} />
                                            <h2 className="text-xl font-semibold text-white">Meal Selection</h2>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {mealData.map((meal, index) => (
                                                <div key={index} className="flex justify-between items-center bg-green-50 rounded-lg p-4">
                                                    <div>
                                                        <p className="font-medium text-gray-800">{meal.mealItems}</p>
                                                        <p className="text-sm text-gray-600">Quantity: {meal.mealCount}</p>
                                                    </div>
                                                    <p className="font-semibold text-green-600">₹{meal.mealCount * meal.mealPrice}</p>
                                                </div>
                                            ))}
                                            <div className="flex justify-end">
                                                <p className="font-semibold text-lg">Total: ₹{totalMealPrice || 0}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg top-6">
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
                                        {discountAmount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount</span>
                                                <span>-₹{discountAmount}</span>
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
                                                onFocus={handleInputFocus}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                onBlur={handleInputBlur}
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

                                        {showSuggestions && discountCoupon.length > 0 && (
                                            <div className="absolute z-20 w-[23%] bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-60 overflow-auto scrollbar-hide">
                                                {discountCoupon.map((coupon, index) => {

                                                    const isDisabled =
                                                        (totalPrice < 5000) ||
                                                        (totalPrice >= 5000 && totalPrice < 25000 && coupon.discountAmount >= 2000);

                                                    let validityMessage;
                                                    if (coupon.discountAmount < 2000) {
                                                        validityMessage = "Total ₹10K - ₹25K required";
                                                    } else {
                                                        validityMessage = "Total ₹25K+ required";
                                                    }


                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`flex justify-between items-center p-3 border-b border-gray-200 last:border-0 transition-all cursor-pointer
                                                                ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-blue-50'}`}
                                                            onClick={() => !isDisabled && handleCouponClick(coupon.discountCouponName)}
                                                        >
                                                            <div>
                                                                <p className="text-gray-900 font-semibold">{coupon.discountCouponName}</p>
                                                                <p className="text-sm text-gray-500">Discount: {coupon.discountAmount} ₹</p>
                                                            </div>

                                                            <div className="text-right text-sm text-gray-700 font-medium">
                                                                <p className={`text-gray-700 ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
                                                                    {validityMessage}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
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

            <ToastContainer
                position="top-right"
                className="toast-container"
                draggable="true"
            />

            {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <StripePayment onPaymentSuccess={handlePaymentSuccess} />
            </Modal> */}

            <Modal isOpen={showPaymentSucess} onClose={() => setShowPaymnetSucess(false)} hideCloseButton={true}>
                <PaymentSuccess paymentId={paymentId} openThankYouPage={handleThankYouPage} />
            </Modal>

            <Modal isOpen={isModalOpen} onClose={() => setShowThankYou(false)}>
                <ThankYouPage pdfLink={pdfLink} />
            </Modal>
        </div>
    );
};

export default FlightsTicketsPaymentPage;