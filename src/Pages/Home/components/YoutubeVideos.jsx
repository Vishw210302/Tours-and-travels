import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useGetYoutubeVideosQuery } from '../../../Api/Api';

const YoutubeVideos = () => {

    const { isError, error, data, isSuccess } = useGetYoutubeVideosQuery();
    const [youtubeVideosListing, setYoutubeVideosListing] = useState([])

    useEffect(() => {
        if (isSuccess) {
            setYoutubeVideosListing(data?.data);
        } else if (isError) {
            console.log("isError", isError);
        }
    }, [error, data, isSuccess, isError]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className='2xl:container 2xl:mx-auto p-5'>
            {youtubeVideosListing && youtubeVideosListing?.length > 0 ?
                <div>
                    <div className='flex flex-row justify-center items-center p-5 w-full font-bold text-[30px] text-red-500'>
                        Our tour videos
                    </div>
                </div>
                : <></>
            }

            <div className='p-3'>
                <Slider {...settings}>
                    {youtubeVideosListing && youtubeVideosListing.map((video, index) => {
                        return (
                            <div className='rounded-xl' key={index + "key"}>
                                <iframe
                                    width="350"
                                    height="180"
                                    src={video?.youtubeURL}
                                    title={`YouTube video ${index + 1}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className='rounded-xl'
                                ></iframe>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    );
};

export default YoutubeVideos;
