import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useContactUsHotelPostMutation } from '../../Api/Api';

const GetInTouchHotelBooking = () => {

    const [contactUsHotelPost, { isLoading }] = useContactUsHotelPostMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        message: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await contactUsHotelPost(formData).unwrap();

            setFormData({ name: '', email: '', mobileNumber: '', message: '' });

            toast.success("Message sent successfully!", {
                position: "top-right",
                className: "toast-success",
            });
        } catch (error) {
            console.error('Failed to submit form:', error);
            toast.error("Please fill out all fields in the form.", {
                position: "top-right",
                className: "toast-error",
            });
        }
    };

    return (
        <>
            <div className="relative bg-gray-100 py-16 overflow-hidden">
                <div className="absolute inset-0 bg-white transform rotate-6 rounded-lg shadow-lg z-0"></div>
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-300 rounded-full opacity-50 z-0"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-300 rounded-full opacity-50 z-0"></div>

                <div className="relative max-w-4xl mx-auto text-center px-4 z-10">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Get In Touch</h2>
                    <p className="text-lg text-gray-500 font-medium mb-8">
                        We are dedicated to making your hotel booking experience seamless and enjoyable. Reach out to us for any inquiries, and we’ll be happy to assist!
                    </p>

                    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto border border-gray-300 z-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {['name', 'email', 'mobileNumber', 'message'].map((field, index) => (
                                <div key={field}>
                                    <label className='w-fit flex flex-1 justify-start'>{`Your ${field.charAt(0).toUpperCase() + field.slice(1)}:`}</label>
                                    {field !== 'message' ? (
                                        <input
                                            type={field === 'email' ? 'email' : field === 'mobileNumber' ? 'tel' : 'text'}
                                            id={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            placeholder={`Enter Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none transition duration-200"
                                        />
                                    ) : (
                                        <textarea
                                            id={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            placeholder="Enter Your Message"
                                            rows="4"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none transition duration-200"
                                        ></textarea>
                                    )}
                                </div>
                            ))}

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-3 px-6 text-white ${isLoading ? 'bg-gray-500' : 'bg-gradient-to-r from-red-500 to-blue-500 hover:bg-gradient-to-l'} rounded-lg font-semibold transition duration-300`}
                                >
                                    {isLoading ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" className="toast-container" />
        </>
    );
};

export default GetInTouchHotelBooking;