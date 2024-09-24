import React from 'react'
import flightsImage from "../../assets/brand.png"

const TopSearchFlights = () => {
  return (
    <>
      <div>
        <div className='2xl:container 2xl:mx-auto p-5'>
          <div className='m-2'>
            <h1 className='text-xl font-bold'>Top Search Flights</h1>
          </div>
          <div className='card bg-white rounded-xl shadow-[rgba(0,_0,_0,_0.25)_0px_14px_28px,_rgba(0,_0,_0,_0.22)_0px_10px_10px] transition-all duration-300 hover:shadow-lg p-3 my-2'>

            <div className='mt-2'>
              <div className='grid grid-cols-3 items-center gap-4'>

                <div className='flex flex-col items-center'>
                  <span>
                    <img src={flightsImage} alt='departure-flight' className="w-32 h-auto" />
                  </span>
                  <div className='mt-2'>
                    <p className="font-bold">Ahmedabad (AMD)</p>
                  </div>
                </div>

                <div>
                  <div className='w-[10%] relative right-14 top-14'>
                    <p>7:55am</p>
                    <p className='flex justify-end'>JFK</p>
                  </div>
                  <div className='flex justify-center text-gray-500 font-bold text-lg'>6h 50m</div>
                  <div className="relative h-px my-1 bg-gray-800 after:content-[''] after:absolute after:right-0 after:top-[-4px] after:w-0 after:h-0 after:border-solid after:border-[4px_0_4.4px_8px] after:border-r-transparent after:border-b-transparent w-full after:border-l-[#3e3f40]"></div>
                  <div className='flex justify-center font-mono text-lg text-blue-500'>Direct</div>
                  <div className='w-[10%] relative left-[100%] bottom-14 ms-1'>
                    <p>7:55am</p>
                    <p className='flex justify-start'>JFK</p>
                  </div>
                </div>

                <div className='flex flex-col items-center'>
                  <span>
                    <img src={flightsImage} alt='arrival-flight' className="w-32 h-auto" />
                  </span>
                  <div className='mt-2'>
                    <p className="font-bold">Dubai (DXB)</p>
                  </div>
                </div>

              </div>
            </div>

            <div className='border m-2'></div>

            <div className='mt-2'>
              <div className='grid grid-cols-3 items-center gap-4'>

                <div className='flex flex-col items-center'>
                  <span>
                    <img src={flightsImage} alt='departure-flight' className="w-32 h-auto" />
                  </span>
                  <div className='mt-2'>
                    <p className="font-bold">Dubai (DXB)</p>
                  </div>
                </div>

                <div>
                  <div className='w-[10%] relative right-14 top-14'>
                    <p>7:55am</p>
                    <p className='flex justify-end'>JFK</p>
                  </div>
                  <div className='flex justify-center text-gray-500 font-bold text-lg'>6h 50m</div>
                  <div className="relative h-px my-1 bg-gray-800 after:content-[''] after:absolute after:right-0 after:top-[-4px] after:w-0 after:h-0 after:border-solid after:border-[4px_0_4.4px_8px] after:border-r-transparent after:border-b-transparent w-full after:border-l-[#3e3f40]"></div>
                  <div className='flex justify-center font-mono text-lg text-blue-500'>Direct</div>
                  <div className='w-[10%] relative left-[100%] bottom-14 ms-1'>
                    <p>7:55am</p>
                    <p className='flex justify-start'>JFK</p>
                  </div>
                </div>

                <div className='flex flex-col items-center'>
                  <span>
                    <img src={flightsImage} alt='arrival-flight' className="w-32 h-auto" />
                  </span>
                  <div className='mt-2'>
                    <p className="font-bold">Ahmedabad (AMD)</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default TopSearchFlights