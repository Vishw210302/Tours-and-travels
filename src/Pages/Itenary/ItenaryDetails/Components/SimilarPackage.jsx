import React from 'react';
import itenaryImage from "../../../../assets/image.jpg";

const SimilarPackage = () => {

  return (
    <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'>
      <p className='text-lg font-bold text-red-400'>Similar Package</p>
      <div className='mt-3'>
        <div>
          <p className='text-[15px] font-semibold'>Exotic Singapore Malaysia - Diwali</p>
          <p className='text-[12px] font-semibold text-gray-800 mb-2'>9 Days, 8 Nights</p>
        </div>
        <div className='grid grid-cols-2'>
          <div className='w-[100%]'>
            <img src={itenaryImage} alt='' className='w-[80%] h-28' />
          </div>
          <div>
            <p className='text-gray-500 font-bold text-[12px]'>Sightseeing</p>
            <p className='text-[15px] break-words text-justify'>
              Sonmarg, Gulmarg, Shimla Sonmarg, Gulmarg, Shimla Sonmarg, Gulmarg, Shimla Sonmarg, Gulmarg, Shimla
            </p>
          </div>
        </div>
      </div>
      <div className='border-b-2 mt-2'></div>
      <div className='mt-3'>
        <div>
          <p className='text-[15px] font-semibold'>Exotic Singapore Malaysia - Diwali</p>
          <p className='text-[12px] font-semibold text-gray-800 mb-2'>9 Days, 8 Nights</p>
        </div>
        <div className='grid grid-cols-2'>
          <div className='w-[100%]'>
            <img src={itenaryImage} alt='' className='w-[80%] h-28' />
          </div>
          <div>
            <p className='text-gray-500 font-bold text-[12px]'>Sightseeing</p>
            <p className='text-[15px] break-words text-justify'>
              Sonmarg, Gulmarg, Shimla Sonmarg, Gulmarg, Shimla Sonmarg, Gulmarg, Shimla Sonmarg, Gulmarg, Shimla
            </p>
          </div>
        </div>
      </div>
      <div className='border-b-2 mt-2'></div>
      <div className='mt-3'>
        <div>
          <p className='text-[15px] font-semibold'>Exotic Singapore Malaysia - Diwali</p>
          <p className='text-[12px] font-semibold text-gray-800 mb-2'>9 Days, 8 Nights</p>
        </div>
        <div className='grid grid-cols-2'>
          <div className='w-[100%]'>
            <img src={itenaryImage} alt='' className='w-[80%] h-28' />
          </div>
          <div>
            <p className='text-gray-500 font-bold text-[12px]'>Sightseeing</p>
            <p className='text-[15px] break-words text-justify'>
              Sonmarg, Gulmarg, Shimla Sonmarg, Gulmarg, Shimla Sonmarg, Gulmarg, Shimla Sonmarg, Gulmarg, Shimla
            </p>
          </div>
        </div>
      </div>
      <div className='border-b-2 mt-2'></div>
    </div>
  )
}

export default SimilarPackage