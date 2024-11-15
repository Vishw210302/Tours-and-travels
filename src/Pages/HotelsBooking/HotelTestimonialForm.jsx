import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTestimonialHotelReviewPostMutation } from "../../Api/Api";

const HotelTestimonialForm = () => {

    const [testimonialHotelPost] = useTestimonialHotelReviewPostMutation();
    const [reviewPersonName, setReviewPersonName] = useState("");
    const [reviewDescription, setReviewDescription] = useState("");
    const [numberOfReview, setRating] = useState(1);
    const [status] = useState("Inactive");

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!reviewPersonName.trim() || !reviewDescription.trim()) {
            toast.error("Please fill in all required fields.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            return;
        }

        const testimonialHotelData = {
            reviewPersonName,
            reviewDescription,
            status,
            numberOfReview,
        };

        try {

            await testimonialHotelPost(testimonialHotelData).unwrap();
            toast.success("Review sent successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            setReviewPersonName("");
            setReviewDescription("");
            setRating(1);

        } catch (error) {
            toast.error("Error submitting review. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2">
                <div className="flex flex-1 justify-center">
                    <p className="text-red-400 text-xl font-bold">Give us your hotel review</p>
                </div>
                <form className="p-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                            Your Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={reviewPersonName}
                            onChange={(e) => setReviewPersonName(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                            Your Review:
                        </label>
                        <textarea
                            id="description"
                            value={reviewDescription}
                            onChange={(e) => setReviewDescription(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Write your review"
                            rows="4"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-medium text-gray-700">Rating:</label>
                        <div className="grid grid-cols-5 gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => {
                                return (
                                    <label key={star} className="relative">
                                        <input
                                            type="radio"
                                            value={star}
                                            checked={numberOfReview === star}
                                            onChange={() => setRating(star)}
                                            className="hidden"
                                        />
                                        <span
                                            className={`cursor-pointer text-4xl ${star <= numberOfReview ? "text-yellow-400" : "text-gray-300"
                                                }`}
                                        >
                                            ★
                                        </span>
                                    </label>
                                )
                            })}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300"
                    >
                        Submit Review
                    </button>
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
        </div>
    );
};

export default HotelTestimonialForm;