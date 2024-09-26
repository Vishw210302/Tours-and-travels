import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const YoutubeVideos = () => {
    const videos = [
        {
            id: 1,
            src: "https://www.youtube.com/embed/48ACN_PxXQY?si=LpSuY8ZkaDYx4jXd",
        },
        {
            id: 2,
            src: "https://www.youtube.com/embed/IdejM6wCkxA?si=TCxYlLISBI1LK0_Q",
        },
        {
            id: 3,
            src: "https://www.youtube.com/embed/Ln38av8gLng?si=KYZbaA0TV5eBzO2q",
        },
        {
            id: 4,
            src: "https://www.youtube.com/embed/auxsSV1rSrk?si=eblZOWXqFcmdG2Rh",
        },
    ];

    const settings = {
        dots: true,
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
            <div>
                <div className='flex flex-row justify-center my-2'>
                    <p className='text-lg font-semibold text-red-500'>Our tour videos</p>
                </div>
            </div>
            <div className='p-3'>
                <Slider {...settings}>
                    {videos.map((video, index) => (
                        <div className='rounded-xl' key={index}>
                            <iframe
                                width="350"
                                height="180"
                                src={video.src}
                                title={`YouTube video ${index + 1}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className='rounded-xl'
                            ></iframe>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default YoutubeVideos;
