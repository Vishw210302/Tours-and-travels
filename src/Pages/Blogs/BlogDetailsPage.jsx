import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const BlogDetailsPage = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const { blog } = location.state || {};
    const vlogBannerImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/blogs-image/`;
    const galleryImagePath = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/blogs-image/`;

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='2xl:container 2xl:mx-auto p-5'>
                <div className='flex flex-row justify-center'>
                    <p className='text-[24px] text-red-500 my-3 border-b-2 border-red-700'>{blog?.blogsName}</p>
                </div>

                <div className='w-[100%] h-[80vh]'>
                    <img src={blog?.blogImage ? `${vlogBannerImage}${blog?.blogImage}` : `${vlogBannerImage}${blog?.blogImage}`} alt='blogImage' className='w-full h-full object-cover' />
                </div>

                <div className='mt-5 text-justify'>
                    <p>{blog?.blogsDescription}</p>
                </div>

                {blog?.blogGallery && blog.blogGallery.length > 0 && (
                    <div className='2xl:container 2xl:mx-auto p-5'>
                        <div className='flex flex-row justify-center'>
                            <p className='text-[24px] text-red-500 my-3 border-b-2 border-red-700'>Gallery Images</p>
                        </div>
                        <div className='grid grid-cols-3 gap-2 w-full h-full'>
                            {blog.blogGallery.map((galleryImage, index) => (
                                <div key={index} onClick={() => openModal(`${galleryImagePath}${galleryImage}`)}>
                                    <img
                                        src={`${galleryImagePath}${galleryImage}`}
                                        alt={`gallery-${index}`}
                                        className='w-full h-full cursor-pointer object-cover'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="relative">
                        <img src={selectedImage} alt='selected gallery' className='w-full h-auto max-h-[80vh]' />
                        <button
                            onClick={closeModal}
                            className='absolute top-0 right-0 mt-2 mr-2 text-white text-xl font-bold'
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default BlogDetailsPage;