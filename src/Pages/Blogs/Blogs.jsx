import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBlogListingQuery } from '../../Api/Api';
import NoDataFound from '../NoDataFound';

const Blogs = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetBlogListingQuery();
    const [blogListing, setBlogListing] = useState([]);
    const vlogBannerImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/blogs-image/`;

    useEffect(() => {
        if (isSuccess) {
            setBlogListing(data?.data);
        } else if (isError) {
            console.log("isLocationError", isError);
        }
    }, [error, data, isSuccess, isError]);

    const navigate = useNavigate();

    const truncateText = (text, wordLimit) => {
        return text.split(' ').slice(0, wordLimit).join(' ') + '...';
    };

    const handleDetailsBlogPage = (id, blog) => {
        navigate(`/blog-details/${id}`, { state: { blog } });
    };

    return (
        <>
            <div className="w-full h-[500px] flex flex-col justify-center items-center bg-[url('https://webimages.ajaymoditravels.com/amtuploads/websiteimages/631155998855.png')] bg-cover bg-center relative">
                <h1 className='text-white text-4xl font-extrabold mb-6 drop-shadow-md'>My Blogs</h1>
                <div className='w-full max-w-lg'>
                    <div className='flex'>
                        <input
                            type="text"
                            placeholder="Search Blog Name..."
                            className="w-full p-[8px] rounded-l-md bg-white text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className='bg-blue-600 text-white p-[8px] rounded-r-md font-semibold shadow-lg hover:bg-blue-700 transition duration-200'>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {blogListing && blogListing?.length > 0 ?
                blogListing && blogListing.map((items, index) => {
                    return (
                        <div key={index + "key"} className='2xl:container 2xl:mx-auto px-5 py-3'>
                            <div className='grid grid-cols-3 gap-4 my-5'>
                                <div
                                    className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg relative rounded-xl'
                                    onClick={() => handleDetailsBlogPage(items._id, items)}
                                >
                                    <img src={items?.blogImage ? `${vlogBannerImage}${items?.blogImage}` : `${vlogBannerImage}${items?.blogImage}`} alt='Blog_Image' width={570} height={400} className='rounded-tl-xl rounded-tr-xl relative' />
                                    <div className='absolute top-0 left-0'>
                                        <div className='bg-[#1f2746] p-2 rounded-tl-xl'>
                                            {items?.createdAt && (
                                                <>
                                                    <p className='text-2xl flex flex-row justify-center text-white'>
                                                        {new Date(items.createdAt).toLocaleDateString('en-US', { day: 'numeric' })}
                                                    </p>
                                                    <p className='text-white text-xl'>
                                                        {new Date(items.createdAt).toLocaleDateString('en-US', { month: 'long' })}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className='p-5 mb-1'>
                                        <p className='text-2xl text-red-500'>
                                            {items?.blogsName ? items.blogsName : 'Blog Name Unavailable'}
                                        </p>
                                        <p className='text-justify'>
                                            {items?.blogsDescription ? truncateText(items.blogsDescription, 25) : 'No description available'}
                                        </p>
                                    </div>
                                    <div className='bg-[#1f2746] p-2 flex flex-row justify-between rounded-bl-xl rounded-br-xl'>
                                        <p className='text-white text-lg font-semibold'>{items?.blogType}</p>
                                        <div className='flex flex-row gap-2'>
                                            <p className='text-white text-lg font-semibold'>Post By:-</p>
                                            <p className='text-white text-lg font-semibold'>{items?.blogAuthor}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
                :
                <NoDataFound message="No blogs Available" />
            }
        </>
    );
};

export default Blogs;