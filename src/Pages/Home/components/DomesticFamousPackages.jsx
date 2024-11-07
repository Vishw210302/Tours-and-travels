import React, { useEffect, useState } from 'react';
import { useGetPackagesQuery } from '../../../Api/Api';
import { ToastContainer, toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Destinations = () => {
    const [domesticPackage, setDomesticPackage] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [favorites, setFavorites] = useState(new Set());
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
            const domesticData = data?.data.filter(item => item.categories === "domestic");

            const minimumSlides = 3;
            let repeatedData = [...domesticData];
            while (repeatedData.length < minimumSlides) {
                repeatedData = [...repeatedData, ...domesticData]
            }

            setDomesticPackage(repeatedData);
        } else if (isError) {
            toast.error('Something went wrong', { autoClose: 3000 });
            console.log('international package error:', error);
        }
    }, [data, isSuccess, isError, error]);

    const interNationalImageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/packages-Image/`;

    const toggleFavorite = (id) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return newFavorites;
        });
    };

    const handleParticularItenry = (packageId) => {
        navigate(`itenary/${packageId}`)
    }

    if (isLoading) {
        return (
            <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="2xl:container 2xl:mx-auto px-5 py-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <div className="h-[300px] w-full bg-gray-200 animate-pulse"></div>
                                <div className="p-4">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="2xl:container 2xl:mx-auto px-5 py-3">
                <div className="text-center mb-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-gradient-x"></div>
                    <div className="relative">
                        <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                            Explore The India
                        </span>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            Domestic Destinations
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover breathtaking destinations around the globe. Each journey is crafted to create unforgettable memories.
                        </p>
                    </div>
                </div>

                <div className="relative px-12">
                    <Swiper
                        modules={[Navigation, Autoplay, EffectCoverflow]}
                        spaceBetween={30}
                        slidesPerView={1}
                        effect="coverflow"
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next',
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        loop={true}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        className="pb-12"
                    >
                        {domesticPackage.map((destination, index) => (
                            <SwiperSlide key={`${destination._id}-${index}`}>
                                <div className="group relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-[450px] bg-white">

                                    <div className="relative h-[60%] overflow-hidden">
                                        <img
                                            src={`${interNationalImageUrl}${destination.packageImage}`}
                                            alt={destination.packageName}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

                                        <button
                                            onClick={() => toggleFavorite(destination._id)}
                                            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-transform duration-300 hover:scale-110"
                                        >
                                            <Heart
                                                className={`w-5 h-5 ${favorites.has(destination._id)
                                                    ? 'fill-red-500 text-red-500'
                                                    : 'text-gray-600'
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    <div className="p-6 h-[40%]">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {destination.packageName}
                                        </h3>


                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span className="text-sm">Premium Locations</span>
                                            </div>

                                        </div>

                                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">

                                            <button onClick={() => handleParticularItenry(destination._id)} className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg transform transition-all duration-300 hover:scale-105">
                                                View More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Enhanced Navigation Buttons */}
                    <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center group hover:bg-blue-50 transition-all duration-300">
                        <ChevronLeft className="w-6 h-6 text-gray-800 group-hover:text-blue-600" />
                    </button>
                    <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center group hover:bg-blue-50 transition-all duration-300">
                        <ChevronRight className="w-6 h-6 text-gray-800 group-hover:text-blue-600" />
                    </button>
                </div>
            </div>

            <ToastContainer position="top-right" />

            <style jsx global>{`
                .swiper-button-next::after,
                .swiper-button-prev::after {
                    display: none;
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
            `}</style>
        </div>
    );
};

export default Destinations;