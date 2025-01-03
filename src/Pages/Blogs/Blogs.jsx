import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBlogListingQuery } from '../../Api/Api';
import NoDataFound from '../NoDataFound';

const Blogs = () => {

    const { data, isSuccess, isError, error } = useGetBlogListingQuery();
    const [blogListing, setBlogListing] = useState([]);
    const vlogBannerImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/blogs-image/`;
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            setBlogListing(data?.data);
        } else if (isError) {
            console.log("isError", isError);
        }
    }, [error, data, isSuccess, isError]);

    const truncateText = (text, wordLimit) => {
        return text.split(' ').slice(0, wordLimit).join(' ') + '...';
    };

    const handleDetailsBlogPage = (id, blog) => {
        navigate(`/blog-details/${id}`, { state: { blog } });
    };

    return (
        <>
            <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] flex flex-col justify-center items-center bg-[url('https://webimages.ajaymoditravels.com/amtuploads/websiteimages/631155998855.png')] bg-cover bg-center relative">
                <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 md:mb-6 drop-shadow-md text-center">
                    My Blogs
                </h1>
                <div className="w-full max-w-xs md:max-w-md lg:max-w-lg px-4">
                    <div className="flex flex-col md:flex-row">
                        <input
                            type="text"
                            placeholder="Search Blog Name..."
                            className="w-full p-2 md:p-[8px] rounded-md md:rounded-l-md bg-white text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
                        />
                        <button className="bg-blue-600 text-white py-2 px-4 md:p-[8px] rounded-md md:rounded-r-md font-semibold shadow-lg hover:bg-blue-700 transition duration-200">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {blogListing && blogListing?.length > 0 ? (
                blogListing.map((items, index) => {
                    return (
                        <div key={index + "key"} className="container mx-auto px-4 md:px-6 lg:px-8 py-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                                <div
                                    className="card bg-white shadow-md transition-all duration-300 hover:shadow-lg relative rounded-xl cursor-pointer"
                                    onClick={() => handleDetailsBlogPage(items._id, items)}
                                >
                                    <img
                                        src={
                                            items?.blogImage
                                                ? `${vlogBannerImage}${items?.blogImage}`
                                                : `${vlogBannerImage}${items?.blogImage}`
                                        }
                                        alt="Blog_Image"
                                        width={570}
                                        height={400}
                                        className="rounded-tl-xl rounded-tr-xl w-full h-auto object-cover"
                                    />
                                    <div className="absolute top-0 left-0">
                                        <div className="bg-[#1f2746] p-2 rounded-tl-xl">
                                            {items?.createdAt && (
                                                <>
                                                    <p className="text-lg md:text-xl flex justify-center text-white">
                                                        {new Date(items.createdAt).toLocaleDateString("en-US", {
                                                            day: "numeric",
                                                        })}
                                                    </p>
                                                    <p className="text-white text-sm md:text-base">
                                                        {new Date(items.createdAt).toLocaleDateString("en-US", {
                                                            month: "long",
                                                        })}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-5 mb-1">
                                        <p className="text-lg md:text-xl text-red-500 font-bold">
                                            {items?.blogsName ? items.blogsName : "Blog Name Unavailable"}
                                        </p>
                                        <p className="text-sm md:text-base text-justify text-gray-700">
                                            {items?.blogsDescription
                                                ? truncateText(items.blogsDescription, 25)
                                                : "No description available"}
                                        </p>
                                    </div>
                                    <div className="bg-[#1f2746] p-2 flex flex-row justify-between items-center rounded-bl-xl rounded-br-xl">
                                        <p className="text-white text-sm md:text-lg font-semibold">
                                            {items?.blogType}
                                        </p>
                                        <div className="flex flex-col md:flex-row gap-2 items-center">
                                            <p className="text-white text-sm md:text-lg font-semibold">
                                                Post By:
                                            </p>
                                            <p className="text-white text-sm md:text-lg font-semibold">
                                                {items?.blogAuthor}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <NoDataFound message="No blogs Available" />
            )}
        </>
    );
};

export default Blogs;