import React, { useEffect, useState } from 'react';
import { useGetAllItenariesQuery, useGetPackagesQuery } from '../../Api/Api';

import BannerImage from "../../assets/waterEffect.png";
import NoDataFound from '../NoDataFound';
import RippleEffect from '../RippleEffects/RippleEffect';
import { useNavigate } from 'react-router-dom';

const DomesticPackages = () => {

    const { isError, error, data, isSuccess } = useGetAllItenariesQuery('domestic');
    const navigate = useNavigate()
    const [domesticPackagesListing, setDomesticPackagesListing] = useState([]);
    const imageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/itenary-package/`;

    useEffect(() => {
        if (isSuccess) {

            setDomesticPackagesListing(data?.data);
        }
        if (isError) {
            console.log("error", error);
        }
    }, [isSuccess, data, isError, error]);

    const handleItenary = (itenryId) => {
        navigate(`/itenary-details/${itenryId}`)
    }

    return (
        <>
            <div className='bg-[#f7f7f7]'>
                <RippleEffect BannerImage={BannerImage} BannerTitle={"Explore Our Domestic Packages"} />
                <div className='w-full max-w-lg absolute bottom-[55%] left-[36%]'>
                    <div className='flex'>
                        <input
                            type="text"
                            placeholder="Search Domestic Packages ..."
                            className="w-full p-[8px] rounded-l-md bg-white text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className='bg-blue-600 text-white p-[8px] rounded-r-md font-semibold shadow-lg hover:bg-blue-700 transition duration-200'>
                            Search
                        </button>
                    </div>
                </div>

                <div className='bg-gradient-to-b from-blue-100 to-white py-10'>
                    <div className='2xl:container 2xl:mx-auto p-5'>
                        {domesticPackagesListing && domesticPackagesListing?.length > 0 ?
                            <h1 className='text-3xl font-extrabold text-center mb-12 text-gray-800'>Discover Your Dream Vacation</h1>
                            :
                            <NoDataFound message="No Domestic Package found" />
                        }
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>

                                    className='relative bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer'>

                            {domesticPackagesListing && domesticPackagesListing.map((packageItem, index) => {
                                console.log("packageItempackageItempackageItem", packageItem)
                                return (
                                    <div
                                        key={packageItem.id}
                                        className='relative bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer'>

                                        <div className='absolute -top-8 -right-12 w-36 h-36 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-40 transition-all duration-500'></div>
                                        <div className='absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tl from-green-500 to-yellow-500 rounded-full opacity-30 transition-all duration-500'></div>

                                    <img src={`${imageUrl}${packageItem.bannerImage}`} alt={packageItem.packageTitle} className='w-full h-48 object-cover rounded-t-3xl' />

                                    <div className='p-6 relative z-10'>
                                        <h3 className='text-xl font-bold text-black tracking-wide'>{packageItem.packageTitle}</h3>
                                        <p className="text-base text-gray-700">
                                            {packageItem.smallDescription.split(" ").length > 20
                                                ? packageItem.smallDescription.split(" ").slice(0, 20).join(" ") + "..."
                                                : packageItem.smallDescription}
                                        </p>

                                        <div>
                                            <span className='text-lg font-bold text-red-400'>₹{packageItem.perPersonCost}</span>
                                        </div>
                                        <button
                                            onClick={() => handleItenary(packageItem._id)}
                                            className='mt-4 py-3 px-6 w-full bg-gradient-to-r from-green-400 to-blue-600 text-white font-bold rounded-xl'
                                        >
                                            View More
                                        </button>
                                    </div>


                                        <div className='absolute from-gray-800'></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DomesticPackages;
