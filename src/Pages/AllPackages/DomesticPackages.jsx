import React from 'react';
import PackageImage from '../../assets/image.jpg';

const DomesticPackages = () => {
    const packages = [
        {
            id: 1,
            title: 'Holiday Kashmir',
            days: '10 days',
            nights: '11 Nights',
            image: PackageImage,
            price: "22000"
        },

    ];

    return (
        <>
            <div className='bg-[#f7f7f7]'>
                {/* Search Section */}
                <div className="w-full h-[500px] flex flex-col justify-center items-center bg-[url('https://webimages.ajaymoditravels.com/amtuploads/websiteimages/631155998855.png')] bg-cover bg-center relative">
                    <h1 className='text-white text-4xl font-extrabold mb-6 drop-shadow-md'>Explore Our Domestic Packages</h1>
                    <div className='w-full max-w-lg'>
                        <div className='flex'>
                            <input
                                type="text"
                                placeholder="Search packages..."
                                className="w-full p-[8px] rounded-l-md bg-white text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className='bg-blue-600 text-white p-[8px] rounded-r-md font-semibold shadow-lg hover:bg-blue-700 transition duration-200'>
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className='bg-gradient-to-b from-blue-100 to-white py-10'>
                    <div className='2xl:container 2xl:mx-auto px-5'>
                        <h1 className='text-5xl font-extrabold text-center mb-12 text-gray-800'>Discover Your Dream Vacation</h1>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                            {packages.map((pkg) => (
                                <div key={pkg.id} className='relative group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'>
                                    <img src={pkg.image} alt={pkg.title} className='w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300' />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                    <div className='absolute bottom-0 p-3 bg-opacity-80 bg-black w-full text-white'>

                                        <div className='flex justify-between items-center'>
                                            <h2 className='text-xl font-bold mb-1'>{pkg.title}</h2>
                                            <span className='text-yellow-400 font-bold text-lg'>Royal</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-300'>{pkg.days} / {pkg.nights}</span>
                                            <span className='text-yellow-400 font-bold text-lg'>{pkg.price}$ / PP</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DomesticPackages;
