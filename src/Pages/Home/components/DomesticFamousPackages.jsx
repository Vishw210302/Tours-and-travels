import React, { useState } from 'react';
import image1 from "../../../assets/bg-img2.jpg";
import image2 from "../../../assets/contactUs.jpg";

const DomesticFamousPackages = () => {
    const images = [image1, image2, image1]; // Your images array
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextImage = () => {
        if (isAnimating) return; // Prevent clicking while animating
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setTimeout(() => setIsAnimating(false), 500); // Duration of the transition
    };

    const prevImage = () => {
        if (isAnimating) return; // Prevent clicking while animating
        setIsAnimating(true);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        setTimeout(() => setIsAnimating(false), 500); // Duration of the transition
    };

    return (
        <div>
            <div className='2xl:container 2xl:mx-auto p-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 h-full'>
                    <div className="relative w-full overflow-hidden rounded-xl">
                        <div
                            className={`flex transition-transform duration-500 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`,
                                width: `${images.length * 100}%`,
                            }}
                        >
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`slider-${index}`}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ))}
                        </div>
                        <div className="absolute top-0 left-0 h-full w-1/2 bg-black opacity-60">
                            <div className="relative top-[5%] left-[5%]">
                                <div className="bg-red-500 w-fit rounded-xl">
                                    <p className="text-white p-2">Vishw Prajapati</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2"
                        >
                            Prev
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2"
                        >
                            Next
                        </button>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg my-2 h-full flex flex-col'>
                            <div className=''>
                                <img src={image1} alt='image' className='w-full h-auto object-cover rounded-tr-xl rounded-tl-xl' />
                            </div>
                            <div className='p-2'>
                                <p className='text-gray-500'>September 9, 2022</p>
                                <p className='text-black font-bold text-xl mt-1'>9 Ways to Become a Successful Travel Blogger</p>
                                <p className='text-black font-medium text-sm mt-1'>Travel blogging is a crowded field — and it gets more crowded day by day. And a lot of the advice that people give are actually counterintuitive to...</p>
                            </div>
                            <div className='p-2'>
                                <button className='bg-red-400 w-[100%] hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300'>
                                    View More
                                </button>
                            </div>
                        </div>
                        <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg my-2 h-full flex flex-col'>
                            <div className=''>
                                <img src={image1} alt='image' className='w-full h-auto object-cover rounded-tr-xl rounded-tl-xl' />
                            </div>
                            <div className='p-2'>
                                <p className='text-gray-500'>September 9, 2022</p>
                                <p className='text-black font-bold text-xl mt-1'>9 Ways to Become a Successful Travel Blogger</p>
                                <p className='text-black font-medium text-sm mt-1'>Travel blogging is a crowded field — and it gets more crowded day by day. And a lot of the advice that people give are actually counterintuitive to...</p>
                            </div>
                            <div className='p-2'>
                                <button className='bg-red-400 w-[100%] hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300'>
                                    View More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DomesticFamousPackages;
