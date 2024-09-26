import React, { useState } from 'react';
import blogImage from "../../assets/image.jpg";

const BlogDetailsPage = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    <p className='text-[24px] text-red-500 my-3 border-b-2 border-red-700'>9 Ways to Become a Successful Travel Blogger</p>
                </div>

                <div className='w-[100%] h-[80vh]'>
                    <img src={blogImage} alt='blogImage' className='w-full h-full object-cover' />
                </div>

                <div>
                    <p className='mt-2 text-md text-gray-500 font-medium'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur doloribus laboriosam vel ullam quam distinctio repudiandae, eaque voluptatibus autem, esse quidem libero dolor debitis ipsam molestias ut illo vitae veniam quis sequi hic. Voluptatem minus magnam quaerat? Doloribus, aspernatur necessitatibus! Repellendus iste corrupti vero ipsam officiis. Molestias obcaecati cupiditate nihil?
                    </p>
                    <p className='mt-2 text-md text-gray-500 font-medium'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi asperiores ex, quasi recusandae iure suscipit? Ex odio dolorem unde quidem suscipit consectetur aliquam debitis excepturi aspernatur? Accusantium incidunt reprehenderit suscipit doloribus minus asperiores quia aperiam culpa nobis aut magnam excepturi exercitationem consequatur aliquam vero nulla est, obcaecati rerum voluptatum porro!
                    </p>
                    <p className='mt-2 text-md text-gray-500 font-medium'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi asperiores ex, quasi recusandae iure suscipit? Ex odio dolorem unde quidem suscipit consectetur aliquam debitis excepturi aspernatur? Accusantium incidunt reprehenderit suscipit doloribus minus asperiores quia aperiam culpa nobis aut magnam excepturi exercitationem consequatur aliquam vero nulla est, obcaecati rerum voluptatum porro!
                    </p>
                    <p className='mt-2 text-md text-gray-500 font-medium'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi asperiores ex, quasi recusandae iure suscipit? Ex odio dolorem unde quidem suscipit consectetur aliquam debitis excepturi aspernatur? Accusantium incidunt reprehenderit suscipit doloribus minus asperiores quia aperiam culpa nobis aut magnam excepturi exercitationem consequatur aliquam vero nulla est, obcaecati rerum voluptatum porro!
                    </p>
                </div>

                <div className='2xl:container 2xl:mx-auto p-5'>
                    <div className='flex flex-row justify-center'>
                        <p className='text-[24px] text-red-500 my-3 border-b-2 border-red-700'>Gallery Image</p>
                    </div>
                    <div className='grid grid-cols-3 gap-2 w-full h-full'>
                        {[...Array(6)].map((_, index) => (
                            <div key={index} onClick={() => openModal(blogImage)}>
                                <img src={blogImage} alt='gallery' className='w-full h-full cursor-pointer' />
                            </div>
                        ))}
                    </div>
                </div>
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
