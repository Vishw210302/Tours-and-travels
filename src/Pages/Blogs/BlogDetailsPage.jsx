import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageModal from '../ImageModal';

const BlogDetailsPage = () => {

    const location = useLocation();
    const { blog } = location.state || {};
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const vlogBannerImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/blogs-image/`;
    const galleryImagePath = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/blogs-image/`;

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
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

                {blog?.blogGallery && blog.blogGallery?.length > 0 && (
                    <div className='2xl:container 2xl:mx-auto p-5'>
                        <div className='flex flex-row justify-center'>
                            <p className='text-[24px] text-red-500 my-3 border-b-2 border-red-700'>Gallery Images</p>
                        </div>
                        <div className='grid grid-cols-3 gap-2 w-full h-full'>
                            {blog.blogGallery.map((galleryImage, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleImageClick(`${galleryImagePath}${galleryImage}`)}
                                >
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
            <ImageModal
                isOpen={isModalOpen}
                onClose={closeModal}
                imageUrl={modalImage}
            />
        </>
    )
}

export default BlogDetailsPage;