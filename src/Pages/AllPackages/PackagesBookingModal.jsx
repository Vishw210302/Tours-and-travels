import Modal from '@mui/material/Modal';
import React, { useState } from 'react';

const PackagesBookingModal = ({ bookingModalOpen, setBookingModalOpen, allData, openStraipeModel }) => {

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        departureDate: '',
        adults: 0,
        childrenWithBed: 0,
        childrenWithoutBed: 0,
        infants: 0,
        percentageSelection: '0',
    });

    const calculateTotalPrice = () => {
        const { adults, childrenWithBed, childrenWithoutBed, infants, percentageSelection } = formData;
        const pricing = allData?.itenaryData?.price || {};

        const totalAdults = adults * (pricing.perPersonPrice || 0);
        const totalChildWithBed = childrenWithBed * (pricing.childWithBed || 0);
        const totalChildWithoutBed = childrenWithoutBed * (pricing.childWithoutBed || 0);
        const totalInfants = infants * (pricing.costPerInfont || 0);
        const subtotal = totalAdults + totalChildWithBed + totalChildWithoutBed + totalInfants;

        const gst = subtotal * 0.05;
        const tcs = subtotal * 0.05;
        const final = subtotal + gst + tcs;

        const percentageAmount = final * (parseFloat(percentageSelection) / 100);

        return {
            subtotal,
            gst,
            tcs,
            final: subtotal + gst + tcs,
            percentageAmount,
            percentageSelection
        };
    };

    const handleClosePackageBookingModalClose = () => {
        setBookingModalOpen(false);
        setFormData({
            name: '',
            mobile: '',
            email: '',
            departureDate: '',
            adults: 0,
            childrenWithBed: 0,
            childrenWithoutBed: 0,
            infants: 0,
            percentageSelection: '0',
        });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClosePackageBookingModalClose();
    };

    const formatPrice = (price) => {
        const roundedPrice = Math.floor(price);
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };


    const prices = calculateTotalPrice();
    const handleBookItenry = () => {

        const payPrice = prices.percentageSelection === '0' ? prices.final : Math.floor(prices.percentageAmount);
        
        const itenryData = {
            formData,
            payPrice,
            remainingBalance: Math.floor(prices.final - prices.percentageAmount) 
        }
        handleClosePackageBookingModalClose();
        openStraipeModel(itenryData)  
    }

    return (
        <Modal
            open={bookingModalOpen}
            onClose={() => {
                handleClosePackageBookingModalClose()
            }}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className="flex justify-center h-full items-center p-4">
                <div className="border rounded-lg shadow-md p-4 bg-white max-h-full overflow-y-auto">

                    <div className="p-3 border-b-2 flex flex-1 items-center gap-2">
                        <p className="font-semibold text-lg text-red-500">{allData?.itenaryData?.packageTitle}</p>
                        <p>Booking Form</p>
                    </div>

                    <div className="p-4">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="mobile">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    placeholder="Enter your mobile number"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Departure Dates</label>
                                <select
                                    id="departureDate"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    value={formData.departureDate}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a date</option>
                                    {allData?.itenaryData?.departureDates?.map((date, index) => {
                                        return (
                                            <option key={index + "date"} value={date}>
                                                {new Date(date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="adults">
                                    Number of Adults
                                </label>
                                <input
                                    type="number"
                                    id="adults"
                                    value={formData.adults}
                                    min={1}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Price per adult: {formatPrice(allData?.itenaryData?.price?.perPersonPrice || 0)}
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="childrenWithBed">
                                    Number of Children with Bed (Age 5-11)
                                </label>
                                <input
                                    type="number"
                                    id="childrenWithBed"
                                    value={formData.childrenWithBed}
                                    min={0}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Price per child with bed: {formatPrice(allData?.itenaryData?.price?.childWithBed || 0)}
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="childrenWithoutBed">
                                    Number of Children without Bed (Age 2-4)
                                </label>
                                <input
                                    type="number"
                                    id="childrenWithoutBed"
                                    value={formData.childrenWithoutBed}
                                    min={0}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Price per child without bed: {formatPrice(allData?.itenaryData?.price?.childWithoutBed || 0)}
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="infants">
                                    Number of Infants (Age 0-2)
                                </label>
                                <input
                                    type="number"
                                    id="infants"
                                    value={formData.infants}
                                    min={0}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Price per infant: {formatPrice(allData?.itenaryData?.price?.costPerInfont || 0)}
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="percentageSelection">
                                    Partial Payment Percentage
                                </label>
                                <select
                                    id="percentageSelection"
                                    value={formData.percentageSelection}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    <option value="0">Full Payment (100%)</option>
                                    <option value="10">Partial Payment (10%)</option>
                                    <option value="20">Partial Payment (20%)</option>
                                    <option value="50">Partial Payment (50%)</option>
                                </select>
                                {prices.percentageSelection !== '0' && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        Partial Payment Amount: {formatPrice(prices.percentageAmount)}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-4 gap-4 my-4">
                                <div className="flex flex-col items-start">
                                    <p className="text-red-400 font-semibold text-[16px]">Total Price :-</p>
                                    <p className="text-black font-semibold text-[15px]">{formatPrice(prices.subtotal)}</p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <p className="text-red-400 font-semibold text-[16px]">GST 5% :-</p>
                                    <p className="text-black font-semibold text-[15px]">{formatPrice(prices.gst)}</p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <p className="text-red-400 font-semibold text-[16px]">TCS 5% :-</p>
                                    <p className="text-black font-semibold text-[15px]">{formatPrice(prices.tcs)}</p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <p className="text-red-400 font-semibold text-[16px]">Final Price :-</p>
                                    <p className="text-black font-semibold text-[15px]">{formatPrice(prices.final)}</p>
                                </div>
                            </div>

                            {/* Updated pricing section to show partial payment amount */}
                            {prices.percentageSelection !== '0' && (
                                <div className="mb-4 bg-blue-50 p-3 rounded-md">
                                    <p className="text-blue-600 font-semibold">
                                        Partial Payment Details
                                    </p>
                                    <div className="flex justify-between mt-2">
                                        <span>Partial Payment Percentage:</span>
                                        <span className="font-bold">{prices.percentageSelection}%</span>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                        <span>Partial Payment Amount:</span>
                                        <span className="font-bold text-green-600">
                                            {formatPrice(prices.percentageAmount)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                        <span>Remaining Balance:</span>
                                        <span className="font-bold text-red-600">
                                            {formatPrice(prices.final - prices.percentageAmount)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex justify-between">
                                <button
                                    type="button"
                                    className="px-8 py-2 rounded-lg bg-red-400 text-white font-semibold hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    onClick={() => handleBookItenry()}
                                >
                                    Book Now
                                </button>
                                <button
                                    onClick={() => {
                                        handleClosePackageBookingModalClose()
                                    }}
                                    className="px-8 py-2 rounded-lg bg-blue-400 text-white font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    Cancel
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PackagesBookingModal;