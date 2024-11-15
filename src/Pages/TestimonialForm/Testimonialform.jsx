import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTestimonialReviewPostMutation } from '../../Api/Api';

const TestimonialForm = () => {

    const [testimonialPost, { isLoading }] = useTestimonialReviewPostMutation();
    const [reviewPersonName, setReviewPersonName] = useState('');
    const [reviewDescription, setReviewDescription] = useState('');
    const [numberOfReview, setRating] = useState(1);
    const [status] = useState('Inactive');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const testimonialData = {
            reviewPersonName,
            reviewDescription,
            status,
            numberOfReview,
        };

        try {
            await testimonialPost(testimonialData).unwrap();
            toast.success('Form submitted successfully!');
            setReviewPersonName('');
            setReviewDescription('');
            setRating(1);
        } catch (error) {
            toast.error('Please fill testimonial form.');
        }
    };

    return (
        <>
            <div className="card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2">
                <div className="flex flex-1 justify-center">
                    <p className="text-red-500 text-xl font-bold border-b-2 border-red-400">Give Us Your Review</p>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name :</label>
                        <input
                            type="text"
                            id="name"
                            value={reviewPersonName}
                            onChange={(e) => setReviewPersonName(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ef4444]"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Your Review :</label>
                        <textarea
                            id="description"
                            value={reviewDescription}
                            onChange={(e) => setReviewDescription(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ef4444]"
                            placeholder="Write your review"
                            rows="4"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Rating :</label>
                        <div className="grid grid-cols-5 gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <label key={star} className="relative">
                                    <input
                                        type="radio"
                                        value={star}
                                        checked={numberOfReview === star}
                                        onChange={() => setRating(star)}
                                        className="hidden"
                                    />
                                    <span
                                        className={`cursor-pointer text-[40px] ${star <= numberOfReview ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >
                                        ★
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Submit Testimonial'}
                        </button>
                    </div>
                </form>
            </div>
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

export default TestimonialForm;