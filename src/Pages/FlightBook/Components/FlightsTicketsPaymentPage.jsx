import { ArrowLeft, Calendar, Coffee, CreditCard, Download, Plane, Ticket, User, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useGetFlightAllBookingDetailsQuery } from '../../../Api/Api';
import { useFlightTicketsDetailsContext } from '../../../Context/FlightTicketsDetailsContext';
import Modal from '../../Modal/Modal';
import StripePayment from '../../Payment/PaymentForm';
import PaymentSuccess from '../../Payment/PaymentSuccess';

const BookingConfirmPage = ({ pdfLink, bookingData, isSuccess }) => {

    const [passengerDetails, setPassengerDetails] = useState('')
    const [totalSeat, setTotalSeat] = useState([]);
    const [flight, setFlight] = useState();
    const [passengerName, setPassengerName] = useState('')
    const { className } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            setPassengerDetails(bookingData?.data?.flightBookDetails?.passengerDetails)
            setFlight(bookingData?.data?.flightBookDetails?.flightDetails)
        }
    }, [bookingData, isSuccess])

    useEffect(() => {
        if (passengerDetails) {

            const seats = passengerDetails?.map((passenger) => {
                return (
                    passenger?.seatInfo?.seat_number
                )
            });

            const passengerNames = passengerDetails.map((passenger) => {
                return (
                    passenger?.fullName
                )
            })

            setTotalSeat(seats.join(','))
            setPassengerName(passengerNames)
        }

    }, [passengerDetails])

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const extractDate = (timeStamp) => {
        const date = new Date(timeStamp);
        const formattedDate = date.toISOString().split("T")[0];
        return formattedDate
    }

    const extractBoardingTime = (timeStamp) => {
        const date = new Date(timeStamp);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = pdfLink;
        a.download = `ticket-${flight?.flightCode}-${flight?.departure?.time}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(pdfLink);

        setTimeout(() => {
            navigate('/flights');
        }, 4000);
    };

    return (
        bookingData && (
            <div className="z-0 flex items-center h-full justify-center">

                <div className="relative w-full max-w-3xl overflow-hidden bg-white rounded-lg shadow-2xl">

                    <div className="relative h-48 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                                <Plane className="w-8 h-8 text-indigo-600 rotate-45" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
                            <p className="text-indigo-100">Get ready for your journey</p>
                        </div>
                    </div>

                    <div className="p-8">

                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">

                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">From</p>
                                    <h3 className="text-xl font-bold text-gray-900">{flight?.departure?.city} ({flight?.departure?.airport})</h3>
                                </div>
                                <Plane className="w-8 h-8 text-indigo-600 rotate-45" />
                                <div className="text-right">
                                    <p className="text-sm text-gray-500 mb-1">To</p>
                                    <h3 className="text-xl font-bold text-gray-900">{flight?.arrival?.city} ({flight?.arrival?.airport})</h3>
                                </div>
                            </div>

                            {flight?.departure?.time != undefined && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {[
                                        { icon: <Calendar className="w-8 h-5" />, label: 'Date', value: extractDate(flight?.departure?.time) },
                                        { icon: <Ticket className="w-8 h-5" />, label: 'Flight', value: flight?.flightCode },
                                        { icon: <User className="w-8 h-5" />, label: 'Passenger', value: passengerName },
                                    ].map((item, index) => {
                                        return (
                                            <div key={index} className="bg-white rounded-xl p-2 shadow-sm">
                                                <div className="flex items-center space-x-1 text-indigo-600 mb-2">
                                                    {item.icon}
                                                    <span className="text-sm font-medium">{item.label}</span>
                                                </div>
                                                {Array.isArray(item.value) ? (
                                                    item.value.map((name, i) => (
                                                        <p key={i} className="text-gray-900 font-semibold">{name}</p>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-900 font-semibold">{item.value}</p>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}

                        </div>

                        <div className="mb-8">
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-600">Class</span>
                                <span className="font-medium text-gray-900">{capitalizeFirstLetter(className)}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-600">Seat</span>
                                <span className="font-medium text-gray-900">{totalSeat}</span>

                            </div>
                            {flight?.departure?.time && (
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-gray-600">Boarding Time</span>
                                    <span className="font-medium text-gray-900">{extractBoardingTime(flight?.departure?.time)}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => {
                                    handleDownload()
                                }}
                                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                                <div className="relative flex items-center space-x-2">
                                    <Download className="w-5 h-5" />
                                    <span>Download Ticket</span>
                                </div>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )
    );
};

const FlightsTicketsPaymentPage = () => {

    const navigate = useNavigate();
    const { id, className } = useParams();
    const [couponCode, setCouponCode] = useState('');
    const [flight, setFlight] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingConfirm, setShowBookingConfirm] = useState(false);
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
    const totalSeatPrice = totalSeat?.reduce((acc, seat) => acc + seat.price, 0);
    const totalMealPrice = mealData && mealData?.reduce((acc, meal) => acc + (meal?.mealCount * meal?.mealPrice), 0);
    const ticketPrice = (flight?.class_details?.[className]?.prices?.adult) * passengerDetails?.length;
    const totalPrice = ticketPrice + totalSeatPrice + totalMealPrice;
    const finalPrice = totalPrice - discountAmount;

    useEffect(() => {
        refetch();
    }, [refetch]);

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
            console.log(fetchingBookingErr, 'hasFetchingBookingErr')
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
        if (selectedCoupon) {
            setDiscountAmount(selectedCoupon?.discountAmount)
            toast.success(`Coupon applied successfully! You saved ₹${selectedCoupon.discountAmount}`, { autoClose: 3000 });
        } else {
            const selectedPromoCode = promocode.find(coupon => coupon.promoCode === couponCode);

            if (selectedPromoCode) {

                if (ticketPrice >= 5000 && ticketPrice <= 25000) {

                    if (selectedPromoCode.discountAmount <= 3000) {
                        setDiscountAmount(selectedPromoCode?.discountAmount);
                        toast.success(`Promocode applied successfully! You saved ₹${selectedPromoCode.discountAmount}`, { autoClose: 3000 });
                    } else {
                        toast.error('Promo code is not valid for this ticket price range (must be ₹3000 or less)', { autoClose: 3000 });
                        setDiscountAmount(0);
                    }

                } else if (ticketPrice > 25000) {
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

            const payload = {
                paymentId: payment.id,
                contactId: localStorage.getItem('contactId'),
                className: className
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
            console.log('error:', error);
        }
    };

    const handleBookingConfirmPage = () => {
        setShowPaymnetSucess(false);
        setShowBookingConfirm(true);
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
                                            {passengerDetails && passengerDetails.map((passenger, index) => {
                                                return (
                                                    <div key={index} className="flex items-center justify-between text-sm">
                                                        <div>
                                                            <span className="font-medium">{passenger.fullName}</span>
                                                            <span className="text-gray-500 ml-2">({passenger.gender})</span>
                                                        </div>
                                                        <span className="text-gray-600">{passenger.age} years</span>
                                                    </div>
                                                )
                                            })}
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

                                            {mealData.map((meal, index) => {
                                                return (
                                                    <div key={index} className="flex justify-between items-center bg-green-50 rounded-lg p-4">
                                                        <div>
                                                            <p className="font-medium text-gray-800">{meal.mealItems}</p>
                                                            <p className="text-sm text-gray-600">Quantity: {meal.mealCount}</p>
                                                        </div>
                                                        <p className="font-semibold text-green-600">₹{meal.mealCount * meal.mealPrice}</p>
                                                    </div>
                                                )
                                            })}

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

                                                {discountCoupon && discountCoupon.map((coupon, index) => {

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

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <StripePayment onPaymentSuccess={handlePaymentSuccess} description="Payment for flight ticket booking" />
            </Modal>

            <Modal isOpen={showPaymentSucess} onClose={() => setShowPaymnetSucess(false)} hideCloseButton={true}>
                <PaymentSuccess paymentId={paymentId} openBookingConfirmPage={handleBookingConfirmPage} />
            </Modal>

            <Modal isOpen={bookingConfirm} onClose={() => setShowBookingConfirm(false)}>
                <BookingConfirmPage bookingData={fetchBookingData} isSuccess={isSuccessfullyFetchedBookingData} pdfLink={pdfLink} />
            </Modal>

        </div>
    );
};

export default FlightsTicketsPaymentPage;