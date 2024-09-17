import React, { useEffect, useState } from 'react'
import Card from './Comonents/Card'
import Filter from './Comonents/Filter'
import { useParams } from 'react-router-dom';
import { useGetItenriesQuery } from '../../Api/Api';

const Itenary = () => {
  const { id } = useParams();
  const [response, setResponse] = useState(null);
  const { isError, isLoading, data, isSuccess, error } = useGetItenriesQuery(id,{
    skip: !id, 
    refetchOnMountOrArgChange: false, 
  });


  useEffect(() => {
    if (isSuccess && data) {
      setResponse(data); 
    } else if (isError) {
      console.error('API Error:', error?.error);
    }
  }, [isSuccess, isError, data, error]);


  return (
    <>
      <div className='bg-[#f7f7f7]'>
        <div className="w-full h-[500px] flex flex-row justify-center items-center bg-[url('https://webimages.ajaymoditravels.com/amtuploads/websiteimages/631155998855.png')] bg-cover bg-center bg-[#f7f7f7]">
          <div className='text-2xl text-white font-bold underline'>{response && (response[0]?.packageName).toUpperCase()} TOURS PACKAGES</div>
        </div>
        <div className='p-4'>
          <div className='w-[100%] flex gap-3'>
            <Filter />
           {response  && <Card isLoading={isLoading} data={response[0]}/>} 
          </div>
        </div>
      </div>
    </>

  )
}

export default Itenary