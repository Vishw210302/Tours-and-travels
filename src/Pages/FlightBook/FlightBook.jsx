import React from 'react';

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

    return (
        <>
            <div className='bg-[#f7f7f7]'>
                <div className="w-full h-[500px] flex flex-col justify-center items-center bg-[url('https://webimages.ajaymoditravels.com/amtuploads/websiteimages/631155998855.png')] bg-cover bg-center relative"></div>
                <div className="container mx-auto px-4 py-8">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-10 my-2 h-fit">
                            <h2 className="text-2xl font-semibold mb-4">Trip Summary</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Selected Departure Flight</h3>
                                    <p className="text-xl font-semibold">New Delhi (DEL) → Ahmedabad (AMD)</p>
                                    <p className="text-sm text-gray-600">Thu, 3 Oct 2024 | 04:45 - 06:15 | Direct</p>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <img className="w-16 h-16" src="/api/placeholder/64/64" alt="IndiGo logo" />
                                    <div>
                                        <p className="font-medium">IndiGo</p>
                                        <p className="text-sm text-gray-600">6E5119 | Economy</p>
                                    </div>
                                </div>

                                <div style={{ margin: 0, }}>
                                    <div className='grid grid-cols-3 items-center gap-'>

                                        <div className='flex flex-col items-center'>
                                            <span>
                                                <img src='err' alt='arrival-flight' className="w-32 h-auto" />
                                            </span>
                                            <div className='mt-2'>
                                                <p className="font-bold">Ahmedabad</p>
                                            </div>
                                        </div>

                                        <div className='relative'>
                                            <div className='w-[10%] relative right-14 top-14'>
                                                <p>05:55</p>
                                                <p className='flex justify-end'>AMD</p>
                                            </div>

                                            <div className='flex justify-center text-gray-500 font-bold text-lg'>
                                                5 Hours
                                            </div>

                                            <div className='absolute w-full flex justify-around items-center top-1/1.5 left-1/2 transform -translate-x-1/2 -translate-y-[70%]'>


                                                <div className='relative group'>
                                                    <p className='text-[70px] cursor-pointer'>.</p>

                                                    <div className='absolute hidden w-[200px] h-[auto] shadow-[rgba(0,_0,_0,_0.25)_0px_14px_28px,_rgba(0,_0,_0,_0.22)_0px_10px_10px] group-hover:block bg-white border border-gray-300 p-2 -right-28 rounded-md -top-14'>
                                                        <div className='font-bold mb-1'>Vishhwew</div>
                                                        <div className='w-full bg-gray-200 h-1'></div>
                                                        <div className='w-full'>Arrival time:- 122</div>
                                                        <div className='w-full'>Departure time:- 122</div>
                                                        <div className='w-full'>Layover</div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="relative h-px my-1 bg-gray-800 after:content-[''] after:absolute after:right-0 after:top-[-4px] after:w-0 after:h-0 after:border-solid after:border-[4px_0_4.4px_8px] after:border-r-transparent after:border-b-transparent w-full after:border-l-[#3e3f40]"></div>

                                            <div className='flex justify-center font-mono text-lg text-blue-500'>
                                                Direct
                                            </div>

                                            <div className='w-[10%] relative left-[100%] bottom-14 ms-1'>
                                                <p>08:55</p>
                                                <p className='flex justify-start'>DEL</p>
                                            </div>
                                        </div>

                                        <div className='flex flex-col items-center'>
                                            <span>
                                                <img src='Err' alt='arrival-flight' className="w-32 h-auto" />
                                            </span>
                                            <div className='mt-2'>
                                                <p className="font-bold">DEL</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 text-gray-600">
                                    <ClockIcon />
                                    <span>Duration: 1h 25m</span>
                                </div>

                                <div className="bg-[#f7f7f7] rounded-lg p-4 flex items-center space-x-2">
                                    <ClockIcon />
                                    <span className="text-sm">Layover: 0h 35m in Udaipur (UDR) Udaipur Airport</span>
                                </div>

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

                        <div className="card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-10 my-2 h-fit">
                            <h2 className="text-2xl font-semibold mb-4">Price Details</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Adult</p>
                                        <p className="text-sm text-gray-600">per person</p>
                                    </div>
                                    <p className="text-lg font-semibold">₹2000</p>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium">Total Price</p>
                                        <p className="text-xl font-bold text-blue-600">₹2000</p>
                                    </div>
                                </div>
                            </div>
                            <button className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
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