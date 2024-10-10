import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFlightSeatQuery } from '../../../Api/Api';
import { usePassenger } from '../../../Context/PassengerCountContext';
import { useFlightTicketsDetailsContext } from '../../../Context/FlightTicketsDetailsContext';

const FlightSeatBooking = () => {

    const { id, className } = useParams();
    const { passengerCount } = usePassenger();
    const { setFlightSeatData } = useFlightTicketsDetailsContext();
    const { data, isError, isSuccess, error } = useGetFlightSeatQuery(id)
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [hoveredSeat, setHoveredSeat] = useState(null);
    const [seats, setSeats] = useState()
    const [selectSeat, setSelectSeat] = useState(false);
    const navigate = useNavigate();

    const totalPassengers =
        Number(passengerCount.adult) +
        Number(passengerCount.children)

    const handleSeatClick = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
        } else {
            if (selectedSeats.length < totalPassengers) {
                setSelectedSeats([...selectedSeats, seat]);
            } else {
                setSelectSeat(true)
            }
        }

    };

    useEffect(() => {

        if (isSuccess) {

            const businessSeats = data?.data?.business || [];
            const economySeats = data?.data?.economy || [];
            const firstClassSeats = data?.data?.first_class || [];

            setSeats([...firstClassSeats, ...businessSeats, ...economySeats,]);
            setSelectSeat(false)
        } else if (isError) {
            console.log(error, 'fetching seat')
        }

    }, [data, isError, isSuccess, error])

    const handleGoToMealPage = () => {
        navigate(`/meal-booking/${className}/${id}`)
    }

    const handlePaymentPage = () => {

        const selectedSeatData = selectedSeats.map(seatNumber => {
            const seat = seats.find(s => s.seat_number === seatNumber);
            return {
                seat_id: seat._id,
                seat_name: seat.seat_number,
                seat_price: seat.price,
            };
        });

        setFlightSeatData(selectedSeatData)
        navigate(`/tickets-payment/${className}/${id}`)
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

                        {selectSeat ? (
                            <div className='flex justify-center'>
                                <p className='text-red-600 font-semibold'>Not select more seat</p>
                            </div>
                        ) : (
                            <></>
                        )}

                        <div className="relative flex flex-row justify-between p-5">
                            <p className='text-white font-semibold text-sm bg-green-500 p-2 rounded-lg m-0 text-center'>Exit</p>
                            <p className='text-white font-semibold text-sm bg-green-500 p-2 rounded-lg m-0 text-center'>Exit</p>
                        </div>


                        {Array.from({ length: Math.ceil(seats?.length / 6) }, (_, rowIndex) => {
                            const rowSeats = seats.slice(rowIndex * 6, rowIndex * 6 + 6);
                            return (
                                <div key={rowIndex} className='p-3 flex flex-row justify-between'>
                                    <div className='flex flex-row justify-between gap-2'>

                                        {rowSeats.slice(0, 3).map((seat) => (
                                            <div
                                                key={seat.seat_number}
                                                className={`border border-blue-300 rounded-lg p-2 cursor-pointer ${selectedSeats.includes(seat.seat_number) ? 'border-blue-600 border-2' : 'border-blue-300'} bg-blue-300 hover:bg-blue-400 relative`}
                                                onClick={() => handleSeatClick(seat.seat_number)}
                                                onMouseEnter={() => setHoveredSeat(seat)}
                                                onMouseLeave={() => setHoveredSeat(null)}
                                            >
                                                <p>{seat.seat_number}</p>
                                                {hoveredSeat && hoveredSeat.seat_number === seat.seat_number && (
                                                    <div className='absolute top-[-20px] left-[-10px] text-white bg-black p-1 rounded-md'>
                                                        ₹{seat.price}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className='flex flex-row justify-between gap-2'>

                                        {rowSeats.slice(3).map((seat) => (
                                            <div
                                                key={seat.seat_number}
                                                className={`border rounded-lg p-2 cursor-pointer ${selectedSeats.includes(seat.seat_number) ? 'border-blue-600 border-2' : 'border-blue-300'} bg-blue-300 hover:bg-blue-400 relative`}
                                                onClick={() => handleSeatClick(seat.seat_number)}
                                                onMouseEnter={() => setHoveredSeat(seat)}
                                                onMouseLeave={() => setHoveredSeat(null)}
                                            >
                                                <p>{seat.seat_number}</p>
                                                {hoveredSeat && hoveredSeat.seat_number === seat.seat_number && (
                                                    <div className='absolute top-[-20px] left-[-10px] text-white bg-black p-1 rounded-md'>
                                                        ₹{seat.price}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

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