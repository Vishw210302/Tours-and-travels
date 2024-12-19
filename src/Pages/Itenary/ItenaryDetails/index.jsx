import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetItenariesDetailsQuery } from '../../../Api/Api';
import InqueriesPage from '../../InqueriesPage/InqueriesPage';
import About from '../../Itenary/ItenaryDetails/Components/About';
import TermAndCondition from '../../TermsAndConditions/TermAndCondition';
import Testimonialform from '../../TestimonialForm/Testimonialform';
import Days from './Components/Days';
import FlightsDetails from './Components/FlightsDetails';
import SimilarPackage from './Components/SimilarPackage';

const Index = () => {

  const { id } = useParams();
  const { isSuccess, isError, data, error } = useGetItenariesDetailsQuery(id);
  const [itenatyDataListing, setItenaryDataListing] = useState({});
  const [itenaryPriceData, setItenaryPriceData] = useState({});
  const [itenaryId, setItenaryId] = useState(null)
  const imageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/itenary-package/`;
  useEffect(() => {
    if (isSuccess && data?.itenaryData) {
      setItenaryDataListing(data?.itenaryData);
      setItenaryPriceData(data?.itenaryData?.price)
    }
  }, [isSuccess, isError, data, error]);

  useEffect(() => {
   if(id){
    setItenaryId(id)
   }
  }, [id])
  

  return (
    <>
      <div className='bg-[#f7f7f7]'>

        {itenatyDataListing && (
          <div className={`w-full h-[600px] flex flex-row justify-center items-center`}>
            <img
              src={`${imageUrl}${itenatyDataListing.bannerImage}`}
              className='h-full w-full'
              alt={itenatyDataListing.bannerImage}
            />
          </div>
        )}

        <div className='bg-[#f7f7f7]'>
          <div className='h-full container-fluid mx-auto my-3'>
            <About
              data={itenatyDataListing?.smallDescription}
              allData={data}
            />
          </div>
        </div>

        <div className='2xl:container 2xl:mx-auto p-5'>
          <div className='flex justify-between w-[100%]'>
            <Days
              days={itenatyDataListing?.days}
              inclusionExclusion={itenatyDataListing?.inclusionExclusion}
            />
            <div className='w-[35%] h-[100%]'>
              <FlightsDetails itenatyDataListing={itenatyDataListing} />
              <SimilarPackage />
              <Testimonialform />
            </div>
          </div>
          <TermAndCondition />
        </div>

        <InqueriesPage
          itenaryId ={itenaryId}
          itenaryPriceData={itenaryPriceData}
          itenatyDataListing={itenatyDataListing}
        />

      </div>
    </>
  );
};

export default Index;