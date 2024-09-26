import React, { useEffect, useState } from 'react'
import Card from './Comonents/Card'
import Filter from './Comonents/Filter'
import { useParams } from 'react-router-dom';
import { useGetItenriesQuery } from '../../Api/Api';
import '../../assets/custom.css'

const Itenary = () => {
  const { id } = useParams();
  const [response, setResponse] = useState(null);
  const { isError, isLoading, data, isSuccess, error } = useGetItenriesQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: false,
  });

  const imageUrl = "http://192.168.1.45:7781/uploads/packages-Image/"

  useEffect(() => {
    if (isSuccess && data) {
      setResponse(data);
    } else if (isError) {
      console.error('API Error:', error?.error);
    }
  }, [isSuccess, isError, data, error]);

  const packageImage = response && response[0]?.packageImage;
  const packageName = response && response[0]?.packageName;


  return (
    <>
      <div className='bg-[#f7f7f7]'>
        <div className="w-full h-[500px] flex flex-row justify-center items-center bg-[#f7f7f7] background-image relative"
          style={{
            background: `url(${imageUrl + packageImage})`,
          }}>
          <div
            className="absolute top-0 bottom-0 left-0 right-0"
            style={{
              background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%)',
              zIndex: 0
            }}
          />
          <div className='text-2xl text-white font-bold underline z-10'> {packageName && packageName.toUpperCase()} TOURS PACKAGES</div>
        </div>
        <div className='p-4'>
          <div className='w-[100%] flex gap-3'>
            <Filter />
            {response && <Card isLoading={isLoading} data={response[0]} />}
          </div>
        </div>
      </div>
    </>

  )
}

export default Itenary