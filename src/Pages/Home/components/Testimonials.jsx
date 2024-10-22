import StarIcon from '@mui/icons-material/Star';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useGetTestimonialQuery } from '../../../Api/Api';
import testimonialImage from "../../../assets/image.jpg";

const Testimonials = () => {

    const { isError, error, data, isLoading, isSuccess } = useGetTestimonialQuery();
    const [testimonialListing, setTestimonialListing] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            setTestimonialListing(data?.data);
        } else if (isError) {
            console.log("error", isError);
        }
    }, [error, data, isSuccess, isError]);

    const settings = {
        dots: false,
        infinite: testimonialListing?.length > 1,
        speed: 1500,
        slidesToShow: testimonialListing?.length < 5 ? testimonialListing?.length : 5,
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
        <>
            <div className='bg-[#f7f7f7]'>
                {testimonialListing && testimonialListing?.length > 0 ?
                    <div>
                        <div className='flex flex-row justify-center items-center p-5 w-full font-bold text-[30px] text-red-500'>
                            Our Testimonial
                        </div>
                    </div> :
                    <></>
                }

                <Slider {...settings}>
                    {testimonialListing && testimonialListing.map((items, index) => {
                        return (
                            <div key={index}>
                                <div className='card mt-10 bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-1 my-2 relative w-[400px] h-[140px] rounded-xl'>
                                    <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden w-[70px] h-[70px]'>
                                        <img
                                            src={testimonialImage}
                                            alt='review_image'
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                    <div className='mt-[40px]'>
                                        <div className='text-center'>
                                            <span className='text-lg'>{items?.reviewPersonName}</span>
                                        </div>
                                        <div className='text-center'>
                                            {Array.from({ length: Number(items?.numberOfReview) }).map((_, i) => (
                                                <StarIcon key={i} sx={{ color: '#f9d41e' }} />
                                            ))}
                                        </div>
                                        <div className='text-center pb-2'>
                                            <span>{items?.reviewDescription}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </>
    );
};

export default Testimonials;
