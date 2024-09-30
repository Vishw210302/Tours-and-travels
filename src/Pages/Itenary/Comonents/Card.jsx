import React from 'react';
import Skeleton from 'react-loading-skeleton';
import noDataFound from "../../../assets/noDataFound.png"
import { useNavigate } from 'react-router-dom';

const Card = ({ isLoading, data }) => {
    const imageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/itenary-package/`;
    const navigate = useNavigate();

    const handleItenatyDetails = (itenatyId) => {
        navigate(`/itenary-details/${itenatyId}`)
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    if (!isLoading && (!data?.itenaries || data?.itenaries.length === 0)) {
        return (
            <div className="flex flex-row justify-center w-[70%] items-center">
                <div>
                    <img src={noDataFound} alt='No data found' />
                    <span className='flex flex-row justify-center mt-2 text-xl font-semibold text-red-400'>No packages found</span>
                </div>
            </div>
        );
    }

    return (
        <div className='card w-[75%]'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full'>
                {isLoading ? (
                    <>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className='card w-[390px] h-[390px] packages rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-lg'>
                                <Skeleton borderRadius={10} className="shadow-xl w-full h-full" />
                            </div>
                        ))}
                    </>
                ) : (
                    data?.itenaries?.map((value, index) => (

                        <div
                            key={index}
                            onClick={() => {
                                handleItenatyDetails(value._id)
                            }}
                            className='card packages rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-lg'
                        >
                            <img
                                src={`${imageUrl}${value.bannerImage}`}
                                alt='banner'
                                className='rounded-tl-2xl rounded-tr-2xl w-full h-[200px] object-cover'
                            />
                            <div className='p-4'>
                                <div className='flex flex-row justify-between items-center mb-3'>
                                    <div className='flex items-center border rounded-full overflow-hidden border-red-200'>
                                        <div className='bg-red-500 px-4 py-1 text-center text-white'>
                                            {value.days.length} days
                                        </div>
                                        <div className='px-4 py-1 text-center text-black'>
                                            {value.days.length - 1} Nights
                                        </div>
                                    </div>
                                    <div className='w-[50%] py-1'>
                                        <div className='flex items-center gap-1 mb-1'>
                                            <div className='font-bold text-base text-red-500'>Categories :-</div>
                                            <div className='text-gray-700 text-base font-semibold'>{value.categories}</div>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <div className='font-bold text-base text-red-500'>Price :-</div>
                                            <div className='text-gray-700 text-base font-semibold'>{value.perPersonCost}</div>
                                        </div>
                                    </div>
                                </div>

                                <p className='text-base font-bold text-red-500 mb-2'>{value.packageTitle}</p>

                                <p className='text-sm text-justify text-gray-600 font-medium'>
                                    {truncateText(value.smallDescription, 100)}
                                </p>
                            </div>
                        </div>

                    ))
                )}
            </div>

            <style>{`
                .packages:hover {
                    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, 
                                rgba(0, 0, 0, 0.12) 0px -12px 30px, 
                                rgba(0, 0, 0, 0.12) 0px 4px 6px, 
                                rgba(0, 0, 0, 0.17) 0px 12px 13px, 
                                rgba(0, 0, 0, 0.09) 0px -3px 5px;
                }
            `}</style>
        </div>
    );
}

export default Card;
