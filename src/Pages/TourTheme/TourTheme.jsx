import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import image1 from "../../assets/people-travels2.jpg";
import { useGetPackageThemeDataQuery } from '../../Api/Api';

const TourTheme = () => {

    const { isError, error, data, isLoading, isSuccess } = useGetPackageThemeDataQuery();
    const [packageListing, setPackageListing] = useState([]);
    const imageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/package-theme/`;

    useEffect(() => {
        if (isSuccess) {
            setPackageListing(data?.data);
        } else if (isError) {
            console.log("error", isError);
        }
    }, [error, data, isSuccess, isError]);

    return (
        <>
            <div>
                <div className='2xl:container 2xl:mx-auto'>
                    <div className='flex flex-row justify-center items-center p-5 w-full font-bold text-[30px] text-red-500'>
                        Popular Themes
                    </div>
                    <p className='flex flex-row justify-center items-center text-center'>
                        Planning your Family Vacations, Honeymoon, Beach Holidays or want to explore the wildlife? Just pick one of the Popular Themes and explore the recommended Deals.
                    </p>
                </div>

                <div className='2xl:container 2xl:mx-auto mt-3'>
                    <div className='swiper-container my-3'>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={5}
                            loop={true}
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                        >
                            {packageListing.map((theme, index) => {
                                console.log("thissis", theme)
                                return (
                                    <SwiperSlide key={index}>
                                        <div>
                                            <div className='w-[200px] h-[200px]'>
                                                <img
                                                    src={`${imageUrl}${theme.packageThemeImage}`}
                                                    alt={theme.name}
                                                    className='object-fill w-full h-full rounded-full border-dotted border-red-400 p-1 border-[3px]'
                                                />
                                            </div>
                                            <div className='m-2'>
                                                <p className='text-black text-start font-semibold text-xl'>{theme.packageName}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TourTheme;