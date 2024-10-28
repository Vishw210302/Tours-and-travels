import React, { useEffect, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import { useGetSocialMediaLinkListingQuery } from '../../../Api/Api';

const Details = () => {

    const { isError, error, data, isLoading, isSuccess } = useGetSocialMediaLinkListingQuery();
    const [socialMediaLinkListing, setSocialMediaLinkListing] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            setSocialMediaLinkListing(data?.data);
        } else if (isError) {
            console.log("error", isError);
        }
    }, [error, data, isSuccess, isError]);

    return (
        <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-10 my-2 w-[95%] h-fit'>
            <p className='text-red-400 text-[18px] font-bold'>
                Registered office
            </p>
            <p className='text-gray-400 text-base font-medium text-justify'>
                Shakti -21 Complex, Opp. Sudarshan Bunglow, Nr. European Catalog, Opp, Shivalik Highstreet Building, Keshav Bagh Party Plot to Mansi Circle, Vastrapur Road, Ahmedabad - 380 015
            </p>
            <div className='mt-3'>
                <p className='text-red-400 text-[18px] font-bold'>
                    Call us
                </p>
                <p className='text-gray-400 text-base font-medium text-justify'>
                    Request a quote or just chat about your next vacation. We're always happy to help!
                </p>
                <div>
                    <div className='flex flex-row my-2'>
                        <p className='text-red-400 text-[15px] font-semibold'>Domestic :-</p>
                        <p className='font-semibold text-black'>+91-8490820875 , +91-7069950571</p>
                    </div>
                    <div className='flex flex-row my-2'>
                        <p className='text-red-400 text-[15px] font-semibold'>International :-</p>
                        <p className='font-semibold text-black'>+91-9173211901 , +91-7016525632</p>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <p className='text-red-400 text-[18px] font-bold'>
                    Write to us
                </p>
                <p className='text-gray-400 text-base font-medium text-justify'>
                    info@chinmayatravels.com
                </p>
            </div>
            <div className='mt-3'>
                <p className='text-red-400 text-[18px] font-bold'>
                    Follow us on
                </p>
                <div className='text-gray-400 text-[25px]'>
                    <div className='flex flex-row'>
                        {socialMediaLinkListing && socialMediaLinkListing.map((item, index) => {
                            return (
                                <div key={index} className='p-1'>
                                    {item.socialMediaName === 'facebook' && (
                                        <a href={`https://${item.socialMediaLink}`} target="_blank" rel="noopener noreferrer">
                                            <FacebookIcon fontSize='large' className='hover:text-blue-500' />
                                        </a>
                                    )}
                                    {item.socialMediaName === 'Instagram' && (
                                        <a href={`https://${item.socialMediaLink}`} target="_blank" rel="noopener noreferrer">
                                            <InstagramIcon fontSize='large' className='hover:text-pink-500' />
                                        </a>
                                    )}
                                    {item.socialMediaName === 'linkedin' && (
                                        <a href={`https://${item.socialMediaLink}`} target="_blank" rel="noopener noreferrer">
                                            <LinkedInIcon fontSize='large' className='hover:text-blue-700' />
                                        </a>
                                    )}
                                    {item.socialMediaName === 'youtube' && (
                                        <a href={`https://${item.socialMediaLink}`} target="_blank" rel="noopener noreferrer">
                                            <YouTubeIcon fontSize='large' className='hover:text-red-500' />
                                        </a>
                                    )}
                                    {item.socialMediaName === 'twitter' && (
                                        <a href={`https://${item.socialMediaLink}`} target="_blank" rel="noopener noreferrer">
                                            <XIcon fontSize='large' className='hover:text-blue-400' />
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details