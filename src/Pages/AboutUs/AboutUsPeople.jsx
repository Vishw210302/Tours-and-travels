import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useGetTeamMemberDetailsQuery } from '../../Api/Api';
import NoDataFound from '../NoDataFound';

const AboutUsPeople = () => {

    const { isError, error, data, isSuccess } = useGetTeamMemberDetailsQuery();
    const [teamMemberListing, setTeamMemberListing] = useState([])
    const teamMemberImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/team-member/`;

    useEffect(() => {
        if (isSuccess) {
            setTeamMemberListing(data?.data);
        } else if (isError) {
            console.log("error", isError);
        }
    }, [error, data, isSuccess, isError]);

    const settings = {
        dots: false,
        infinite: teamMemberListing?.length > 1,
        speed: 500,
        slidesToShow: teamMemberListing.length < 5 ? teamMemberListing?.length : 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: teamMemberListing?.length < 3 ? teamMemberListing?.length : 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: teamMemberListing?.length < 2 ? teamMemberListing?.length : 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <>
            <div>
                {teamMemberListing && teamMemberListing?.length > 0 ?
                    <>
                        <div className='flex flex-1 justify-center m-2'>
                            <div className='border bg-red-400 p-2 rounded-md'>
                                <span className='text-white font-semibold text-xl'>Team Members</span>
                            </div>
                        </div>
                        <div className='text-center my-5'>
                            <p className='text-[18px] sm:text-[24px] text-black font-semibold'>We’ve Expert Team</p>
                            <p className='text-[18px] sm:text-[24px] text-black font-semibold'>Members Meet With Team</p>
                        </div>
                    </>
                    :
                    <>
                        <NoDataFound message="There are no data found" />
                    </>
                }

                <div className='swiper-container my-3'>
                    <div className="mt-5">
                        <Slider {...settings}>
                            {teamMemberListing && teamMemberListing.map((items, index) => {
                                return (
                                    <div className='w-fit h-fit' key={index + "key"}>
                                        <div className='w-[200px] h-[200px]'>
                                            <img
                                                src={items?.teamMemberImage ? `${teamMemberImage}${items?.teamMemberImage}` : `${teamMemberImage}${items?.teamMemberImage}`}
                                                alt={`${items?.teamMemberName || 'Team member'}`}
                                                className='object-fill w-full h-full rounded-full border-dotted border-red-400 p-1 border-[3px]' />
                                        </div>
                                        <div className='m-2 text-center'>
                                            <p className='text-black font-bold text-[18px] sm:text-xl'>{items?.teamMemberName}</p>
                                            <p className='text-black font-semibold text-[15px] sm:text-xl'>{items?.teamMemberRole}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUsPeople