import React, { useState } from 'react';
import { CgCalendarDates } from "react-icons/cg";
import { FaPerson } from "react-icons/fa6";
import { MdOutlineLogin } from "react-icons/md";

const FourthStepsBookingHotel = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: '',
        idProof: null
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, idProof: e.target.files[0] });
        if (errors.idProof) {
            setErrors({ ...errors, idProof: '' });
        }
    };

    const validate = () => {
        let formErrors = {};

        if (!formData.firstName) {
            formErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName) {
            formErrors.lastName = 'Last Name is required';
        }
        if (!formData.email) {
            formErrors.email = 'Email Address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email Address is invalid';
        }
        if (!formData.phone) {
            formErrors.phone = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            formErrors.phone = 'Phone Number is invalid';
        }
        if (!formData.idProof) {
            formErrors.idProof = 'ID Proof is required';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form data:', formData);
            alert('Booking Confirmed');

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                specialRequests: '',
                idProof: null
            });
            setErrors({});
        }
    };

    return (
        <>
            <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 w-[95%] h-fit'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row items-center gap-4'>

                        <div className='flex flex-row items-center gap-3'>
                            <MdOutlineLogin size={25} color='#3cb7ff' />
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Check In</p>
                                <p className='text-gray-600 text-sm font-semibold'>22/01/2025</p>
                            </div>
                        </div>

                        <div className='flex flex-row items-center gap-3'>
                            <MdOutlineLogin size={25} color='#3cb7ff' />
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Check Out</p>
                                <p className='text-gray-600 text-sm font-semibold'>23/01/2025</p>
                            </div>
                        </div>

                        <div className='flex flex-row items-center gap-3'>
                            <CgCalendarDates size={25} color='#3cb7ff' />
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Night</p>
                                <p className='text-gray-600 text-sm font-semibold'>1</p>
                            </div>
                        </div>

                        <div className='flex flex-row items-center gap-3'>
                            <FaPerson size={25} color='#3cb7ff' />
                            <div className='border-r border-gray-500 pr-3'>
                                <p className='text-black text-sm font-semibold'>Adult</p>
                                <p className='text-gray-600 text-sm font-semibold'>1</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 w-[95%] h-fit'>
                <div>
                    <p className='text-2xl font-semibold text-gray-500 mb-4'>Billing Information</p>

                    <form onSubmit={handleSubmit}>

                        <div className='flex flex-row gap-2 items-center'>

                            <div className="mb-4 w-[100%]">
                                <div className='flex flex-row gap-1'>
                                    <label className="block text-base font-medium text-gray-500 h-fit">First Name :-</label>
                                    <span className='text-red-500 text-2xl h-fit font-semibold'>*</span>
                                </div>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${errors.firstName ? 'border-red-500' : ''}`}
                                    placeholder="Enter your first name"
                                />
                                {errors.firstName && <p className="text-red-500 text-md font-normal">{errors.firstName}</p>}
                            </div>

                            <div className="mb-4 w-[100%]">
                                <div className='flex flex-row gap-1'>
                                    <label className="block text-base font-medium text-gray-700">Last Name</label>
                                    <span className='text-red-500 text-2xl h-fit font-semibold'>*</span>
                                </div>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${errors.lastName ? 'border-red-500' : ''}`}
                                    placeholder="Enter your last name"
                                />
                                {errors.lastName && <p className="text-red-500 text-md font-normal">{errors.lastName}</p>}
                            </div>

                        </div>

                        <div className='flex flex-row gap-2 items-center'>

                            <div className="mb-4 w-[100%]">
                                <div className='flex flex-row gap-1'>
                                    <label className="block text-base font-medium text-gray-700">Email Address</label>
                                    <span className='text-red-500 text-2xl h-fit font-semibold'>*</span>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500 text-md font-normal">{errors.email}</p>}
                            </div>

                            <div className="mb-4 w-[100%]">
                                <div className='flex flex-row gap-1'>
                                    <label className="block text-base font-medium text-gray-700">Phone Number</label>
                                    <span className='text-red-500 text-2xl h-fit font-semibold'>*</span>
                                </div>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${errors.phone ? 'border-red-500' : ''}`}
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && <p className="text-red-500 text-md font-normal">{errors.phone}</p>}
                            </div>

                        </div>

                        <div className='flex flex-row gap-2 items-center'>

                            <div className="mb-4 w-[100%]">
                                <label className="block text-base font-medium text-gray-700">Special Requests</label>
                                <textarea
                                    name="specialRequests"
                                    value={formData.specialRequests}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    rows="3"
                                    placeholder="Add any special requests"
                                ></textarea>
                            </div>

                            <div className="mb-4 w-[100%]">
                                <div className='flex flex-row gap-1'>
                                    <label className="block text-base font-medium text-gray-700">
                                        Upload Documents (ID Proof)
                                        <span className='text-red-500 text-2xl h-fit font-semibold'>*</span>
                                        <p className="text-sm text-gray-500 mb-2">
                                            Please upload a valid ID proof for security purposes. Accepted formats: PDF, JPG, PNG.
                                        </p>
                                    </label>
                                </div>

                                <input
                                    type="file"
                                    name="idProof"
                                    onChange={handleFileChange}
                                    className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${errors.idProof ? 'border-red-500' : ''}`}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                                {errors.idProof && <p className="text-red-500 text-md font-normal">{errors.idProof}</p>}
                            </div>

                        </div>

                        <div className='flex flex-row justify-center'>
                            <button
                                type="submit"
                                className="bg-red-400 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-500 transition duration-200"
                            >
                                Confirm Booking ( ₹ 5000)
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default FourthStepsBookingHotel;