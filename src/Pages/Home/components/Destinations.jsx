import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useGetPackagesQuery } from '../../../Api/Api';

const Destinations = () => {

    const [internationalPackage, setInternationalPackage] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [slideDirection, setSlideDirection] = useState('right');
    const interNationalImageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/packages-Image/`;
    const navigate = useNavigate();

    const {
        data,
        isSuccess,
        isError,
        error,
        isLoading
    } = useGetPackagesQuery();

    useEffect(() => {
        if (isSuccess) {
            const internationalData = data?.data.filter(item => item.categories === "international");
            const minimumSlides = 3;
            let repeatedData = [...internationalData];
            while (repeatedData.length < minimumSlides) {
                repeatedData = [...repeatedData, ...internationalData];
            }
            setInternationalPackage(repeatedData);
        } else if (isError) {
            toast.error('Something went wrong', { autoClose: 3000 });
        }
    }, [data, isSuccess, isError, error]);

    const handleParticularItenry = (packageId) => {
        navigate(`itenary/${packageId}`);
    };

    const nextSlide = () => {
        if (!isAnimating) {
            setSlideDirection('right');
            setIsAnimating(true);
            setCurrentSlide((prev) =>
                prev === internationalPackage.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevSlide = () => {
        if (!isAnimating) {
            setSlideDirection('left');
            setIsAnimating(true);
            setCurrentSlide((prev) =>
                prev === 0 ? internationalPackage.length - 1 : prev - 1
            );
        }
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [currentSlide, internationalPackage.length]);

    const getVisibleSlides = () => {
        const slides = [];
        if (internationalPackage.length === 0) return slides;

        for (let i = -1; i <= 1; i++) {
            let index = currentSlide + i;
            if (index < 0) index = internationalPackage.length - 1;
            if (index >= internationalPackage.length) index = 0;
            slides.push({ ...internationalPackage[index], position: i });
        }
        return slides;
    };

    useEffect(() => {
        if (isAnimating) {
            const timeout = setTimeout(() => setIsAnimating(false), 600);
            return () => clearTimeout(timeout);
        }
    }, [isAnimating]);

    if (isLoading) {
        return (
            <div className="bg-[#1a1a2e] py-16">
                <div className="2xl:container 2xl:mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i + "keys"} className="bg-[#16213e] rounded-3xl overflow-hidden shadow-2xl">
                                <div className="h-[300px] w-full bg-[#1f3163] animate-pulse"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-6 w-3/4 bg-[#1f3163] rounded-full animate-pulse"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-1/2 bg-[#1f3163] rounded-full animate-pulse"></div>
                                        <div className="h-4 w-2/3 bg-[#1f3163] rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="relative py-5 bg-[url('/src/assets/bg-image2.png')] bg-cover bg-center">
                <div className="text-center mb-5 px-4">
                    <div className="text-center mb-2">
                        <p className="w-full font-bold text-[18px] sm:text-[26px] text-red-500">International Destination</p>
                    </div>
                </div>

                <div className="relative 2xl:container 2xl:mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative h-[600px] overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {getVisibleSlides().map((slide, index) => (
                                <div
                                    key={`${slide._id}-${index}`}
                                    className={`absolute w-full max-w-lg transition-all duration-500 ease-out ${isAnimating ? `slide-animation-${slideDirection}` : ''
                                        }`}
                                    style={{
                                        transform: `translateX(${slide.position * 100}%) scale(${slide.position === 0 ? 1 : 0.8
                                            })`,
                                        opacity: slide.position === 0 ? 1 : 0.5,
                                        zIndex: slide.position === 0 ? 2 : 1,
                                    }}
                                >
                                    <div className="group relative h-[550px] bg-[#16213e] rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                                        <div className="relative h-[60%] overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#16213e] via-transparent to-transparent z-10"></div>
                                            <img
                                                src={`${interNationalImageUrl}${slide.packageImage}`}
                                                alt={slide.packageName}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500"></div>
                                        </div>

                                        <div className="relative p-6 h-[40%]">
                                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors transform group-hover:translate-x-2 duration-300">
                                                {slide.packageName}
                                            </h3>
                                            <button
                                                onClick={() => handleParticularItenry(slide._id)}
                                                className="absolute bottom-6 left-6 right-6 py-3 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 animate-button"
                                            >
                                                Explore Destination
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-red-400 rounded-full shadow-lg flex items-center justify-center group hover:bg-red-500 transition-all duration-300 animate-slide-left"
                        >
                            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-red-400 rounded-full shadow-lg flex items-center justify-center group hover:bg-red-500 transition-all duration-300 animate-slide-right"
                        >
                            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    <div className="flex justify-center gap-2">
                        {internationalPackage.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-red-500 w-6 animate-pulse' : 'bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" />

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes float-delay {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.1); }
                }

                @keyframes title {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes button {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-2px); }
                    100% { transform: translateY(0); }
                }

                @keyframes slide-animation-right {
                    0% { transform: translateX(100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }

                @keyframes slide-animation-left {
                    0% { transform: translateX(-100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }

                @keyframes slide-in {
                    0% { transform: translateX(20px); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-float-delay {
                    animation: float-delay 5s ease-in-out infinite;
                    animation-delay: 1s;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }

                .animate-title {
                    animation: title 0.8s ease-out;
                }

                .animate-button {
                    animation: button 2s ease-in-out infinite;
                }

                .animate-slide-left {
                    animation: slide-in 0.5s ease-out;
                }

                .animate-slide-right {
                    animation: slide-in 0.5s ease-out;
                    animation-delay: 0.2s;
                }

                .slide-animation-right {
                    animation: slide-animation-right 0.6s ease-out;
                }

                .slide-animation-left {
                    animation: slide-animation-left 0.6s ease-out;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: .5; }
                }

                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                /* Custom Scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #1a1a2e;
                }

                ::-webkit-scrollbar-thumb {
                    background: #2a2a4e;
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: #3a3a6e;
                }
            `}</style>
        </div>
    );
};

export default Destinations;