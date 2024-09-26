import React from 'react'
import flightsImage from "../../assets/brand.png"
import { div } from 'three/webgpu'

const TopSearchFlights = ({ flightsData, error }) => {

  const spechialFlightImage = "http://192.168.1.45:7781/uploads/special-flight-image/"

  if (flightsData.length > 0) {
    console.log(flightsData, 'flightsDataflightsData')
  }

  function convertTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${parseInt(hours)}h ${parseInt(minutes)}m`;
  }

  function extractTimeFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
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
          <div className='m-2'>
            <h1 className='text-xl font-bold'>Top Search Flights</h1>
          </div>

          <div className='card bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.25)_0px_14px_28px,_rgba(0,_0,_0,_0.22)_0px_10px_10px] transition-all duration-300 hover:shadow-lg p-3 my-2'>
            {error ? (
              <div className='h-28 flex justify-center items-center text-2xl font-bold'> No Flight Found </div>
            ) : (
              flightsData && flightsData.map((flight, index) => (
                <div className='mt-2' key={index}>
                  <div className='grid grid-cols-3 items-center gap-4'>

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
                        <p>{flight?.departureTime ? flight?.departureTime : extractTimeFromTimestamp(flight?.departure?.time)}</p>
                        <p className='flex justify-end'>{flight?.fromAirportCode ? `(${flight?.fromAirportCode})` : `(${flight?.departure?.airport})`}</p>
                      </div>

                      <div className='flex justify-center text-gray-500 font-bold text-lg'>
                        {flight?.totalTime ? flight?.totalTime : convertTime(flight?.duration)}
                      </div>

                      {/* Dots positioned above the line */}
                      <div className='absolute w-full flex justify-around items-center top-1/1.5 left-1/2 transform -translate-x-1/2 -translate-y-[70%]'>
                        <p className='text-[70px] cursor-pointer'>.</p>
                        <p className='text-[70px] cursor-pointer'>.</p> 
                        
                      </div>

                      <div className="relative h-px my-1 bg-gray-800 after:content-[''] after:absolute after:right-0 after:top-[-4px] after:w-0 after:h-0 after:border-solid after:border-[4px_0_4.4px_8px] after:border-r-transparent after:border-b-transparent w-full after:border-l-[#3e3f40]"></div>

                      <div className='flex justify-center font-mono text-lg text-blue-500'>
                        {flight?.hold ? toTitleCase(flight?.hold) : "Direct"}
                      </div>

                      <div className='w-[10%] relative left-[100%] bottom-14 ms-1'>
                        <p>{flight?.arrivalTime ? flight?.arrivalTime : extractTimeFromTimestamp(flight?.arrival?.time)}</p>
                        <p className='flex justify-start'>{flight?.fromAirportCode ? `(${flight?.fromAirportCode})` : `(${flight?.departure?.airport})`}</p>
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
                  {index !== flightsData.length - 1 && <div className='border m-2'></div>}
                </div>
              ))
            )}
          </div>
        </div >
      </div >
    </>
  )
}

export default TopSearchFlights