import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContactUsPostMutation } from '../../../Api/Api';

const ContactusForm = () => {

    const [contactUsPost, { isLoading }] = useContactUsPostMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        message: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await contactUsPost(formData).unwrap();
            toast.success('Form submitted successfully!', { autoClose: 3000 });
            setFormData({ name: '', email: '', mobileNumber: '', message: '' });
        } catch (error) {
            toast.error('Please fill contact us form.', { autoClose: 3000 });
        }
    };

    const renderInputField = (id, label, type = "text", placeholder) => (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={formData[id]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline focus:border-red-400"
                placeholder={placeholder}
            />
        </div>
    );

    return (
        <>
            <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2 w-[95%] h-fit'>
                <div className="2xl:container 2xl:mx-auto p-5">
                    <p className="text-xl font-bold text-center text-red-400 mb-6">
                        Love to hear from you, Get in touch
                    </p>
                    <form onSubmit={handleSubmit}>
                        {renderInputField('name', 'Name')}
                        {renderInputField('email', 'Email', 'email', 'Your Email')}
                        {renderInputField('mobileNumber', 'Mobile Number', 'tel', 'Your Mobile Number')}
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
                        </div>
                    </form>
                    <ToastContainer
                        position="top-right"
                        className="toast-container"
                        draggable="true"
                    />
                </div>
            </div>
        </>
    );
};

export default ContactusForm;