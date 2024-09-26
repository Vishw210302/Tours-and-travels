import React, { useState } from 'react'
import { useContactUsPostMutation } from '../../../Api/Api';


const ContactusForm = () => {

    const [contactUsPost, { isLoading, isSuccess, isError }] = useContactUsPostMutation();

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
            const result = await contactUsPost(formData).unwrap();
            if (isSuccess) {
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
                console.log('Form submitted successfully:', result);
            }
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };

    return (
        <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2 w-[95%] h-fit'>
            <div className="2xl:container 2xl:mx-auto p-5">
                <div className="">
                    <p className="text-xl font-bold text-center text-red-400 mb-6">
                        Love to hear from you, Get in touch
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline focus:border-red-400"
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline focus:border-red-400"
                                placeholder="Your Email"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                id="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline focus:border-red-400"
                                placeholder="Your Mobile Number"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline focus:border-red-400"
                                placeholder="Your Message"
                            ></textarea>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-red-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </button>
                            {isSuccess && <p className="text-green-500 mt-2">Message sent successfully!</p>}
                            {isError && <p className="text-red-500 mt-2">Failed to send message.</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactusForm