import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetTeamMemberDetailsQuery } from '../../Api/Api';

const AboutUsPeople = () => {
    const { isError, error, data, isLoading, isSuccess } = useGetTeamMemberDetailsQuery();
    const [teamMemberListing, setTeamMemberListing] = useState([])
    const teamMemberImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/team-member/`;

    useEffect(() => {
        if (isSuccess) {
            setTeamMemberListing(data?.data);
        } else if (isError) {
            console.log("error", isError);
        }
    }, [error, data, isSuccess, isError]);

    return (
        <>
            <div>
                <div className='flex flex-1 justify-center m-2'>
                    <div className='border bg-red-400 p-2 rounded-md'>
                        <span className='text-white font-bold text-xl'>Team Members</span>
                    </div>
                </div>
                <div className='text-center my-5'>
                    <p className='text-[30px] text-black font-bold'>We’ve Expert Team</p>
                    <p className='text-[30px] text-black font-bold'>Members Meet With Team</p>
                </div>
                <div className='swiper-container my-3'>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={6}
                        loop={true}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                    >
                        <div className='grid grid-cols-6 gap-3 mt-5'>
                            {teamMemberListing && teamMemberListing.map((items, index) => {
                                return (
                                    <SwiperSlide key={index + "key"}>
                                        <div key={index + "key"}>
                                            <div className='w-[200px] h-[200px]'>
                                                <img src={items?.teamMemberImage ? `${teamMemberImage}${items?.teamMemberImage}` : `${teamMemberImage}${items?.teamMemberImage}`} alt='' className='object-fill w-full h-full rounded-full border-dotted border-red-400 p-1 border-[3px]' />
                                            </div>
                                            <div className=' m-2'>
                                                <p className='text-black font-bold text-xl'>{items?.teamMemberName}</p>
                                                <p className='text-black font-semibold text-xl'>{items?.teamMemberRole}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </div>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default AboutUsPeople