import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useGetPackagesQuery } from '../../../Api/Api';
import '../../../assets/custom.css';

const Destinations = () => {

    const { isError, error, data, isLoading, isSuccess } = useGetPackagesQuery();
    const [pkg, setPkg] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const handleItenary = (id) => {
        navigate(`itenary/${id}`)
    }

    useEffect(() => {
        if (isSuccess) {
            setPkg(data?.data);
        } else if (isError) {
            setErr(error?.error);
        }

    }, [error, data, isSuccess, isError]);

    const imageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/packages-Image/`

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='w-full py-10 h-auto bg-[url("https://ajaymodi.com/static/media/discouver-bg.6d953696ca0f26414fd6.jpg")] bg-cover bg-center'>
            <div className='flex flex-row justify-center items-center p-10 w-full font-bold text-[30px] text-red-500'>Popular Destinations</div>
            <div className='w-full flex flex-row justify-center py-5'>
                <div className='w-[65%]'>
                    {isLoading ? (
                        <div className="w-full flex flex-row gap-10 justify-center">
                            <Skeleton width={300} height={400} borderRadius={10} className="shadow-xl" />
                            <Skeleton width={300} height={400} borderRadius={10} className="shadow-xl" />
                            <Skeleton width={300} height={400} borderRadius={10} className="shadow-xl" />
                        </div>
                    ) : (
                        <>
                            {err ? (
                                <div className="w-full flex flex-row gap-10 justify-center">
                                    <Skeleton width={300} height={400} borderRadius={10} className="shadow-xl" />
                                    <Skeleton width={300} height={400} borderRadius={10} className="shadow-xl" />
                                    <Skeleton width={300} height={400} borderRadius={10} className="shadow-xl" />
                                </div>
                            ) : (
                                <Slider {...settings} className="w-full flex flex-row justify-center">
                                    {pkg && pkg.length > 0 ? (
                                        pkg?.map((img, index) => (
                                            <div key={index} onClick={() => handleItenary(img._id)} className='relative  !w-[300px] !h-[400px] overflow-hidden '>
                                                <button className='border-none w-full h-full focus:outline-none'>
                                                    <img src={`${imageUrl}${img.packageImage}`} alt={`destination-${index}`} className='rounded-lg shadow-lg w-full h-full' />
                                                    <div className='rounded-b-lg tracking-wider text-white text-xl font-bold capitalize w-full bg-black/50 p-5 z-10 absolute bottom-0'>
                                                        {img.packageName}
                                                    </div>
                                                </button>
                                            </div>

                                        ))
                                    ) : (
                                        <div className="flex justify-center items-center w-full h-full">
                                            <p className="text-gray-500">No Packages available.</p>
                                        </div>
                                    )}
                                </Slider>
                            )}
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Destinations;
