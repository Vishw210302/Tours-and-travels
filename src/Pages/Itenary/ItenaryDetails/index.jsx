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
  const [itenaryId, setItenaryId] = useState(null)
  const [inclusion, setInclusion] = useState([]);
  const [exclusion, setExclusion] = useState([]);
  const imageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/itenary-package/`;

  useEffect(() => {
    if (isSuccess && data?.itenaryData) {
      setItenaryDataListing(data?.itenaryData);
      setItenaryPriceData(data?.itenaryData?.price)
    }
  }, [isSuccess, isError, data, error]);

  useEffect(() => {
    if (id) {
      setItenaryId(id)
    }
  }, [id])

  useEffect(() => {
    setInclusion(itenatyDataListing?.inclusionExclusion?.inclusion)
    setExclusion(itenatyDataListing?.inclusionExclusion?.exclusion)
  }, [itenatyDataListing])


  return (
    <>
      <div className='bg-[#f7f7f7]'>

        {itenatyDataListing && (
          <div className={`w-full h-[600px] flex flex-row justify-center items-center`}>
            <img
              src={`${imageUrl}${itenatyDataListing?.bannerImage}`}
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
            />
            <div className='w-[35%] h-[100%]'>
              <FlightsDetails itenatyDataListing={itenatyDataListing} />
              <Testimonialform />
              <div className="w-[100%]">
                {inclusion && inclusion.length > 0 ?
                  <div className="card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg my-2 p-3 h-fit">

                    <div className="text-center">
                      <p className="text-[21px] text-red-500 font-bold border-b-2 border-red-300 inline-block">Inclusions</p>
                    </div>

                    <div className="mt-3 px-3">
                      {inclusion && inclusion.map((item, index) => {
                        return (
                          <div key={index + "inclusions"} className="flex items-center gap-2 mb-1">
                            <div>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-green-500"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div>
                              <p className="text-gray-800">{item}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div> : <></>
                }
                {exclusion && exclusion.length > 0 ?
                  <div className="card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg my-2 p-3 h-fit">
                    <div className='text-center'>
                      <p className="text-[21px] text-red-500 font-bold border-b-2 border-red-300 inline-block ">Exclusions</p>
                    </div>
                    <div className="mt-3">
                      {exclusion && exclusion.map((item, index) => {
                        return (
                          <div key={index + "exclusions"} className="flex items-center gap-2 mb-1">
                            <div>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-red-500"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>

                              </span>
                            </div>
                            <div>
                              <p className="text-gray-800">{item}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div> : <></>
                }
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