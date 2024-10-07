import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FlightSeatBooking = () => {

    const { id } = useParams();

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [hoveredSeat, setHoveredSeat] = useState(null);
    const navigate = useNavigate();

    const handleSeatClick = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const seats = [
        [{ name: '1A', price: 150 }, { name: '1B', price: 150 }, { name: '1C', price: 150 }, { name: '1D', price: 150 }, { name: '1E', price: 150 }, { name: '1F', price: 150 }],
        [{ name: '2A', price: 130 }, { name: '2B', price: 130 }, { name: '2C', price: 130 }, { name: '2D', price: 130 }, { name: '2E', price: 130 }, { name: '2F', price: 130 }],
        [{ name: '3A', price: 120 }, { name: '3B', price: 120 }, { name: '3C', price: 120 }, { name: '3D', price: 120 }, { name: '3E', price: 120 }, { name: '3F', price: 120 }],
        [{ name: '4A', price: 100 }, { name: '4B', price: 100 }, { name: '4C', price: 100 }, { name: '4D', price: 100 }, { name: '4E', price: 100 }, { name: '4F', price: 100 }],
        [{ name: '5A', price: 90 }, { name: '5B', price: 90 }, { name: '5C', price: 90 }, { name: '5D', price: 90 }, { name: '5E', price: 90 }, { name: '5F', price: 90 }]
    ];

    const handleGoToMealPage = () => {
        navigate(`/meal-booking/${id}`)
    }

    const handlePaymentPage = () => {
        navigate(`/tickets-payment/${id}`)
    }

    return (
        <>
            <div className='bg-[#f7f7f7]'>
                <div className="relative h-[400px] w-full bg-[url('https://assets.gqindia.com/photos/6540e2ba4622f7146b12b76b/16:9/w_2560%2Cc_limit/best-time-to-book-flights.jpg')] bg-cover bg-center flex justify-center items-center">
                    <div
                        className="absolute top-0 bottom-0 left-0 right-0"
                        style={{
                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%)',
                            zIndex: 0
                        }}
                    />
                    <h1 className="relative text-white text-3xl font-bold z-10">Flight Seat Booking</h1>
                </div>
                <div className='bg-[#f7f7f7] flex justify-center items-center'>
                    <div className='m-5 w-[360px] card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] p-3 transition-all duration-300 hover:shadow-lg rounded-tl-[50%] rounded-tr-[50%]'>
                        <div className='h-[220px] relative overflow-hidden text-center'>
                            <h3 className='mt-[53px] text-lg text-black font-semibold'>Please Select a Seat</h3>
                        </div>

                        <div className="relative flex flex-row justify-between p-5">
                            <p className='text-white font-semibold text-sm bg-green-500 p-2 rounded-lg m-0 text-center'>Exit</p>
                            <p className='text-white font-semibold text-sm bg-green-500 p-2 rounded-lg m-0 text-center'>Exit</p>
                        </div>

                        {seats.map((row, rowIndex) => (
                            <div key={rowIndex} className='p-3 flex flex-row justify-between'>
                                <div className='flex flex-row justify-between gap-2'>
                                    {row.slice(0, 3).map((seat) => (
                                        <div
                                            key={seat.name}
                                            className={`border border-blue-300 rounded-lg p-2 cursor-pointer ${selectedSeats.includes(seat.name) ? 'border-blue-600 border-2' : 'border-blue-300'} bg-blue-300 hover:bg-blue-400 relative`}
                                            onClick={() => handleSeatClick(seat.name)}
                                            onMouseEnter={() => setHoveredSeat(seat)}
                                            onMouseLeave={() => setHoveredSeat(null)}
                                        >
                                            <p>{seat.name}</p>
                                            {hoveredSeat && hoveredSeat.name === seat.name && (
                                                <div className='absolute top-[-20px] left-[-10px] text-white bg-black p-1 rounded-md'>
                                                    ₹{seat.price}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className='flex flex-row justify-between gap-2'>
                                    {row.slice(3).map((seat) => (
                                        <div
                                            key={seat.name}
                                            className={`border rounded-lg p-2 cursor-pointer ${selectedSeats.includes(seat.name) ? 'border-blue-600 border-2' : 'border-blue-300'} bg-blue-300 hover:bg-blue-400 relative`}
                                            onClick={() => handleSeatClick(seat.name)}
                                            onMouseEnter={() => setHoveredSeat(seat)}
                                            onMouseLeave={() => setHoveredSeat(null)}
                                        >
                                            <p>{seat.name}</p>
                                            {hoveredSeat && hoveredSeat.name === seat.name && (
                                                <div className='absolute top-[-20px] left-[-10px] text-white bg-black p-1 rounded-md'>
                                                    ₹{seat.price}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="relative flex flex-row justify-between p-5">
                            <p className='text-white font-semibold text-sm bg-green-500 p-2 rounded-lg m-0 text-center'>Exit</p>
                            <p className='text-white font-semibold text-sm bg-green-500 p-2 rounded-lg m-0 text-center'>Exit</p>
                        </div>

                        <div className='p-5 text-center'>
                            <h4 className='text-lg font-semibold'>Selected Seats:</h4>
                            {selectedSeats.length > 0 ? (
                                <p className='text-blue-500 font-bold'>{selectedSeats.join(', ')}</p>
                            ) : (
                                <p className='text-red-500 font-semibold'>No seats selected</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-center items-center gap-4 mb-3'>
                    <button
                        className="mt-8 w-1/7 bg-blue-400 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition duration-300 shadow-md hover:shadow-lg p-2"
                        onClick={handleGoToMealPage}
                    >
                        <p className='text-sm flex flex-1 gap-2 items-center'>
                            <ArrowCircleLeftIcon />
                            Go to previous form
                        </p>
                    </button>
                    <button
                        className="mt-8 w-1/7 bg-red-400 text-white font-semibold py-3 rounded-lg hover:bg-red-500 transition duration-300 shadow-md hover:shadow-lg p-2"
                        onClick={handlePaymentPage}
                    >
                        <p className='text-sm flex flex-1 gap-2 items-center'>
                            Go to next form
                            <ArrowCircleRightIcon />
                        </p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default FlightSeatBooking;