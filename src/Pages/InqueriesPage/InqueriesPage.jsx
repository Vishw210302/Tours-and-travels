import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useInqueriesPostMutation } from '../../Api/Api';
import PlaneLoader from '../PlaneLoader';

const InqueriesPage = ({ itenaryPriceData, itenatyDataListing }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [priceDetails, setPriceDetails] = useState(null);
    const [numberOfAdults, setNumberOfAdults] = useState(1);
    const [openInqueryModal, setOpenInqueryModal] = useState(false);
    const [numberOfChildrenWithBed, setNumberOfChildrenWithBed] = useState(0);
    const [numberOfChildrenWithoutBed, setNumberOfChildrenWithoutBed] = useState(0);
    const [departureDate, setDepartureDate] = useState('');
    const [inqueriesPost, { isLoading, isSuccess }] = useInqueriesPostMutation();

    const handleInqueryModalOpen = () => {
        setOpenInqueryModal(true);
    };

    const handleInqueryModalClose = () => {
        setOpenInqueryModal(false);
        setPriceDetails(null);
    };

    const calculatePriceDetails = () => {
        const pricePerAdult = itenaryPriceData?.perPersonPrice;
        const pricePerChildWithBed = itenaryPriceData?.childWithBed;
        const pricePerChildWithoutBed = itenaryPriceData?.childWithoutBed;
        const adultTotal = numberOfAdults * pricePerAdult;
        const childrenWithBedTotal = numberOfChildrenWithBed * pricePerChildWithBed;
        const childrenWithoutBedTotal = numberOfChildrenWithoutBed * pricePerChildWithoutBed;
        const subtotal = adultTotal + childrenWithBedTotal + childrenWithoutBedTotal;
        const gst = subtotal * 0.05;
        const tcs = subtotal * 0.05;
        const total = subtotal + gst + tcs;

        setPriceDetails({
            subtotal,
            gst,
            tcs,
            total,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        calculatePriceDetails();
        const formData = {
            customerName: name,
            mobileNumber: mobile,
            customerEmail: email,
            packageName: itenatyDataListing?.packageTitle,
            travelDate: [departureDate],
            numberOfAdult: [numberOfAdults.toString()],
            numberOfChildWithBed: [numberOfChildrenWithBed.toString()],
            numberOfChildWithoutBed: [numberOfChildrenWithoutBed.toString()],
        };

        try {
            await inqueriesPost(formData).unwrap();
            toast.success("Inquery sent successfully");
            if (isSuccess) {
                setName('');
                setEmail('');
                setMobile('');
                setNumberOfAdults(1);
                setNumberOfChildrenWithBed(0);
                setNumberOfChildrenWithoutBed(0);
                setDepartureDate('');
            }
        } catch (error) {
            toast.error("Please fill all required field")
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDateSelect = (selectedDate) => {
        setDepartureDate(selectedDate);
    };

    return (
        <>
            <div className='card bg-[#f1f1f1] shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg sticky z-10 bottom-0 p-3'>

                <div className='flex justify-between items-center 2xl:container 2xl:mx-auto'>
                    <div>
                        <p className='text-[18px] font-semibold'>From {itenaryPriceData?.perPersonPrice} ₹ / person</p>
                    </div>
                    <button
                        className='bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300'
                        onClick={handleInqueryModalOpen}
                    >
                        Send Inquiry
                    </button>
                </div>

            </div>
            <Modal
                open={openInqueryModal}
                onClose={handleInqueryModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}>
                    <Box
                        sx={{
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
                            <div className='p-2 border-b-2 flex flex-1 items-center gap-2'>
                                <p className='text-base font-semibold text-red-500'>{itenatyDataListing?.packageTitle}</p>
                                <p className='text-sm font-semibold text-gray-500'>Tour Pricing Inquiry</p>
                            </div>
                            <div className='p-4'>
                                <form onSubmit={handleSubmit}>

                                    <div className='mb-4'>
                                        <label className='block text-sm font-medium text-gray-700' htmlFor='name'>
                                            Full Name
                                        </label>
                                        <input
                                            type='text'
                                            id='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300'
                                            placeholder='Enter your full name'
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <label className='block text-sm font-medium text-gray-700' htmlFor='mobile'>
                                            Mobile Number
                                        </label>
                                        <input
                                            type='tel'
                                            id='mobile'
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300'
                                            placeholder='Enter your mobile number'
                                            pattern='[0-9]*'
                                            inputMode='numeric'
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <label className='block text-sm font-medium text-gray-700' htmlFor='email'>
                                            Email Address
                                        </label>
                                        <input
                                            type='email'
                                            id='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300'
                                            placeholder='Enter your email address'
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <label className='block text-sm font-medium text-gray-700'>
                                            Departure Dates
                                        </label>
                                        <select
                                            id='departureDates'
                                            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300'
                                            onChange={(e) => handleDateSelect(e.target.value)}
                                        >
                                            <option value="">Select a date</option>
                                            {itenatyDataListing?.departureDates && itenatyDataListing.departureDates.map((departureDate, index) => {
                                                const formattedDate = formatDate(departureDate);
                                                return (
                                                    <option key={index} value={departureDate}>
                                                        {formattedDate}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <div className='mb-4'>
                                        <label className='block text-sm font-medium text-gray-700' htmlFor='adults'>
                                            Number of Adults
                                        </label>
                                        <input
                                            type='number'
                                            id='adults'
                                            value={numberOfAdults}
                                            min={1}
                                            onChange={(e) => setNumberOfAdults(e.target.value)}
                                            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300'
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <label className='block text-sm font-medium text-gray-700' htmlFor='childrenWithBed'>
                                            Number of Children with Bed
                                        </label>
                                        <input
                                            type='number'
                                            id='childrenWithBed'
                                            value={numberOfChildrenWithBed}
                                            min={0}
                                            onChange={(e) => setNumberOfChildrenWithBed(e.target.value)}
                                            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300'
                                        />
                                    </div>

                                    <div className='mb-4'>
                                        <label className='block text-sm font-medium text-gray-700' htmlFor='childrenWithoutBed'>
                                            Number of Children without Bed
                                        </label>
                                        <input
                                            type='number'
                                            id='childrenWithoutBed'
                                            value={numberOfChildrenWithoutBed}
                                            min={0}
                                            onChange={(e) => setNumberOfChildrenWithoutBed(e.target.value)}
                                            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300'
                                        />
                                    </div>

                                    {priceDetails && (
                                        <div className='grid grid-cols-4 gap-4 my-4'>
                                            <div className='flex flex-col items-start'>
                                                <p className='text-red-400 font-semibold text-[16px]'>Total Price :-</p>
                                                <p className='text-black font-semibold text-[15px]'>₹{priceDetails?.subtotal.toFixed(2)}</p>
                                            </div>
                                            <div className='flex flex-col items-start'>
                                                <p className='text-red-400 font-semibold text-[16px]'>GST (5%):-</p>
                                                <p className='text-black font-semibold text-[15px]'>₹{priceDetails?.gst.toFixed(2)}</p>
                                            </div>
                                            <div className='flex flex-col items-start'>
                                                <p className='text-red-400 font-semibold text-[16px]'>TCS (5%):-</p>
                                                <p className='text-black font-semibold text-[15px]'>₹{priceDetails?.tcs.toFixed(2)}</p>
                                            </div>
                                            <div className='flex flex-col items-start'>
                                                <p className='text-red-400 font-semibold text-[16px]'>Final Price :-</p>
                                                <p className='text-black font-semibold text-[15px]'>₹{priceDetails?.total.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type='submit'
                                        className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300'
                                        disabled={isLoading}
                                    >
                                        {isLoading ?
                                            <PlaneLoader />
                                            : 'Submit Inquiry'
                                        }
                                    </button>

                                </form>
                            </div>
                        </div>
                    </Box>
                </Box>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default InqueriesPage;