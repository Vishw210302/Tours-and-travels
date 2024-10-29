import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFlightSeatQuery, useLazyGetFlightUpdatedSeatQuery, useUpdateSeatMutation } from '../../../Api/Api';
import { usePassenger } from '../../../Context/PassengerCountContext';
import { ToastContainer, toast } from 'react-toastify';
import { ArrowLeftCircle, ArrowRightCircle, Plane } from 'lucide-react';

const FlightSeatBooking = () => {
    const { id, className } = useParams();
    const { passengerCount } = usePassenger();
    const { data, isError, isSuccess, error } = useGetFlightSeatQuery(id);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [hoveredSeat, setHoveredSeat] = useState(null);
    const [seats, setSeats] = useState();
    const [selectSeat, setSelectSeat] = useState(false);
    const [showMessage, setShowMessage] = useState('');

    const [updateSeat, {
        isSuccess: isUpdateSeatSucessfully,
        isError: isFetchingErrInSeat,
        error: fetchingErrInUpdateSeat
    }] = useUpdateSeatMutation();

    const [fetchedUpdatedSeat, {
        data: fetchSeatData,
        isSuccess: successFullyFetchedSeatData,
        isError: isErrFetchingUpdatedSeatData,
        error: errFetchingUpdatedSeatData
    }] = useLazyGetFlightUpdatedSeatQuery();

    const navigate = useNavigate();

    useEffect(() => {
        const contactId = localStorage.getItem('contactId');
        if (contactId) {
            fetchedUpdatedSeat(contactId);
        }
    }, []);

    useEffect(() => {
        if (successFullyFetchedSeatData && fetchSeatData) {
            const preselectedSeats = fetchSeatData?.data.map(seat => seat.seat_number);
            setSelectedSeats(preselectedSeats);
        } else if (isErrFetchingUpdatedSeatData) {
            toast.error('Error fetching updated seat data', { autoClose: 3000 });
        }
    }, [fetchSeatData, successFullyFetchedSeatData, isErrFetchingUpdatedSeatData]);

    useEffect(() => {
        if (isSuccess) {
            const businessSeats = data?.data?.business || [];
            const economySeats = data?.data?.economy || [];
            const firstClassSeats = data?.data?.first_class || [];
            setSeats([...firstClassSeats, ...businessSeats, ...economySeats]);
            setSelectSeat(false);
        } else if (isError) {
            console.log(error, 'fetching seat');
        }
    }, [data, isError, isSuccess, error]);

    useEffect(() => {
        if (isUpdateSeatSucessfully) {
            navigate(`/tickets-payment/${className}/${id}`);
        } else if (isFetchingErrInSeat) {
            toast.error('Error updating seat', { autoClose: 3000 });
        }
    }, [isUpdateSeatSucessfully, isFetchingErrInSeat, navigate, className, id]);

    const totalPassengers = Number(passengerCount.adult) + Number(passengerCount.children);

    const handleSeatClick = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
        } else {
            if (selectedSeats?.length < totalPassengers) {
                setSelectSeat(false);
                setSelectedSeats([...selectedSeats, seat]);
            } else {
                setSelectSeat(true);
                toast.error('All available seats have been selected!', { autoClose: 3000 });
            }
        }
    };

    const handleGoToMealPage = () => {
        navigate(`/meal-booking/${className}/${id}`);
    };

    const handlePaymentPage = async () => {
        const selectedSeatId = selectedSeats.map(seatNumber => {
            const seat = seats.find(s => s.seat_number === seatNumber);
            return { seatId: seat._id };
        });

        if (selectedSeatId.length < totalPassengers) {
            const remainingSeats = totalPassengers - selectedSeatId.length;
            setSelectSeat(true);
            toast.error(`Please select ${remainingSeats} more seat${remainingSeats > 1 ? 's' : ''}`, { autoClose: 3000 });
        } else {
            const id = localStorage.getItem('contactId');
            const payload = { selectedSeatId, id };
            setSelectSeat(false);
            await updateSeat(payload);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <div className="relative h-64 bg-blue-600 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://assets.gqindia.com/photos/6540e2ba4622f7146b12b76b/16:9/w_2560%2Cc_limit/best-time-to-book-flights.jpg')] bg-cover bg-center" />
                <div className="relative flex flex-col items-center justify-center h-full text-white space-y-4">
                    <Plane className="w-16 h-16 mb-2" />
                    <h1 className="text-4xl font-bold">Select Your Seats</h1>
                    <p className="text-lg opacity-90">Choose your preferred seating arrangement</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[33rem] mx-auto px-4 py-8">
                {/* Cabin Layout */}
                <div className="bg-white rounded-t-full shadow-xl p-8 transform -mt-16">
                    {/* Plane Nose */}
                    <div className="w-32 h-32 bg-gray-200 rounded-t-full mx-auto mb-8 flex items-center justify-center">
                        <Plane className="w-12 h-12 text-gray-500 transform -rotate-90" />
                    </div>

                    {/* Seat Legend */}
                    <div className="flex justify-center gap-6 mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-300 rounded-lg" />
                            <span className="text-sm text-gray-600">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-lg border-2 border-blue-600" />
                            <span className="text-sm text-gray-600">Selected</span>
                        </div>
                    </div>

                    {/* Emergency Exits */}
                    <div className="flex justify-between mb-6">
                        <div className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg">Exit</div>
                        <div className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg">Exit</div>
                    </div>

                    {/* Seat Grid */}
                    <div className="space-y-4">
                        {Array.from({ length: Math.ceil(seats?.length / 6) }, (_, rowIndex) => {
                            const rowSeats = seats?.slice(rowIndex * 6, rowIndex * 6 + 6);
                            return (
                                <div key={rowIndex} className="flex justify-between">
                                    <div className="flex gap-2">
                                        {rowSeats?.slice(0, 3).map((seat) => (
                                            <button
                                                key={seat.seat_number}
                                                className={`relative w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200
                                                    ${selectedSeats.includes(seat.seat_number)
                                                        ? 'bg-blue-500 border-2 border-blue-600 text-white'
                                                        : 'bg-blue-300 hover:bg-blue-400 text-gray-700'
                                                    }`}
                                                onClick={() => handleSeatClick(seat.seat_number)}
                                                onMouseEnter={() => setHoveredSeat(seat)}
                                                onMouseLeave={() => setHoveredSeat(null)}
                                            >
                                                <span className="font-medium">{seat.seat_number}</span>
                                                {hoveredSeat && hoveredSeat.seat_number === seat.seat_number && (
                                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm">
                                                        ₹{seat.price}
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        {rowSeats?.slice(3).map((seat) => (
                                            <button
                                                key={seat.seat_number}
                                                className={`relative w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200
                                                    ${selectedSeats.includes(seat.seat_number)
                                                        ? 'bg-blue-500 border-2 border-blue-600 text-white'
                                                        : 'bg-blue-300 hover:bg-blue-400 text-gray-700'
                                                    }`}
                                                onClick={() => handleSeatClick(seat.seat_number)}
                                                onMouseEnter={() => setHoveredSeat(seat)}
                                                onMouseLeave={() => setHoveredSeat(null)}
                                            >
                                                <span className="font-medium">{seat.seat_number}</span>
                                                {hoveredSeat && hoveredSeat.seat_number === seat.seat_number && (
                                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm">
                                                        ₹{seat.price}
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Emergency Exits */}
                    <div className="flex justify-between mt-6">
                        <div className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg">Exit</div>
                        <div className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg">Exit</div>
                    </div>

                    {/* Selected Seats Display */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Selected Seats</h4>
                        {selectedSeats?.length > 0 ? (
                            <p className="text-blue-600 font-bold text-lg">{selectedSeats.join(', ')}</p>
                        ) : (
                            <p className="text-red-500 font-medium">No seats selected</p>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={handleGoToMealPage}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                        >
                            <ArrowLeftCircle className="w-5 h-5" />
                            <span>Previous</span>
                        </button>
                        <button
                            onClick={handlePaymentPage}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                        >
                            <span>Continue</span>
                            <ArrowRightCircle className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" />
        </div>
    );
};

export default FlightSeatBooking;