import { Heart, MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllItenariesQuery } from '../../Api/Api';
import BannerImage from "../../assets/waterEffect.png";
import NoDataFound from '../NoDataFound';
import RippleEffect from '../RippleEffects/RippleEffect';
import { useAllApiContext } from '../../Context/allApiContext';

const InternationalPackages = () => {

    const { isError, error, data, isSuccess } = useGetAllItenariesQuery('international');
    const navigate = useNavigate();
    const [internationalPackagesListing, setInternationalPackagesListing] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPackages, setFilteredPackages] = useState([]);
    const imageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/itenary-package/`;
    const { favorites, toggleFavorite } = useAllApiContext();

    useEffect(() => {
        if (isSuccess) {
            setInternationalPackagesListing(data?.data);
            setFilteredPackages(data?.data);
        }
        if (isError) {
            console.log("error", error);
        }
    }, [isSuccess, data, isError]);

    useEffect(() => {
        const filtered = internationalPackagesListing.filter((packageItem) =>
            packageItem?.packageTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPackages(filtered);
    }, [searchTerm, internationalPackagesListing]);

    const handleItenary = (itenryId) => {
        navigate(`/itenary-details/${itenryId}`);
    };

    const handleToggleFavorite = (e, id, item) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(id, item);
    }

    return (

        <div className='bg-[#f7f7f7]'>
            <div className='relative'>
                <RippleEffect
                    BannerImage={BannerImage}
                    BannerTitle={"Explore Our International Packages"}
                />
                <div className='absolute inset-x-0 bottom-[37%] flex justify-center px-4'>
                    <div className='flex w-full max-w-xl'>
                        <input
                            type="text"
                            placeholder="Search International Packages ..."
                            className="w-full py-2 px-4 rounded-l-md text-[12px] sm:text-[16px] bg-white text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />
                        <button
                            className='bg-blue-600 text-white py-2 px-4 rounded-r-md font-semibold shadow-lg hover:bg-blue-700 transition duration-200'
                            onClick={() =>
                                setSearchTerm('')
                            }
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            <div className='bg-gradient-to-b from-blue-100 to-white py-5 sm:py-10'>
                <div className="2xl:container 2xl:mx-auto px-5">
                    <div>
                        {filteredPackages.length > 0 ? (
                            <div className="text-center mb-[16px] sm:mb-9">
                                <h1 className="text-[20px] sm:text-[21px] font-bold text-gray-900 mb-4">
                                    Discover Your Dream Vacation
                                </h1>
                                <p className="text-[15px] sm:text-[18px] text-gray-600">
                                    Explore our hand-picked destinations and special holiday packages
                                </p>
                            </div>
                        ) : (
                            <NoDataFound message="No International Package found" />
                        )}


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPackages && filteredPackages.map((items, index) => {

                                return (

                                    <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">

                                        <div className="relative">
                                            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                {items.categories.toUpperCase()}
                                            </div>
                                            <div className="absolute top-3 right-3 z-10">
                                                <button
                                                    onClick={(e) => handleToggleFavorite(e, items?._id, items)}
                                                    className="h-fit p-2 bg-white rounded-full shadow-lg hover:shadow-xl"
                                                    aria-label={favorites?.has(items?._id) ? "Remove from favorites" : "Add to favorites"}
                                                >
                                                    <Heart
                                                        className={`transition-colors duration-300 h-fit ${favorites?.has(items?._id)
                                                            ? 'fill-red-500 text-red-500'
                                                            : 'text-gray-600'
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                            <img
                                                src={`${imageUrl}${items?.bannerImage}`}
                                                alt={items?.packageTitle}
                                                className="w-full h-64 object-cover"
                                            />
                                        </div>

                                        <div className="p-4">
                                            <h3 className="text-xl font-bold text-red-500 mb-3">
                                                {items?.packageTitle}
                                            </h3>

                                            <p className="text-[12px] sm:text-[16px] text-gray-600 mb-4 line-clamp-3">
                                                {items?.smallDescription}
                                            </p>

                                            <div className='flex flex-row items-center gap-2 mb-3'>
                                                <MapPin className="text-red-500 w-5 h-5" />
                                                <span className="text-[14px] sm:text-md text-gray-600">
                                                    {items?.departureFrom} → {items?.departureTo}
                                                </span>
                                            </div>

                                            <div className='flex flex-row items-center justify-between'>
                                                <div>
                                                    <p className="text-[12px] sm:text-md text-gray-500">Starting from</p>
                                                    <div className='flex flex-row items-center'>
                                                        <p className="text-lg sm:text-2xl font-bold text-red-500">
                                                            ₹{items?.perPersonCost}
                                                        </p>
                                                        <p className="text-sm sm:text-lg text-gray-500 mx-2">/ per person</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button
                                                        className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300 text-[12px] sm:text-[16px]"
                                                        onClick={() =>
                                                            handleItenary(items?._id)
                                                        }
                                                    >
                                                        View More
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternationalPackages;