import '@fortawesome/fontawesome-free/css/all.min.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import React, { useEffect, useState } from 'react';
import { useGetSocialMediaLinkListingQuery } from '../../../Api/Api';
import { useAllApiContext } from '../../../Context/allApiContext';

const Details = () => {

    const { settingData } = useAllApiContext()
    const { isError, error, data, isSuccess } = useGetSocialMediaLinkListingQuery();
    const [socialMediaLinkListing, setSocialMediaLinkListing] = useState([]);
    const [mainBranchAddress, setMainBranchAddress] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            setSocialMediaLinkListing(data?.data);
        } else if (isError) {
            console.log("isError", isError);
        }
    }, [error, data, isSuccess, isError]);

    useEffect(() => {
        setMainBranchAddress(settingData?.data)
    }, [settingData])

    return (
        <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-10 my-2 w-[95%] h-fit'>

            {mainBranchAddress && mainBranchAddress.map((items, index) => {
                if (items?.keyName == "Main_Branch") {
                    return (
                        <div key={index + "key"}>
                            <p className='text-red-400 text-[18px] font-bold'>
                                Main Branch
                            </p>
                            <p className='text-gray-400 text-base font-medium text-justify'>
                                {items?.valueContent}
                            </p>
                        </div>
                    )
                }
            })}

            <div className='mt-3'>
                <p className='text-red-400 text-[18px] font-bold'>
                    Call us
                </p>
                <p className='text-gray-400 text-base font-medium text-justify'>
                    Request a quote or just chat about your next vacation. We're always happy to help!
                </p>
                <div>
                    {mainBranchAddress && (
                        <div className='flex flex-row my-2'>
                            <p className='text-red-400 text-[15px] font-medium'>Domestic :-</p>
                            <p className='font-medium text-black'>
                                {mainBranchAddress
                                    .filter(items => items?.keyName === "Main_domestic_num_1" || items?.keyName === "Main_domestic_num_2")
                                    .map((items, index) => items?.valueContent)
                                    .join(' , ')
                                }
                            </p>
                        </div>
                    )}

                    {mainBranchAddress && (
                        <div className='flex flex-row my-2'>
                            <p className='text-red-400 text-[15px] font-medium'>International :-</p>
                            <p className='font-medium text-black'>
                                {mainBranchAddress
                                    .filter(items => items?.keyName === "Main_international_num_1" || items?.keyName === "Main_international_num_2")
                                    .map((items, index) => items?.valueContent)
                                    .join(' , ')
                                }
                            </p>
                        </div>
                    )}

                </div>
            </div>

            {mainBranchAddress && mainBranchAddress.map((items, index) => {
                if (items?.keyName == "Main_email") {
                    return (
                        <div key={index + "key"} className='mt-3'>
                            <p className='text-red-400 text-[18px] font-bold'>
                                Write to us
                            </p>
                            <p className='text-gray-400 text-base font-medium text-justify'>
                                {items?.valueContent}
                            </p>
                        </div>
                    )
                }
            })}

            <div className='mt-3'>
                {socialMediaLinkListing && socialMediaLinkListing.length > 0 ?
                    <p className='text-red-400 text-[18px] font-bold'>
                        Follow us on
                    </p>
                    : <></>
                }
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