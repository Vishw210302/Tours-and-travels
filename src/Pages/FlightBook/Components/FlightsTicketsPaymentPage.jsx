import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyGetParticularFlightQuery, useSubmitFlightTicketDataMutation } from '../../../Api/Api';
import { useFlightTicketsDetailsContext } from '../../../Context/FlightTicketsDetailsContext';
import StripePayment from '../../Payment/PaymentForm';
import Modal from '../../Modal/Modal';
import PaymentSuccess from '../../Payment/PaymentSuccess';
// import '../../../assets/custom.css'

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
        <div className="w-full  mx-auto bg-white rounded-lg  p-8">
            <h1 className="text-3xl font-bold text-center text-red-500 mb-6">Thank You for Your Booking!</h1>
            <p className="text-center text-gray-700 mb-6 text-lg">Your flight has been successfully booked. We can’t wait to see you on board!</p>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-4">Booking Summary:</h3>
                <div className="space-y-2">
                    <p className="flex justify-between"><strong>Flight:</strong> <span>{bookingDetails.flightNumber}</span></p>
                    <p className="flex justify-between"><strong>From:</strong> <span>{bookingDetails.departure}</span></p>
                    <p className="flex justify-between"><strong>To:</strong> <span>{bookingDetails.arrival}</span></p>
                    <p className="flex justify-between"><strong>Date:</strong> <span>{bookingDetails.date}</span></p>
                    <p className="flex justify-between"><strong>Passenger:</strong> <span>{bookingDetails.passengerName}</span></p>
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={handleDownload}
                    className="text-white px-6 py-3 bg-red-500 font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105">
                    Download Ticket (PDF)
                </button>
            </div>

            <div className="mt-8 text-sm text-gray-600">
                <h4 className="font-semibold mb-2">Additional Information:</h4>
                <ul className="list-disc list-inside">
                    <li>Please arrive at the airport at least 2 hours before departure.</li>
                    <li>Check our website for baggage allowance and policies.</li>
                    <li>For any changes or queries, please contact our customer support.</li>
                </ul>
            </div>
        </div>
    );
};

const FlightsTicketsPaymentPage = () => {

    const navigate = useNavigate();
    const { id, className } = useParams();

    const [fetchFlight, { data, isSuccess, isError, error }] = useLazyGetParticularFlightQuery();
    const [flight, setFlight] = useState();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [showThankYou, setShowThankYou] = useState(false);
    const [showPaymentSucess, setShowPaymnetSucess] = useState(false)
    const [pdfLink, setPdfLink] = useState('');
    const [submitFlightTicketData,
        { data: submittedTicketData,
            isSuccess: isSubmissionSuccess,
            error: submissionError,
            isError: hasSubmissionError
        }
    ] = useSubmitFlightTicketDataMutation();

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

    useEffect(() => {
        if (id) {
            fetchFlight({ key: '1', id });
        }
    }, [fetchFlight, id]);

    useEffect(() => {
        if (isSuccess) {
            setFlight(data?.data)
        }

    }, [data, isSuccess, isError, error])

    useEffect(() => {

        if (isSubmissionSuccess) {
            console.log(submittedTicketData, 'submittedTicketData')
            const pdfUrl = `${backend_url}${submittedTicketData?.pdfUrl}`
            setPdfLink(pdfUrl)
            setIsModalOpen(false);
            setShowPaymnetSucess(true);
        }
        else if (hasSubmissionError) {
            console.log('Submit flight data :', submissionError)
        }

    }, [submittedTicketData, isSubmissionSuccess, submissionError, hasSubmissionError])

    const handleSeatBookingPage = () => {
        navigate(`/flight-seat-booking/${className}/${id}`)
    }

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
    const totalMealPrice = selectedMealData?.reduce((acc, meal) => acc + (meal?.count * meal?.price), 0)
    const ticketPrice = flight?.class_details?.[className]?.prices?.adult
    const totalPrice = ticketPrice + totalSeatPrice + totalMealPrice

    useEffect(() => {
        setotalTicketPrice(totalPrice)
    }, [totalPrice])

    const handlePaymentSuccess = async () => {
        // console.log('Payment successful:', paymentData);

        try {

            const payload = {

                flightId: id,
                passengerPersonalDetails,
                selectedMealData,
                flightSeatData,
                paymentId: 'sfsdfdnsfndfnsdf'

            }
            console.log("apiapiapiapi")

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

            setPdfLink(pdfUrl)
            setIsModalOpen(false);
            setShowPaymnetSucess(true);

           

        } catch (error) {
            console.log('flightSubmissin_error:', error)
        }



    };

    const handleThankYouPage = () => {
        setShowPaymnetSucess(false)
        setShowThankYou(true)
    }

    return (
        <>
            <div className='bg-[#f7f7f7] h-full pb-10'>
                <div className="relative h-[400px] w-full bg-[url('https://assets.gqindia.com/photos/6540e2ba4622f7146b12b76b/16:9/w_2560%2Cc_limit/best-time-to-book-flights.jpg')] bg-cover bg-center flex justify-center items-center">
                    <div
                        className="absolute top-0 bottom-0 left-0 right-0"
                        style={{
                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%)',
                            zIndex: 0,
                        }}
                    />
                    <h1 className="relative text-white text-3xl font-bold z-10">Tickets Payment</h1>
                </div>

                <div className="2xl:container 2xl:mx-auto px-5 mt-5">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

                        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                            <h2 className="text-lg font-bold mb-3">Contact Details</h2>
                            <div className="h-[200px] overflow-y-auto">

                                <div className="mb-4 pb-3">
                                    <p className="text-sm text-gray-600 mb-1">Passenger : <span className="font-semibold">{passengerPersonalDetails?.contactDetails?.fullName}</span></p>
                                    <p className="text-sm text-gray-600 mb-1">Email: <span className="font-semibold">{passengerPersonalDetails?.contactDetails?.email}</span></p>
                                    <p className="text-sm text-gray-600">Phone: <span className="font-semibold">{passengerPersonalDetails?.contactDetails?.phoneNumber}</span></p>
                                </div>

                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                            <h2 className="text-lg font-bold mb-3">Passenger Details</h2>
                            <div className="h-[200px] overflow-y-auto">

                                {passengerPersonalDetails?.passengerDetailsData?.map((passenger, index) => (
                                    <div key={index} className="mb-4 border-b border-gray-200 pb-3">
                                        <p className="text-sm text-gray-600 mb-1">Passenger {index + 1}: <span className="font-semibold">{passenger.fullName}</span></p>
                                        <p className="text-sm text-gray-600 mb-1">Age: <span className="font-semibold">{passenger.age}</span></p>
                                        <p className="text-sm text-gray-600">Gender: <span className="font-semibold">{passenger.gender}</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                            <h2 className="text-lg font-bold mb-3">Meal Details</h2>

                            <div className='flex justify-between font-semibold text-base mb-2'>
                                <p>Meal Name</p>
                                <p>Price </p>
                            </div>

                            <div className='mb-2'>
                                {selectedMealData?.map((meal, index) => (
                                    <div key={index} className='text-sm flex justify-between'>
                                        <p>{meal?.meal_name}</p>
                                        <p>{meal?.count} * {meal?.price}</p>
                                    </div>
                                ))}

                            </div>

                            <div className='flex flex-row-reverse mb-1'>
                                <div className='w-32 h-[1px] flex flex-row-reverse bg-black'></div>
                            </div>

                            <div className='flex flex-row-reverse text-base font-semibold'>
                                <p>Total : ₹ {totalMealPrice || 0}</p>
                            </div>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                            <h2 className="text-lg font-bold mb-3">Seat Details</h2>
                            <p className="text-sm text-gray-600 mb-2">Selected Seats:
                                {flightSeatData?.map((seat, index) => (
                                    <span className="font-semibold">{seat?.seat_name}  {index < flightSeatData.length - 1 && ', '} </span>

                                ))}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">Class: <span className="font-semibold">{capitalizeFirstLetter(className)}</span></p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                            <h2 className="text-lg font-bold mb-3">Flight Details</h2>
                            <p className="text-sm text-gray-600 mb-2">Flight Number: <span className="font-semibold">{flight?.flightCode}</span></p>
                            <p className="text-sm text-gray-600 mb-2">From: <span className="font-semibold">{flight?.departure?.city} ({flight?.departure?.airport})</span></p>
                            <p className="text-sm text-gray-600 mb-2">To: <span className="font-semibold">{flight?.arrival?.city} ({flight?.arrival?.airport})</span></p>
                            <p className="text-sm text-gray-600 mb-2">Departure: <span className="font-semibold">{formatDateTime(flight?.departure?.time)}</span></p>
                            <p className="text-sm text-gray-600 mb-2">Arrival: <span className="font-semibold">{formatDateTime(flight?.arrival?.time)}</span></p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-3 mt-2 transition-all duration-300 hover:shadow-lg">
                            <h2 className="text-lg font-bold mb-3">Payment Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Ticket Price:</span>
                                <span className="font-semibold">₹{ticketPrice}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Seats :</span>
                                <span className="font-semibold">₹{totalSeatPrice || 0}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Meal :</span>
                                <span className="font-semibold">₹{totalMealPrice || 0}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-semibold">₹{totalPrice}</span>
                            </div>

                        </div>
                    </div>

                    <div className='flex flex-row justify-center items-center gap-4 mb-3'>
                        <button
                            className="mt-8 w-1/7 bg-blue-400 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition duration-300 shadow-md hover:shadow-lg p-2 hover:scale-105"

                        // onClick={() => {
                        //     setIsModalOpen(true)
                        // }}
                        >
                            <p className='text-sm flex flex-1 gap-2 items-center'>
                                <ArrowCircleLeftIcon />
                                Go to previous form
                            </p>
                        </button>
                        <button
                            className="mt-8 w-1/7 bg-red-400 text-white font-semibold py-3 rounded-lg hover:bg-red-500 transition duration-300 shadow-md hover:shadow-lg p-2 hover:scale-105"
                            onClick={() => setIsModalOpen(true)}
                        // onClick={() => {
                        //     handlePaymentSuccess()
                        // }}
                        >
                            <p className='text-sm flex flex-1 gap-2 items-center'>
                                Total Payment (₹{totalPrice})
                            </p>
                        </button>

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

                </div>
            </div>
        </>
    );
};

export default FlightsTicketsPaymentPage;