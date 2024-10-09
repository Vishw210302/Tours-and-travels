import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLazyGetParticularFlightQuery } from '../../Api/Api';

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

const LuggageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 20h12M6 20v-4M18 20v-4"></path>
        <rect x="4" y="8" width="16" height="8" rx="1"></rect>
        <path d="M8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"></path>
    </svg>
);

const FlightBook = () => {
    const { id, key, className } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [flight, setFlight] = useState();
    const [fetchFlight, { data, isSuccess, isError, error }] = useLazyGetParticularFlightQuery();

    const spechialFlightImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/special-flight-image/`;

    const handleCheckoutFlightBooking = () => {
        navigate(`/passenger-details/${className}/${id}`);
    };

    useEffect(() => {
        if (key && id) {
            fetchFlight({ key, id });
        }
    }, [fetchFlight, key, id]);

    useEffect(() => {
        if(isSuccess){
            setFlight(data?.data)
            // console.log(flight?.class_details?.[className]?.prices?.adult, 'flightflight')
        }
        
    }, [data, isSuccess, isError, error])


    const convertTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return `${parseInt(hours)}h ${parseInt(minutes)}m`;
    };

    const dataTime = () => {
        const holdDetailsArray = flight.hold_details.map((details) => {
            const arrivalTime = new Date(details.arrival_time);
            const departureTime = new Date(details.departure_time);
            const timeDiff = departureTime - arrivalTime;
            const totalSeconds = Math.floor(timeDiff / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);

            return {
                airport: details.airport,
                city: details.city,
                arrivalTime: arrivalTime.toLocaleTimeString(),
                departureTime: departureTime.toLocaleTimeString(),
                duration: `${hours}h ${minutes}m`,
            };
        });

        return holdDetailsArray;
    };

    const getTodayDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const year = today.getFullYear();

        return `${month}/${day}/${year}`;
    };

    const holdDetails = flight?.hold_details ? dataTime() : null;


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
                    <h1 className="relative text-white text-3xl font-bold z-10">Flight Details</h1>
                </div>
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-10 my-2 h-fit">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Selected Departure Flight</h3>
                                    <p className="font-bold">
                                        {flight?.departure ? (
                                            `${flight?.departure?.city} (${flight?.departure?.airport}) → ${flight?.arrival?.city} (${flight?.arrival?.airport})`
                                        ) : (
                                            `${flight?.flightsFrom} (${flight?.fromAirportCode}) → ${flight?.flightsTo} (${flight?.toAirportCode})`
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-2">
                                        {flight?.departure ? (
                                            <>
                                                {new Date(flight?.departure?.time).toLocaleDateString()} |
                                                {new Date(flight?.departure?.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                                {new Date(flight?.arrival?.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </>
                                        ) :
                                            <>
                                                {getTodayDate()} |  {flight?.departureTime} - {flight?.arrivalTime}
                                            </>
                                        }
                                    </p>
                                </div>

                                <div>
                                    <div className='grid grid-cols-3 items-center gap-2'>
                                        <div className='flex flex-col items-center'>
                                            <span>
                                                <img src={flight?.airlineLogo ? `${spechialFlightImage}${flight?.airlineLogo}` : `${spechialFlightImage}${flight?.flightsImage}`} alt='airline-logo' className="w-32 h-auto" />
                                            </span>
                                            <div className='mt-2'>
                                                <p className="font-bold">
                                                    {flight?.departure ?
                                                        (`${flight?.departure?.city}(${flight?.departure?.airport})`)
                                                        :
                                                        (`${flight?.flightsFrom} (${flight?.fromAirportCode})`)
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className='relative'>

                                            <div className='flex justify-center text-gray-500 font-bold text-lg'>
                                                {flight?.duration ? convertTime(flight?.duration) : flight?.totalTime}
                                            </div>

                                            <div className='absolute w-full flex justify-around items-center top-1/1.5 left-1/2 transform -translate-x-1/2 -translate-y-[70%]'>
                                                {flight?.hold_details && flight.hold_details.length > 0 && (
                                                    flight.hold_details.map((detail, index) => {
                                                        const arrivalTime = new Date(detail?.arrival_time).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        });
                                                        const departureTime = new Date(detail?.departure_time).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        });

                                                        return (
                                                            <div key={index + "index"} className='relative group'>
                                                                <p className='text-[70px] cursor-pointer'>.</p>

                                                                <div className='absolute hidden w-[200px] h-[auto] shadow-[rgba(0,_0,_0,_0.25)_0px_14px_28px,_rgba(0,_0,_0,_0.22)_0px_10px_10px] group-hover:block bg-white border border-gray-300 p-2 -right-28 rounded-md -top-14'>
                                                                    <div className='font-bold mb-1'>{detail?.city} {`(${detail?.airport})`}</div>
                                                                    <div className='w-full bg-gray-200 h-1'></div>
                                                                    <div className='w-full'>Arrival time: {arrivalTime}</div>
                                                                    <div className='w-full'>Departure time: {departureTime}</div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </div>
                                            <div className="relative h-px my-1 bg-gray-800"></div>
                                            <div className='flex justify-center font-mono text-lg text-blue-500'>
                                                {flight?.hold ? flight?.hold : 'One-hold'}
                                            </div>
                                        </div>

                                        <div className='flex flex-col items-center'>
                                            <span>
                                                <img src={flight?.airlineLogo ?
                                                    `${spechialFlightImage}${flight?.airlineLogo}`
                                                    :
                                                    `${spechialFlightImage}${flight?.flightsImage}`
                                                } alt='arrival-flight' className="w-32 h-auto" />
                                            </span>
                                            <div className='mt-2'>
                                                <p className="font-bold">{flight?.arrival ? `${flight?.arrival?.city} (${flight?.arrival?.airport})` : `${flight?.flightsTo} (${flight?.toAirportCode})`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {flight?.hold !== "Direct" && flight?.hold_details?.length > 0 && (
                                    <div className="bg-[#f7f7f7] rounded-lg p-4">
                                        {holdDetails?.length > 0 && holdDetails.map((detail, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <ClockIcon />
                                                <span className="text-sm">
                                                    Layover: {detail.duration} in {detail.city} ({detail.airport})
                                                </span>
                                            </div>
                                        ))}

                                    </div>
                                )}

                                <div className="flex space-x-8">
                                    <div className="flex items-center space-x-2">
                                        <BriefcaseIcon />
                                        <span>Cabin Baggage: 7kg</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <LuggageIcon />
                                        <span>Checked Baggage: 15kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-white rounded-xl shadow-lg transition-all duration-300 p-8 my-4 h-fit">
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Flight Price Summary</h2>
                            <div className='flex flex-row gap-2'>
                                <h3 className='font-semibold text-md text-red-600'>Per person price:-</h3>
                                <h3 className='font-semibold text-md'>₹{flight?.class_details?.[className]?.prices?.adult ? flight?.class_details?.[className]?.prices?.adult : "2400"}</h3>
                            </div>

                            <button
                                className="mt-8 w-full bg-red-400 text-white font-semibold py-3 rounded-lg hover:bg-red-500 transition duration-300 shadow-md hover:shadow-lg"
                                onClick={handleCheckoutFlightBooking}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FlightBook;