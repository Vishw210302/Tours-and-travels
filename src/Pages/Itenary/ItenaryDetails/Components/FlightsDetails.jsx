import React from 'react'

const FlightsDetails = () => {
    return (
        <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'>

            <div>
                <p className='text-lg font-semibold text-red-400 mb-2'>Flights Details</p>
            </div>

            <div className='bg-[#146656] p-3 rounded-lg mb-3'>
                <div>
                    <p className='text-white font-bold text-base'>Return</p>
                </div>
                <div className='grid grid-cols-3 gap-4 w-full mt-2'>
                    <div>
                        <p className='text-[15px] font-semibold text-white'>Ahmedabad</p>
                        <p className='text-[12px] font-semibold text-white'>Airport (AMD)</p>
                        <p className='text-[12px] font-semibold text-white'>18:40</p>
                    </div>
                    <div className="relative  mt-2 mx-3 mb-2 flight_duration flex items-center">
                        <span className="absolute left-0 top-[20px] h-3 border-t border-gray-400 w-[100%]"></span>
                        <div>
                            <span className="absolute left-0 top-[15px] w-3 h-3 rounded-full border border-gray-400 bg-white"></span>
                            <span className='absolute left-[-5px] top-[25px] w-3 h-3 text-white font-bold text-xs'>AMD</span>
                        </div>
                        <div>
                            <span className="absolute right-0 top-[15px] w-3 h-3 rounded-full border border-gray-400 bg-white"></span>
                            <span className='absolute right-[5px] top-[25px] w-3 h-3 text-white font-bold text-xs'>SIN</span>
                        </div>
                    </div>
                    <div>
                        <p className='text-[15px] font-semibold text-white'>Singapore</p>
                        <p className='text-[12px] font-semibold text-white'>Airport (SIN)</p>
                        <p className='text-[12px] font-semibold text-white'>21:50</p>
                    </div>
                </div>
            </div>

            <div className='bg-[#146656] p-3 rounded-lg mb-3'>
                <div>
                    <p className='text-white font-bold text-base'>Return</p>
                </div>
                <div className='grid grid-cols-3 gap-4 w-full mt-2'>
                    <div>
                        <p className='text-[15px] font-semibold text-white'>Singapore</p>
                        <p className='text-[12px] font-semibold text-white'>Airport (SIN)</p>
                        <p className='text-[12px] font-semibold text-white'>18:40</p>
                    </div>
                    <div className="relative  mt-2 mx-3 mb-2 flight_duration flex items-center">
                        <span className="absolute left-0 top-[20px] h-3 border-t border-gray-400 w-[100%]"></span>
                        <div>
                            <span className="absolute left-0 top-[15px] w-3 h-3 rounded-full border border-gray-400 bg-white"></span>
                            <span className='absolute left-[-5px] top-[25px] w-3 h-3 text-white font-bold text-xs'>AMD</span>
                        </div>
                        <div>
                            <span className="absolute right-0 top-[15px] w-3 h-3 rounded-full border border-gray-400 bg-white"></span>
                            <span className='absolute right-[5px] top-[25px] w-3 h-3 text-white font-bold text-xs'>SIN</span>
                        </div>
                    </div>
                    <div>
                        <p className='text-[15px] font-semibold text-white'>Ahmedabad</p>
                        <p className='text-[12px] font-semibold text-white'>Airport (AMD)</p>
                        <p className='text-[12px] font-semibold text-white'>21:50</p>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default FlightsDetails