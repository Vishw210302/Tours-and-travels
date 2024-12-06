import { ArrowRight, Calendar, Heart, MapPin, Users } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllApiContext } from "../../../Context/allApiContext";

const TravelPackageCard = ({ isLoading, data }) => {

    const imageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/itenary-package/`;
    const navigate = useNavigate();
    const { favorites, toggleFavorite } = useAllApiContext();
    
    const handleItineraryDetails = useCallback((itineraryId) => {
        navigate(`/itenary-details/${itineraryId}`);
    }, [navigate]);

    const truncateText = useCallback((text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    }, []);    

    const handleToggleFavorite = (e, id, item) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(id, item);
    }

    const EmptyState = useMemo(() => (
        <div className="w-full max-w-4xl mx-auto p-8">
            <div className="flex flex-col items-center justify-center h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg backdrop-blur-sm">
                <MapPin className="w-20 h-20 text-red-400 mb-6 animate-bounce" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Packages Found</h3>
                <p className="text-gray-600 text-lg">Try adjusting your search criteria</p>
                <div className="mt-8">
                    <button className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105">
                        Explore Other Destinations
                    </button>
                </div>
            </div>
        </div>
    ), []);

    if (!isLoading && (!data?.itenaries || data.itenaries.length === 0)) {
        return EmptyState;
    }

    const PackageCard = ({ item, index }) => {
        return (
            <div key={`${item?._id}-${index}`} className="card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 my-2 flex flex-col hover:shadow-2xl">
                <div className="relative flex-1">

                    <div className="w-full h-[40%]">
                        <img
                            src={`${imageUrl}${item?.bannerImage}`}
                            alt={item?.packageTitle}
                            className="h-[220px] w-full rounded-tl-lg rounded-tr-lg object-cover"
                            loading="lazy"
                        />
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                        <button
                            onClick={(e) => handleToggleFavorite(e, item?._id, item)}
                            className="h-fit p-2 bg-white rounded-full shadow-lg hover:shadow-xl"
                            aria-label={favorites?.has(item?._id) ? "Remove from favorites" : "Add to favorites"}
                        >
                            <Heart

                                className={`
                                    transition-colors duration-300 h-fit
                                     ${favorites.has(item?._id)
                                        ? 'fill-red-500 text-red-500'
                                        : 'text-gray-600'
                                    }`
                                }
                            />
                        </button>
                    </div>

                    <div className="absolute top-[82%]">
                        <div className="bg-red-500 px-3 py-1 rounded-[9px] ml-2">
                            <p className="text-white font-semibold capitalize">
                                {item?.categories}
                            </p>
                        </div>
                    </div>

                </div>

                <div className="p-2 flex flex-col flex-grow">
                    <h2 className="text-xl mb-2 font-bold text-red-500">
                        {item?.packageTitle}
                    </h2>
                    <p className="text-base font-normal text-gray-600">
                        {truncateText(item?.smallDescription, 120)}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 border-y border-gray-100">

                    <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                        <div className="p-2 bg-red-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-red-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg text-red-500 font-semibold">Duration</span>
                            <span className="font-semibold text-gray-800">{item?.days?.length} days</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg text-red-500 font-semibold">Price</span>
                            <span className="font-semibold text-gray-800">₹ {item?.perPersonCost?.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Departure Dates:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {item?.departureDates?.map((date, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-md p-3 text-center hover:bg-gray-200 transition-colors"
                            >
                                <p className="text-gray-700 font-medium">
                                    {new Date(date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-3">
                    <button
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center group"
                        onClick={() => {
                            handleItineraryDetails(item?._id)
                        }}
                    >
                        <span className="mr-2">View Details</span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>

            </div>
        )
    };

    return (
        <div className="w-full mx-auto bg-gradient-to-br from-gray-50 to-white min-h-screen rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data?.itenaries?.map((item, index) => {
                    return (
                        <PackageCard
                            key={item?._id}
                            item={item}
                            index={index}
                        />
                    )
                })}
            </div>
        </div>
    );

};

export default TravelPackageCard;