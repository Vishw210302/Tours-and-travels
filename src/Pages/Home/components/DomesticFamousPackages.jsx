import React from 'react';
import { default as articleImage2, default as featuredImage1 } from "../../../assets/bg-img2.jpg";
import articleImage1 from "../../../assets/people-travels3.jpg";

const ArrowLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const TravelBlogComponent = () => {

    return (
        <div className="2xl:container 2xl:mx-auto p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                    <div className='h-[100%]'>
                        <img src={featuredImage1} alt='slider-image' className='h-full' />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={articleImage1} alt="Article 1" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">Article</span>
                                <span className="text-gray-500 text-sm">September 9, 2022</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">9 Ways to Become a Successful Travel Blogger</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Travel blogging is a crowded field — and it gets more crowded day by day. And a lot of the advice that people give are actually counterintuitive to...
                            </p>
                            <button className="text-cyan-600 hover:text-cyan-800 transition-colors duration-300">
                                Read More ➜
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={articleImage2} alt="Article 2" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">Article</span>
                                <span className="text-gray-500 text-sm">September 11, 2022</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">The Ultimate Packing List For Female Travelers</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                It can be daunting trying to figure out what to pack for a week, a month, or a year abroad without much — or any — prior experience in the place you want...
                            </p>
                            <button className="text-cyan-600 hover:text-cyan-800 transition-colors duration-300">
                                Read More ➜
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelBlogComponent;