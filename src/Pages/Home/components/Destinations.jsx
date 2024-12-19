import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetPackagesQuery } from '../../../Api/Api';

const Destinations = () => {

    const [internationalPackage, setInternationalPackage] = useState([]);
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
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-40 right-20 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl"></div>
            </div>

            <div className="relative py-5 bg-[url('/src/assets/bg-image2.png')] bg-cover bg-center">
                <div className="text-center mb-5 px-4">
                    <div className="text-center mb-2">
                        <p className='font-bold text-[30px] text-red-500'>international Destination</p>
                    </div>
                </div>

                <div className="relative 2xl:container 2xl:mx-auto px-4 sm:px-6 lg:px-8">
                    <Swiper
                        modules={[Navigation, Autoplay, EffectCoverflow]}
                        spaceBetween={40}
                        slidesPerView={3}
                        effect="coverflow"
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: '.swiper-button-prevs',
                            nextEl: '.swiper-button-nexts',
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        loop={true}
                        className="pb-8"
                    >
                        {internationalPackage && internationalPackage.map((destination, index) => (
                            <SwiperSlide key={`${destination._id}-${index}`}>
                                <div className="group relative h-[550px] bg-[#16213e] rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                                    <div className="relative h-[60%] overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#16213e] via-transparent to-transparent z-10"></div>
                                        <img
                                            src={`${interNationalImageUrl}${destination.packageImage}`}
                                            alt={destination.packageName}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    <div className="relative p-6 h-[40%]">
                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors">
                                            {destination.packageName}
                                        </h3>
                                        <button
                                            onClick={() => handleParticularItenry(destination._id)}
                                            className="absolute bottom-6 left-6 right-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0"
                                        >
                                            Explore Now
                                        </button>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button
                        className="swiper-button-prevs absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-1/2 w-12 h-12 bg-[#16213e]/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center group hover:bg-teal-400/20 transition-all duration-300"
                    >
                        <ChevronLeft className="w-6 h-6 text-white group-hover:text-teal-400" />
                    </button>

                    <button
                        className="swiper-button-nexts absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-1/2 w-12 h-12 bg-[#16213e]/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center group hover:bg-teal-400/20 transition-all duration-300"
                    >
                        <ChevronRight className="w-6 h-6 text-white group-hover:text-teal-400" />
                    </button>
                </div>
            </div>

            <ToastContainer position="top-right" />

            <style jsx global>{`
                .swiper-button-next::after,
                .swiper-button-prev::after {
                    display: none;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: .5; }
                }

                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .swiper-slide {
                    transition: all 0.5s ease-out;
                }
                
                .swiper-slide-active {
                    transform: scale(1.05);
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