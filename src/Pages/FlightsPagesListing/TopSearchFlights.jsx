import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopSearchFlights = ({ flightsData, classDetail }) => {

  const spechialFlightImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/special-flight-image/`
  const [flightsDetails, setFlightsData] = useState();
  const navigate = useNavigate()
  const handleBookPage = (flightId, key) => {
    navigate(`/flight-book/${classDetail}/${key}/${flightId}`);
  };

  useEffect(() => {
    setFlightsData(flightsData)
  }, [flightsData])

  const convertTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${parseInt(hours)}h ${parseInt(minutes)}m`;
  }

  const extractTimeFromTimestamp = (timestamp, key) => {
    const date = new Date(timestamp);
    if (key == '1') {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      const localTimeString = date.toLocaleTimeString(undefined, options);
      return localTimeString
    } else {
      const hours = key == '1' ? date.getUTCHours() : date.getHours();
      const minutes = key == '1' ? date.getUTCMinutes() : date.getMinutes();
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      return formattedTime;
    }
  }

  const layoverTime = (arrivalTime, departureTime) => {
    const arrivalDate = new Date(arrivalTime);
    const departureDate = new Date(departureTime);
    const durationInMillis = departureDate - arrivalDate;
    const durationInMinutes = Math.floor(durationInMillis / 60000);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    let formattedDuration = "";
    if (hours > 0) {
      formattedDuration += `${hours} hrs`;
    }
    if (minutes > 0) {
      if (formattedDuration) {
        formattedDuration += ' and ';
      }
      formattedDuration += `${minutes} mins`;
    }

    return formattedDuration
  }

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(/[\s\-]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <div>
        <div className='2xl:container 2xl:mx-auto p-5'>
          {flightsDetails?.length > 0 && flightsDetails[0]?.departure ? (
            <div className='m-2'>
              <h1 className='text-xl font-bold'>{`Flights form ${flightsDetails[0]?.departure?.city} to ${flightsDetails[0]?.arrival?.city} `}</h1>
            </div>
          ) : (
            <></>
          )}
          <div className='relative p-3 my-2'>
            {flightsDetails?.length > 0 && flightsDetails[0]?.departure ? (
              <>
              </>
            ) : (
              <>
                <div className='absolute right-[10.75rem] top-2 -z-10 bg-red-500 w-[5%] p-7 rotate-[35deg]'></div>
                <div className='w-[13%] absolute right-[29px] top-[-9px] z-20 shadow-[rgba(0,_0,_0,_0.20)_0px_14px_28px,_rgba(0,_0,_0,_0.20)_0px_10px_10px]'>
                  <div className='bg-red-600 w-auto p-3 '>
                    <p className='text-white font-bold text-xl'>Special Memories</p>
                  </div>
                </div>
              </>
            )}

            <div className=' card bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.25)_0px_14px_28px,_rgba(0,_0,_0,_0.22)_0px_10px_10px] transition-all duration-300  hover:shadow-lg'>

              {flightsDetails && flightsDetails.map((flight, index) => {
                return (
                  <div className='mt-2' key={index + 1}>
                    <div className='grid grid-cols-3 items-center gap-'>

                      <div className='flex flex-col items-center'>
                        <span>
                          <img src={flight?.flightsImage ? `${spechialFlightImage}${flight?.flightsImage}` : `${spechialFlightImage}${flight?.airlineLogo}`} alt='arrival-flight' className="w-32 h-auto" />
                        </span>
                        <div className='mt-2'>
                          <p className="font-bold">{flight?.flightsFrom ? flight?.flightsFrom : flight?.departure?.city} {flight?.fromAirportCode ? `(${flight?.fromAirportCode})` : `(${flight?.departure?.airport})`}</p>
                        </div>
                      </div>

                      <div className='relative'>
                        <div className='w-[10%] relative right-14 top-14'>
                          <p>{flight?.departureTime ? flight?.departureTime : extractTimeFromTimestamp(flight?.departure?.time, '1')}</p>
                          <p className='flex justify-end'>{flight?.fromAirportCode ? `(${flight?.fromAirportCode})` : `(${flight?.departure?.airport})`}</p>
                        </div>

                        <div className='flex justify-center text-gray-500 font-bold text-lg'>
                          {flight?.totalTime ? flight?.totalTime : convertTime(flight?.duration)}
                        </div>

                        <div className='absolute w-full flex justify-around items-center top-1/1.5 left-1/2 transform -translate-x-1/2 -translate-y-[70%]'>
                          {flight?.hold_details && flight.hold_details?.length > 0 && (
                            flight.hold_details.map((detail, index) => {
                              return (
                                <div key={index + "index"} className='relative group'>
                                  <p className='text-[70px] cursor-pointer'>.</p>
                                  <div className='absolute hidden w-[200px] h-[auto] shadow-[rgba(0,_0,_0,_0.25)_0px_14px_28px,_rgba(0,_0,_0,_0.22)_0px_10px_10px] group-hover:block bg-white border border-gray-300 p-2 -right-28 rounded-md -top-14'>
                                    <div className='font-bold mb-1'>{detail?.city} {`(${detail?.airport})`}</div>
                                    <div className='w-full bg-gray-200 h-1'></div>
                                    <div className='w-full'>Arrival time:- {extractTimeFromTimestamp(detail?.arrival_time, '0')}</div>
                                    <div className='w-full'>Departure time:- {extractTimeFromTimestamp(detail?.departure_time, '0')}</div>
                                    <div className='w-full'>{layoverTime(detail?.arrival_time, detail?.departure_time)} Layover</div>
                                  </div>
                                </div>
                              )
                            })
                          )}
                        </div>

                        <div className="relative h-px my-1 bg-gray-800 after:content-[''] after:absolute after:right-0 after:top-[-4px] after:w-0 after:h-0 after:border-solid after:border-[4px_0_4.4px_8px] after:border-r-transparent after:border-b-transparent w-full after:border-l-[#3e3f40]"></div>

                        <div className='flex justify-center font-mono text-lg text-blue-500'>
                          {flight?.hold ? toTitleCase(flight?.hold) : "Direct"}
                        </div>

                        <div className='w-[10%] relative left-[100%] bottom-14 ms-1'>
                          <p>{flight?.arrivalTime ? flight?.arrivalTime : extractTimeFromTimestamp(flight?.arrival?.time, '1')}</p>
                          <p className='flex justify-start'>{flight?.toAirportCode ? `(${flight?.toAirportCode})` : `(${flight?.arrival?.airport})`}</p>
                        </div>
                      </div>

                      <div className='flex flex-col items-center'>
                        <span>
                          <img src={flight?.flightsImage ? `${spechialFlightImage}${flight?.flightsImage}` : `${spechialFlightImage}${flight?.airlineLogo}`} alt='arrival-flight' className="w-32 h-auto" />
                        </span>
                        <div className='mt-2'>
                          <p className="font-bold">{flight?.flightsTo ? flight?.flightsTo : flight?.arrival?.city} {flight?.toAirportCode ? `(${flight?.toAirportCode})` : `(${flight?.arrival?.airport})`}</p>
                        </div>
                      </div>

                    </div>

                    <div className=" flex items-center flex-row-reverse pr-6 pb-6 gap-5 ">
                      <p
                        className='w-auto bg-red-400 hover:bg-red-500 text-white font-semibold text-sm p-3 rounded-lg cursor-pointer'
                        onClick={() => handleBookPage(flight?._id, flight?.arrival ? 1 : 0)}
                      > BOOK NOW
                      </p>
                      <div className='font-bold text-lg'>
                        {flight?.departure && flight?.class_details?.[classDetail] ? (
                          <span>₹{flight?.class_details?.[classDetail]?.prices?.adult}</span>
                        ) : (
                          <div>₹2000</div>
                        )}
                      </div>
                    </div>
                    {index !== flightsData?.length - 1 &&
                      <div className='border m-2'></div>
                    }
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopSearchFlights