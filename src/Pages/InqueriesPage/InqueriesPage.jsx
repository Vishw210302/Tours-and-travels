import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const InqueriesPage = () => {
    const [openInqueryModal, setOpenInqueryModal] = useState(false);

    const handleInqueryModalOpen = () => {
        setOpenInqueryModal(true);
    };

    const handleInqueryModalClose = () => {
        setOpenInqueryModal(false);
    };

    return (
        <>
            <div className='card bg-[#f1f1f1] shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg sticky bottom-0 p-3'>
                <div className='flex justify-between items-center 2xl:container 2xl:mx-auto'>
                    <div>
                        <p className='text-[18px] font-semibold'>From ₹2,999 / person</p>
                    </div>
                    <button className=' bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300' onClick={handleInqueryModalOpen}>
                        Send Inquery
                    </button>
                </div>
            </div>
            <Modal
                open={openInqueryModal}
                onClose={handleInqueryModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}>
                    <Box sx={{
                        position: 'relative',
                        width: '30%',
                        bgcolor: 'white',
                        boxShadow: 24,
                        borderRadius: 1,
                    }}>
                        <CloseIcon
                            onClick={handleInqueryModalClose}
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                cursor: 'pointer',
                                color: '#ef4444',
                            }}
                        />
                        <div className='border rounded-lg shadow-md p-4 bg-white'>
                            <div className='p-3 border-b-2'>
                                <p className='font-semibold text-lg text-gray-800'>Dubai Tour Pricing Inquiry</p>
                            </div>
                            <div className='p-4'>
                                <div className='mb-4'>
                                    <label className='block text-sm font-medium text-gray-700' htmlFor='name'>
                                        Full Name
                                    </label>
                                    <input
                                        type='text'
                                        id='name'
                                        className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ef4444]'
                                        placeholder='Enter your full name'
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label className='block text-sm font-medium text-gray-700' htmlFor='email'>
                                        Email Address
                                    </label>
                                    <input
                                        type='email'
                                        id='email'
                                        className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ef4444]'
                                        placeholder='Enter your email address'
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label className='block text-sm font-medium text-gray-700' htmlFor='dates'>
                                        Travel Dates
                                    </label>
                                    <input
                                        type='date'
                                        id='dates'
                                        className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ef4444]'
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label className='block text-sm font-medium text-gray-700' htmlFor='adults'>
                                        Number of Adults (Price per person: $500)
                                    </label>
                                    <select
                                        id='adults'
                                        className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ef4444]'
                                    >
                                        <option value='1'>1 Adult</option>
                                        <option value='2'>2 Adults</option>
                                        <option value='3'>3 Adults</option>
                                        <option value='4'>4 Adults</option>
                                        <option value='5'>5 Adults</option>
                                    </select>
                                </div>

                                <div className='mb-4'>
                                    <label className='block text-sm font-medium text-gray-700' htmlFor='children-with-bed'>
                                        Number of Children (With Bed) (Price per child: $300)
                                    </label>
                                    <select
                                        id='children-with-bed'
                                        className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ef4444]'
                                    >
                                        <option value='0'>0 Children</option>
                                        <option value='1'>1 Child</option>
                                        <option value='2'>2 Children</option>
                                        <option value='3'>3 Children</option>
                                    </select>
                                </div>

                                <div className='mb-4'>
                                    <label className='block text-sm font-medium text-gray-700' htmlFor='children-without-bed'>
                                        Number of Children (Without Bed) (Price per child: $200)
                                    </label>
                                    <select
                                        id='children-without-bed'
                                        className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ef4444]'
                                    >
                                        <option value='0'>0 Children</option>
                                        <option value='1'>1 Child</option>
                                        <option value='2'>2 Children</option>
                                        <option value='3'>3 Children</option>
                                    </select>
                                </div>

                                <div className='text-right'>
                                    <button
                                        type='submit'
                                        className='bg-[#ef4444] text-white py-2 px-4 rounded-md hover:bg-[#dc2626] transition duration-300'
                                    >
                                        Submit Inquiry
                                    </button>
                                </div>
                            </div>
                        </div>

                    </Box>
                </Box>
            </Modal >
        </>
    )
}

export default InqueriesPage