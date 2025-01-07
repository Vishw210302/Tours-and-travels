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

const Index = () => {

  const { id } = useParams();
  const { isSuccess, isError, data, error } = useGetItenariesDetailsQuery(id);
  const [itenatyDataListing, setItenaryDataListing] = useState({});
  const [itenaryPriceData, setItenaryPriceData] = useState({});
  const [itenaryId, setItenaryId] = useState(null);
  const [inclusion, setInclusion] = useState([]);
  const [exclusion, setExclusion] = useState([]);
  const imageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/itenary-package/`;

  useEffect(() => {
    if (isSuccess && data?.itenaryData) {
      setItenaryDataListing(data?.itenaryData);
      setItenaryPriceData(data?.itenaryData?.price);
    }
  }, [isSuccess, isError, data, error]);

  useEffect(() => {
    if (id) {
      setItenaryId(id);
    }
  }, [id]);

  useEffect(() => {
    setInclusion(itenatyDataListing?.inclusionExclusion?.inclusion);
    setExclusion(itenatyDataListing?.inclusionExclusion?.exclusion);
  }, [itenatyDataListing]);

  return (
    <>
      <div className='bg-[#f7f7f7]'>
        {itenatyDataListing && (
          <div className='w-full h-[400px] md:h-[600px] flex justify-center items-center'>
            <img
              src={`${imageUrl}${itenatyDataListing?.bannerImage}`}
              className='h-full w-full object-cover'
              alt={itenatyDataListing.bannerImage}
            />
          </div>
        )}

        <div className='bg-[#f7f7f7]'>
          <div className='container mx-auto my-3 px-4'>
            <About data={itenatyDataListing?.smallDescription} allData={data} />
          </div>
        </div>

        <div className='2xl:container mx-auto px-4 py-5'>
          <div className='flex flex-col lg:flex-row justify-between'>
            <div className='lg:w-[60%] mb-4 lg:mb-0'>
              <Days days={itenatyDataListing?.days} />
            </div>
            <div className='lg:w-[35%]'>
              <FlightsDetails itenatyDataListing={itenatyDataListing} />
              <Testimonialform />
              <div className='mt-4'>
                {inclusion?.length > 0 && (
                  <div className='card bg-white rounded-xl shadow-lg p-4'>
                    <div className='text-center mb-3'>
                      <p className='text-[21px] text-red-500 font-bold border-b-2 border-red-300 inline-block'>
                        Inclusions
                      </p>
                    </div>
                    <div>
                      {inclusion.map((item, index) => (
                        <div key={index + "inclusions"} className='grid grid-cols-[auto_1fr] items-center gap-2 mb-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 text-green-500'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                          <p className='text-gray-800'>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {exclusion?.length > 0 && (
                  <div className='card bg-white rounded-xl shadow-lg p-4 mt-4'>
                    <div className='text-center mb-3'>
                      <p className='text-[21px] text-red-500 font-bold border-b-2 border-red-300 inline-block'>
                        Exclusions
                      </p>
                    </div>
                    <div>
                      {exclusion.map((item, index) => (
                        <div
                          key={index + "exclusions"}
                          className="grid grid-cols-[auto_1fr] items-center gap-2 mb-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-500 cursor-pointer"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.225 6.225a1 1 0 011.414 0L12 10.586l4.361-4.361a1 1 0 111.414 1.414L13.414 12l4.361 4.361a1 1 0 01-1.414 1.414L12 13.414l-4.361 4.361a1 1 0 01-1.414-1.414L10.586 12 6.225 7.639a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-gray-800">{item}</p>
                        </div>

                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <TermAndCondition />
        </div>

        <InqueriesPage
          itenaryId={itenaryId}
          itenaryPriceData={itenaryPriceData}
          itenatyDataListing={itenatyDataListing}
        />
      </div>
    </>
  );
};

export default Index;