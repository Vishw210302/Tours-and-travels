import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useGetCitiesListingQuery } from '../../Api/Api';
import Airlinesname from '../Home/components/Airlinesname';
import TopSearchFlights from './TopSearchFlights';

const FlightsPageListing = () => {
    const { data, isError } = useGetCitiesListingQuery();
    console.log("datadatadatadatadata", data)
    const [fromCitiesListing, setFromCitiesListing] = useState([]);
    const [toCitiesListing, setToCitiesListing] = useState([]);
    const [searchValueFrom, setSearchValueFrom] = useState('');
    const [searchValueTo, setSearchValueTo] = useState('');
    const timeoutRef = useRef(null);

    const searchCities = useCallback((value, isFrom) => {
        if (value) {
            fetch(`http://192.168.1.45:7781/api/get-all-cities?city=${value}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) {
                        if (isFrom) {
                            setFromCitiesListing(data.data || []);
                        } else {
                            setToCitiesListing(data.data || []);
                        }
                    } else {
                        if (isFrom) {
                            setFromCitiesListing([]);
                        } else {
                            setToCitiesListing([]);
                        }
                    }
                })
                .catch((error) => console.error('Error fetching cities:', error));
        } else {
            if (isFrom) {
                setFromCitiesListing([]);
            } else {
                setToCitiesListing([]);
            }
        }
    }, []);

    const handleInputChangeFrom = (event) => {
        const value = event.target.value;
        console.log(value,"value")
        setSearchValueFrom(value);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            searchCities(value, true);
        }, 500);
    };

    const handleInputChangeTo = (event) => {
        const value = event.target.value;
        setSearchValueTo(value);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            searchCities(value, false);
        }, 500);
    };

    const handleCitySelectFrom = (city) => {
        setSearchValueFrom(city.name);
        setFromCitiesListing([]);
    };

    const handleCitySelectTo = (city) => {
        setSearchValueTo(city.name);
        setToCitiesListing([]);
    };

    useEffect(() => {
        if (data) {
            setFromCitiesListing(data.data || []);
        } else if (isError) {
            console.error("Error fetching cities:", isError);
        }
    }, [data, isError]);

    return (
        <>
            <div className="w-full h-[500px] flex justify-center items-center bg-[url('https://www.ramco.com/hubfs/Iraqi%20Airways%20Go%20Live%20PR%20Banner%20Image.png')] bg-cover bg-center bg-[#f7f7f7]">
                <div className="w-[60%]">
                    <div className="bg-[#1f2746] p-6 rounded-lg shadow-lg w-auto">
                        <h1 className="text-2xl text-white mb-4 font-semibold text-center">Search Flights</h1>

                        <div className="flex flex-row items-center gap-3 mb-4">
                            <label className="text-white flex items-center">
                                <input type="radio" name="tripType" defaultValue="roundTrip" className="mr-2" />
                                Round Trip
                            </label>

                            <label className="text-white flex items-center">
                                <input type="radio" name="tripType" defaultValue="oneWay" className="mr-2" />
                                One Way
                            </label>
                        </div>

                        <form className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="mb-4 relative">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="fromCity">
                                        From
                                    </label>
                                    <input
                                        type="text"
                                        id="fromCity"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Search City"
                                        onChange={handleInputChangeFrom}
                                        value={searchValueFrom}
                                    />
                                    {fromCitiesListing.length > 0 && (
                                        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-auto">
                                            {fromCitiesListing.map((city) => (
                                                <li
                                                    key={city._id}
                                                    className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                                                    onClick={() => handleCitySelectFrom(city)}
                                                >
                                                    {city.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="mb-4 relative">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="toCity">
                                        To
                                    </label>
                                    <input
                                        type="text"
                                        id="toCity"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Search City"
                                        onChange={handleInputChangeTo}
                                        value={searchValueTo}
                                    />
                                    {toCitiesListing.length > 0 && (
                                        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-auto">
                                            {toCitiesListing.map((city) => (
                                                <li
                                                    key={city._id}
                                                    className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                                                    onClick={() => handleCitySelectTo(city)}
                                                >
                                                    {city.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="className">
                                        Class
                                    </label>
                                    <select
                                        id="className"
                                        name="className"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option defaultValue="" disabled>Select Class</option>
                                        <option value="economy">Economy</option>
                                        <option value="business">Business</option>
                                        <option value="firstClass">First Class</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="departureDate">
                                        Departure Date
                                    </label>
                                    <input
                                        type="date"
                                        id="departureDate"
                                        name="departureDate"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="returnDate">
                                        Return Date
                                    </label>
                                    <input
                                        type="date"
                                        id="returnDate"
                                        name="returnDate"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="adult">
                                        Adult (16+)
                                    </label>
                                    <select
                                        id="adult"
                                        name="adult"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option defaultValue="" disabled>Select Number of Adults</option>
                                        <option value="1">1 Adult</option>
                                        <option value="2">2 Adults</option>
                                        <option value="3">3 Adults</option>
                                        <option value="4">4 Adults</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="children">
                                        Children (0-15)
                                    </label>
                                    <select
                                        id="children"
                                        name="children"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option defaultValue="" disabled>Select Number of Children</option>
                                        <option value="0">0 Children</option>
                                        <option value="1">1 Child</option>
                                        <option value="2">2 Children</option>
                                        <option value="3">3 Children</option>
                                        <option value="4">4 Children</option>
                                    </select>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-300"
                                    >
                                        Search Flights
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Airlinesname />
            <TopSearchFlights />
        </>
    );
};

export default FlightsPageListing;
