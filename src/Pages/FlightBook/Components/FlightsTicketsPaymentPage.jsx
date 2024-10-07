import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FlightsTicketsPaymentPage = () => {

    const navigate = useNavigate();

    const passengers = [
        { name: 'John Doe', email: 'john.doe@example.com', phone: '+1 234 567 890' },
        { name: 'Jane Doe', email: 'jane.doe@example.com', phone: '+1 234 567 891' },
        { name: 'Mark Smith', email: 'mark.smith@example.com', phone: '+1 234 567 892' },
        { name: 'Emily Clark', email: 'emily.clark@example.com', phone: '+1 234 567 893' },
    ];

    const handleSeatBookingPage = () => {
        navigate("/flight-seat-booking")
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
                            <h2 className="text-lg font-bold mb-3">Flight Details</h2>
                            <p className="text-sm text-gray-600 mb-2">Flight Number: <span className="font-semibold">AI 302</span></p>
                            <p className="text-sm text-gray-600 mb-2">From: <span className="font-semibold">New York (JFK)</span></p>
                            <p className="text-sm text-gray-600 mb-2">To: <span className="font-semibold">Los Angeles (LAX)</span></p>
                            <p className="text-sm text-gray-600 mb-2">Departure: <span className="font-semibold">10:00 AM, 10th Oct 2024</span></p>
                            <p className="text-sm text-gray-600 mb-2">Arrival: <span className="font-semibold">1:30 PM, 10th Oct 2024</span></p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                            <h2 className="text-lg font-bold mb-3">Passenger Details</h2>
                            <div className="h-[200px] overflow-y-auto">
                                {passengers.map((passenger, index) => (
                                    <div key={index} className="mb-4 border-b border-gray-200 pb-3">
                                        <p className="text-sm text-gray-600 mb-1">Passenger {index + 1}: <span className="font-semibold">{passenger.name}</span></p>
                                        <p className="text-sm text-gray-600 mb-1">Email: <span className="font-semibold">{passenger.email}</span></p>
                                        <p className="text-sm text-gray-600">Phone: <span className="font-semibold">{passenger.phone}</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                            <h2 className="text-lg font-bold mb-3">Meal Details</h2>
                            <p className="text-sm text-gray-600 mb-2">Meal Option: <span className="font-semibold">Vegetarian</span></p>
                            <p className="text-sm text-gray-600 mb-2">Special Instructions: <span className="font-semibold">Gluten-free</span></p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                            <h2 className="text-lg font-bold mb-3">Seat Details</h2>
                            <p className="text-sm text-gray-600 mb-2">Selected Seats: <span className="font-semibold">12A, 12B</span></p>
                            <p className="text-sm text-gray-600 mb-2">Class: <span className="font-semibold">Economy</span></p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-3 mt-2 transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-lg font-bold mb-3">Payment Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Ticket Price:</span>
                            <span className="font-semibold">$500</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Taxes & Fees:</span>
                            <span className="font-semibold">$50</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600">Total:</span>
                            <span className="font-semibold">$550</span>
                        </div>
                        <div className='flex flex-row justify-center items-center gap-4 mb-3'>
                            <button
                                className="mt-8 w-1/7 bg-blue-400 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition duration-300 shadow-md hover:shadow-lg p-2"
                                onClick={() => {
                                    handleSeatBookingPage()
                                }}
                            >
                                <p className='text-sm flex flex-1 gap-2 items-center'>
                                    <ArrowCircleLeftIcon />
                                    Go to previous form
                                </p>
                            </button>
                            <button
                                className="mt-8 w-1/7 bg-red-400 text-white font-semibold py-3 rounded-lg hover:bg-red-500 transition duration-300 shadow-md hover:shadow-lg p-2"
                            /*  onClick={() => {
                                 handlePaymentPage()
                             }} */
                            >
                                <p className='text-sm flex flex-1 gap-2 items-center'>
                                    Total Payment (500₹)
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FlightsTicketsPaymentPage;