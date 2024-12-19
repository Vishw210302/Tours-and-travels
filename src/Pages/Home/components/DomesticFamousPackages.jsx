import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetPackagesQuery } from '../../../Api/Api';

const LoadingSkeleton = () => (
    <div className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="relative h-[500px] rounded-2xl overflow-hidden bg-gray-800">
                        <div className="h-full w-full bg-gray-700 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="h-4 w-3/4 bg-gray-600 rounded animate-pulse mb-4"></div>
                            <div className="h-4 w-1/2 bg-gray-600 rounded animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const Destinations = () => {

    const [domesticPackage, setDomesticPackage] = useState([]);
    const navigate = useNavigate();

    const {
        data,
        isSuccess,
        isError,
        error,
        isLoading
    } = useGetPackagesQuery();

    const interNationalImageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/packages-Image/`;

    useEffect(() => {
        if (isSuccess) {
            const domesticData = data?.data.filter(item => item.categories === "domestic");

            const minimumSlides = 3;
            let repeatedData = [...domesticData];
            while (repeatedData.length < minimumSlides) {
                repeatedData = [...repeatedData, ...domesticData];
            }

            setDomesticPackage(repeatedData);
        } else if (isError) {
            toast.error('Failed to load destinations', { autoClose: 3000 });
        }
    }, [data, isSuccess, isError, error]);

    const handleParticularItenry = (packageId) => {
        navigate(`itenary/${packageId}`);
    };

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div
            className="bg-[url('/src/assets/bg-image.png')] bg-cover bg-center"
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <p className='font-bold text-[30px] text-red-500'>Domestic Destination</p>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Navigation, Autoplay, EffectFade, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        navigation={{
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next',
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="pb-12"
                    >
                        {domesticPackage.map((destination, index) => (
                            <SwiperSlide key={`${destination._id}-${index}`}>
                                <div className="group relative h-[500px] rounded-2xl overflow-hidden transition-all duration-700 hover:scale-105">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 transition-opacity group-hover:opacity-90 z-10" />

                                    <img
                                        src={`${interNationalImageUrl}${destination?.packageImage}`}
                                        alt={destination.packageName}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-transform duration-500">
                                        <div className="space-y-4">

                                            <h3 className="text-2xl font-bold text-white">
                                                {destination.packageName}
                                            </h3>

                                            <button
                                                onClick={() => handleParticularItenry(destination._id)}
                                                className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2"
                                            >
                                                Explore Destination
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button className="swiper-button-prev absolute right-10 bottom-[100%] -translate-y-1/2 -translate-x-4 z-30 w-9 h-9 bg-red-400 rounded-full flex items-center justify-center group hover:bg-red-500 transition-all duration-300">
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button className="swiper-button-next absolute right-0 bottom-[100%] -translate-y-1/2 translate-x-4 z-30 w-9 h-9 bg-red-400 rounded-full flex items-center justify-center group hover:bg-red-500 transition-all duration-300">
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>

            <ToastContainer position="top-right" />

            <style jsx global>
                {`
                .swiper-button-next::after,
                .swiper-button-prev::after {
                  display: none;
                }
                    
                .swiper-pagination-bullet {
                  background: white !important;
                  opacity: 0.5;
                }
                    
                .swiper-pagination-bullet-active {
                  opacity: 1;
                  background: #ef4444 !important;
                }
                    
                @keyframes gradient-x {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                    
                .animate-gradient-x {
                  background-size: 200% 200%;
                  animation: gradient-x 15s ease infinite;
                }
                    
                @keyframes pulse {
                  0%, 100% { opacity: 1; }
                  50% { opacity: .5; }
                }
                    
                .animate-pulse {
                  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                `}
            </style>
        </div>
    );
};

export default Destinations;