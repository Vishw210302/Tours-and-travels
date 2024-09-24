import React, { useState } from 'react';

const Filter = () => {

  const [price, setPrice] = useState(50000);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <>
      <div className='card rounded-2xl w-[25%] h-[100%] bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2 '>
        <div className='card bg-red-500  p-4 rounded-tl-md rounded-tr-md'>
          <h1 className='text-white font-bold text-base'>Packages Filters</h1>
        </div>
        <div className='p-2'>
          <div>
            <p className='text-[15px] font-semibold text-black'>
              Trip Length
            </p>
            <div className="border-b-2 border-gray-400 p-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="male"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">1 to 5 days</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="female"
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">1 to 7 days</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="female"
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">1 to 10 days</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="female"
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">More than 10 days</span>
              </label>
            </div>
          </div>
        </div>
        <div className='p-2'>
          <div className="w-full border-b-2 border-gray-400">
            <h2 className="text-[15px] font-semibold text-black">Price Range</h2>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="50000"
                value={price}
                onChange={handlePriceChange}
                className="w-full h-2 bg-red-500 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mb-2">
                <span>0</span>
                <span>{price}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='p-2'>
          <div className="w-full">
            <h2 className="text-[15px] font-semibold text-black">Packages type</h2>
            <div className="border-b-2 border-gray-400 p-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="male"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Royal</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="male"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Premium</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="male"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Royal</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="male"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Luxury</span>
              </label>
            </div>
          </div>
        </div>
        <div className='p-2'>
          <div className="w-full">
            <h2 className="text-[15px] font-semibold text-black">Speciality Tour Packages</h2>
            <div className="p-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="male"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Family Tour</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="male"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Advanture Tour</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="male"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Couple Tour</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="male"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Customize Tour</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter