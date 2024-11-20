import { MapPin } from 'lucide-react';
import React from 'react';
import pkgImage from "../../assets/image.jpg";
import BannerImage from "../../assets/water.jpg";
import RippleEffect from '../RippleEffects/RippleEffect';

const travelPackages = [
    {
        id: 1,
        name: "Maldives Getaway",
        description: "Enjoy 7 days in the beautiful Maldives with beach resorts and water sports.",
        perPersonCost: "20,000",
        image: pkgImage,
        departureFrom: "Ahmedabad",
        departureTo: "Bali",
        categories: "premium",
    },
    {
        id: 2,
        name: "Swiss Alps Adventure",
        description: "A 10-day tour of the Swiss Alps with skiing, snowboarding, and scenic train rides.",
        perPersonCost: "15,000",
        image: pkgImage,
        departureFrom: "Ahmedabad",
        departureTo: "Bali",
        categories: "Royal",
    },
    {
        id: 3,
        name: "Bali Vacation",
        description: "Relax in Bali with a 5-day trip including temple visits and beach fun.",
        perPersonCost: "12,000",
        image: pkgImage,
        departureFrom: "Ahmedabad",
        departureTo: "Bali",
        categories: "Classic",
    }
];

const PopularTheme = () => {

    const handleItenary = (packageUrl) => {
        console.log("click on Id", packageUrl)
    }

    return (
        <>
            <div className='bg-white min-h-screen'>
                <RippleEffect
                    BannerImage={BannerImage}
                    BannerTitle={"Popular Theme"}
                />
                <div className='2xl:container 2xl:mx-auto p-5'>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {travelPackages && travelPackages.map((packageItem, index) => {

                            return (

                                <div key={index + "key"} className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">

                                    <div className="relative">
                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            {packageItem?.categories.toUpperCase()}
                                        </div>
                                        <img
                                            src={packageItem?.image}
                                            alt={packageItem?.name}
                                            className="w-full h-64 object-cover"
                                        />
                                    </div>

                                    <div className="p-4">
                                        <h3 className="text-xl font-bold text-red-500 mb-3">
                                            {packageItem?.name}
                                        </h3>

                                        <p className="text-base text-gray-600 mb-4 line-clamp-3">
                                            {packageItem?.description}
                                        </p>

                                        <div className='flex flex-row items-center gap-3 mb-3'>
                                            <MapPin className="text-red-500 w-5 h-5" />
                                            <span className="text-md text-gray-600">
                                                {packageItem?.departureFrom} → {packageItem?.departureTo}
                                            </span>
                                        </div>

                                        <div className='flex flex-row items-center justify-between'>
                                            <div>
                                                <p className="text-md text-gray-500">Starting from</p>
                                                <div className='flex flex-row items-center'>
                                                    <p className="text-2xl font-bold text-red-500">
                                                        ₹{packageItem?.perPersonCost}
                                                    </p>
                                                    <p className="text-lg text-gray-500 mx-2">/ per person</p>
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
                                                    onClick={() =>
                                                        handleItenary(packageItem?.id)
                                                    }
                                                >
                                                    View More
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopularTheme;
