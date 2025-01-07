import React, { useEffect, useState } from 'react';
import { useGetBranchesQuery, useLazyGetSubBranchesQuery } from '../../../Api/Api';

const Braches = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetBranchesQuery();
    const [fetchSubBranches, { data: subBranchData, isSuccess: subBranchSuccess, isError: isSubBranchError, error: subBranchError }] = useLazyGetSubBranchesQuery();
    const [allBrach, setAllBranch] = useState([])
    const [selectedCity, setSelectedCity] = useState(null);
    const [subBranch, setSubBranch] = useState(null)

    useEffect(() => {
        if (isSuccess) {
            setAllBranch(data?.data);
            if (data?.data?.length > 0) {
                const defaultCityId = data?.data[0]._id;
                setSelectedCity(defaultCityId);
                fetchSubBranches(defaultCityId);
            }
        } else if (isError) {
            console.log("isError", isError);
        }
    }, [error, data, isSuccess, isError]);

    useEffect(() => {
        if (subBranchSuccess) {
            setSubBranch(subBranchData?.data)
        } else if (isSubBranchError) {
            console.log("isSubBranchError", subBranchError);
        }
    }, [isSubBranchError, subBranchData, subBranchSuccess, subBranchError]);

    const handleCityClick = (city) => {
        setSelectedCity(city);
        fetchSubBranches(city);
    };

    return (
        <div className='2xl:container 2xl:mx-auto p-5'>
            <div>
                {allBrach && allBrach?.length > 0 ?
                    <div className='text-center'>
                        <p className='text-[40px] font-semibold'>Our Branches</p>
                    </div> :
                    <></>
                }
                <div>
                    <div className='flex justify-center gap-6 text-4xl flex-wrap'>
                        {allBrach.map((city, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleCityClick(city._id)}
                                    className={`border rounded-lg p-2 cursor-pointer hover:bg-red-400 ${selectedCity === city._id ? 'bg-red-400 text-white' : ''
                                        }`}
                                >
                                    <p className='text-xl flex flex-1 justify-center items-center font-semibold hover:text-white'>
                                        {city.branchLocation}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='grid sm:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4'>
                        {subBranch && subBranch.map((location, index) => {
                            return (
                                <div key={index + "location"}>
                                    <div className='card mt-10 bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-1 relative rounded-xl'>
                                        <div className='p-2'>
                                            <p className='text-lg text-center font-semibold text-red-400 my-2 bg-[#ededed]'>{location?.branchName}</p>
                                            <iframe
                                                src={location?.mapUrl}
                                                width="100%"
                                                height="150"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                            ></iframe>
                                            <div className='mt-2'>
                                                <p className='text-red-500 text-base'>{location?.branchNumber}</p>
                                            </div>
                                            <div className='mt-2'>
                                                <p className='text-red-500 text-lg'>{location?.branchLocation}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Braches