import React, { useEffect, useState } from 'react';
import { useGetTeamMemberDetailsQuery } from '../../Api/Api';

const AboutUsPeople = () => {
    const { isError, error, data, isLoading, isSuccess } = useGetTeamMemberDetailsQuery();
    const [teamMemberListing, setTeamMemberListing] = useState([])
    const teamMemberImage = "http://192.168.1.45:7781/uploads/team-member/";

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
                <div className='text-center'>
                    <p className='text-[30px] text-black font-bold'>We’ve Expert Team</p>
                    <p className='text-[30px] text-black font-bold'>Members Meet With Team</p>
                </div>
                <div className='grid grid-cols-6 gap-3 mt-5'>
                    {teamMemberListing && teamMemberListing.map((items, index) => {
                        return (
                            <div className='w-[200px] h-[200px]' key={index + "key"}>
                                <div>
                                    <img src={items?.teamMemberImage ? `${teamMemberImage}${items?.teamMemberImage}` : `${teamMemberImage}${items?.teamMemberImage}`} alt='' className='object-fill w-[200px] h-[200px] rounded-full border-dotted border-red-400 p-1 border-[3px]' />
                                </div>
                                <div className='text-center m-2'>
                                    <p className='text-black font-bold text-xl'>{items?.teamMemberName}</p>
                                    <p className='text-black font-semibold text-xl'>{items?.teamMemberRole}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default AboutUsPeople