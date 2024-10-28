import React from 'react';
import pkgImage from "../../assets/image.jpg";
import BannerImage from "../../assets/water.jpg";
import RippleEffect from '../RippleEffects/RippleEffect';

const travelPackages = [
    {
        id: 1,
        name: "Maldives Getaway",
        description: "Enjoy 7 days in the beautiful Maldives with beach resorts and water sports.",
        price: "$1500",
        image: pkgImage,
    },
    {
        id: 2,
        name: "Swiss Alps Adventure",
        description: "A 10-day tour of the Swiss Alps with skiing, snowboarding, and scenic train rides.",
        price: "$2000",
        image: pkgImage,
    },
    {
        id: 3,
        name: "Bali Vacation",
        description: "Relax in Bali with a 5-day trip including temple visits and beach fun.",
        price: "$1200",
        image: pkgImage,
    }
];

const PopularTheme = () => {
    return (
        <>
            <div className='bg-white min-h-screen'>
                <RippleEffect BannerImage={BannerImage} BannerTitle={"Popular Theme"} />
                <div className='2xl:container 2xl:mx-auto p-5'>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {travelPackages && travelPackages.map((packageItem) => (
                            <div
                                key={packageItem.id}
                                className='relative bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-transform duration-500 ease-out group'>

                                <div className='absolute -top-8 -right-12 w-36 h-36 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-40 transition-all duration-500'></div>
                                <div className='absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tl from-green-500 to-yellow-500 rounded-full opacity-30 transition-all duration-500'></div>

                                <img src={packageItem.image} alt={packageItem.name} className='w-full h-48 object-cover rounded-t-3xl' />

                                <div className='p-6 relative z-10'>
                                    <h3 className='text-3xl font-bold text-gray-800 tracking-wide'>{packageItem.name}</h3>
                                    <p className='text-gray-600 mt-4'>{packageItem.description}</p>
                                    <div className='mt-6'>
                                        <span className='text-2xl font-bold text-indigo-500'>{packageItem.price}</span>
                                    </div>
                                    <button className='mt-8 py-3 px-6 w-full bg-gradient-to-r from-green-400 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-110'>
                                        View More
                                    </button>
                                </div>

                                <div className='absolute inset-0  from-gray-800 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none'></div>

                                <div className='absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg'>
                                    <span className='text-gray-800 font-semibold group-hover:text-black'>{packageItem.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopularTheme;
