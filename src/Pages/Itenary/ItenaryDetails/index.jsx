import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import InqueriesPage from '../../InqueriesPage/InqueriesPage';
import About from '../../Itenary/ItenaryDetails/Components/About';
import TermAndCondition from '../../TermsAndConditions/TermAndCondition';
import Days from './Components/Days';
import FlightsDetails from './Components/FlightsDetails';
import SimilarPackage from './Components/SimilarPackage';


const index = () => {

  return (
    <>
      <div className='bg-[#f7f7f7]'>

        <div className="w-full h-[500px] flex flex-row justify-center items-center bg-[url('https://webimages.ajaymoditravels.com/amtuploads/websiteimages/631155998855.png')] bg-cover bg-center">
        </div>

        <div className='bg-[#f7f7f7]'>
          <div className='h-full container-fluid mx-auto my-3'>
            <About />
          </div>
        </div>
        <div className='2xl:container 2xl:mx-auto p-5'>
          <div className='flex justify-between w-[100%]'>
            <Days />
            <div className='w-[35%] h-[100%]'>
              <FlightsDetails />
             <SimilarPackage />
            </div>
          </div>
          <TermAndCondition />
        </div >
        <InqueriesPage />
      </div >
    </>
  );
};

export default index;