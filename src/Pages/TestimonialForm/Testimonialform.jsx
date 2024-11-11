import React, { useState } from 'react';
import { useTestimonialReviewPostMutation } from '../../Api/Api';

const TestimonialForm = () => {
    const [testimonialPost, { isLoading, isSuccess, isError }] = useTestimonialReviewPostMutation();
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
            const result = await testimonialPost(testimonialData).unwrap();
            setReviewPersonName('');
            setReviewDescription('');
            setRating(1);
        } catch (error) {
            console.error('Error submitting testimonial:', error);
        }
    };

    return (
        <div className="card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2">
            <div className="flex flex-1 justify-center">
                <p className="text-red-400 text-xl font-bold">Give Us Your Review</p>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name :</label>
                    <input
                        type="text"
                        id="name"
                        value={reviewPersonName}
                        onChange={(e) => setReviewPersonName(e.target.value)}
                        required
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
                        required
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

                <button
                    type="submit"
                    className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Submit Testimonial'}
                </button>

                {isSuccess && <p className="text-green-500 mt-2">Testimonial submitted successfully!</p>}
                {isError && <p className="text-red-500 mt-2">Error submitting testimonial. Please try again.</p>}
            </form>
        </div>
    );
};

export default TestimonialForm;
