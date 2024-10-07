import React, { useEffect, useRef, useState } from 'react';
import { useGetFlightDetailsMutation, useGetSpecialFlightsQuery, useLazyGetCitiesListingQuery } from '../../Api/Api';
import { usePassenger } from '../../Context/PassengerCountContext';
import Airlinesname from '../Home/components/Airlinesname';
import TopSearchFlights from './TopSearchFlights';
import {  useFlightTicketsDetailsContext } from '../../Context/FlightTicketsDetailsContext';

const FlightsPageListing = () => {

    const [fetchCitiedListing, { data, error, isSuccess, isError }] = useLazyGetCitiesListingQuery();
    const [searchFlight, { data: flightData, error: flightErr, isSuccess: flightSuccess, isError: flightIsErr, isLoading }] = useGetFlightDetailsMutation();
    const { data: specialFlghtData, isSuccess: specialFlghtSucess, isError: specialFlghtIsErr, error: specialFlghtErr } = useGetSpecialFlightsQuery()
    const [fromCitiesListing, setFromCitiesListing] = useState([]);
    const [toCitiesListing, setToCitiesListing] = useState([]);
    const [searchValueFrom, setSearchValueFrom] = useState('');
    const [directChecked, setDirectChecked] = useState(false);
    const [searchValueTo, setSearchValueTo] = useState('');
    const [isFrom, setIsForm] = useState(true);
    const [selectedCityFrom, setSelectedCityFrom] = useState(false)
    const [selectedCityTo, setSelectedCityTo] = useState(false)
    const [selectedClass, setSelectedClass] = useState('economy');
    const [departuredDate, setDeparturedDate] = useState('');
    const [adlutValue, setAdlutValue] = useState('1');
    const [childrenValue, setChildrenValue] = useState('0');
    const [infantValue, setInfantValue] = useState('0');
    const [flightsData, setFlightsData] = useState([]);
    const [searchErr, setSearchErr] = useState(false);
    const [classMatch, setClassMatch] = useState('economy');
    const timeoutRef = useRef(null);
    const { setPassengerCount } = usePassenger(); 
    const { setPassengerPersonalDetails } = useFlightTicketsDetailsContext();

    useEffect(() => {
        if (specialFlghtSucess) {
            setFlightsData(specialFlghtData?.data || []);
        } else if (specialFlghtIsErr) {
            console.error("Special Flights API Error:", specialFlghtErr);
        }
    }, [specialFlghtData, specialFlghtSucess, specialFlghtIsErr, specialFlghtErr]);

    useEffect(() => {
        if (isSuccess) {
            if (data) {
                if (isFrom) {
                    setFromCitiesListing(data?.data || []);
                } else {
                    setToCitiesListing(data?.data || []);
                }
            } else {
                if (isFrom) {
                    setFromCitiesListing([]);
                } else {
                    setToCitiesListing([]);
                }
            }

        } else if (isError) {
            console.log("isLocationError", error);
        }
    }, [data, error, isSuccess, isError, isFrom]);

    const handleInputChangeFrom = (event) => {
        setSelectedCityFrom(false)
        const value = event.target.value;
        setSearchValueFrom(value);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsForm(true)
            fetchCitiedListing(value)
        }, 500);
    };

    const handleInputChangeTo = (event) => {
        setSelectedCityTo(false)
        const value = event.target.value;
        setSearchValueTo(value);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsForm(false)
            fetchCitiedListing(value)
        }, 500);
    };

    const handleCitySelectFrom = (city) => {
        const newSearchValueFrom = city.city;
        setSearchValueFrom(newSearchValueFrom);
        setFromCitiesListing([]);
        if (newSearchValueFrom === searchValueTo) {
            setSelectedCityFrom(true);
            setSearchValueFrom('')
        }
    };

    const handleCitySelectTo = (city) => {
        const newSearchValueTo = city.city;
        setSearchValueTo(newSearchValueTo);
        setToCitiesListing([]);
        if (searchValueFrom === newSearchValueTo) {
            setSelectedCityTo(true);
            setSearchValueTo('')
        }
    };

    const handleChangeClass = (event) => {
        setSelectedClass(event.target.value);
        setClassMatch(event.target.value)
    };

    const handleChangeDate = (event) => {
        const date = event.target.value
        setDeparturedDate(date);
    };

    function convertDateFormat(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${month}/${day}/${year}`;
    }

    const handleAdultValue = (event) => {
        const data = event.target.value
        setAdlutValue(data);
    };

    const handleChildrenValue = (event) => {
        const data = event.target.value
        setChildrenValue(data);
    };

    const handleInfantValue = (event) => {
        const data = event.target.value
        setInfantValue(data);
    };

    const handleCheckedValue = (event) => {
        setDirectChecked(event.target.checked);
    };

    const handleSearchFlight = async (e) => {
        e.preventDefault();
        try {
            const formattedDate = convertDateFormat(departuredDate);

            // const payload = {
            //     from: searchValueFrom,
            //     to: searchValueTo,
            //     flightClass: selectedClass,
            //     departure_Date: formattedDate,
            //     adlut: adlutValue,
            //     children: childrenValue,
            //     infant: infantValue,
            //     oneWay: directChecked
            // }

            const payload = {
                from: 'Ahmedabad',
                to: 'Patna',
                flightClass: 'economy',
                departure_Date: '10/15/2024',
                adlut: adlutValue,
                children: childrenValue,
                infant: infantValue,
                oneWay: directChecked
            }

            const totalPassengerCount = parseInt(adlutValue) + parseInt(childrenValue);
            
            setPassengerCount(totalPassengerCount)

            setPassengerPersonalDetails();
            
            await searchFlight(payload);

        } catch (err) {
            console.log("fetching in flights", err)
        }
    }

    useEffect(() => {
        if (flightSuccess) {
            setSearchErr(false)
            if (flightData) {
                setSearchValueFrom('');
                setSearchValueTo('')
                setSelectedClass('economy')
                setDeparturedDate('')
                setAdlutValue('1')
                setChildrenValue('0')
                setInfantValue('0')
                setDirectChecked(false)
                setFlightsData(flightData?.flights)
            }
        } else if (flightIsErr) {
            setSearchErr(true)
            console.log("isLocationError", flightErr);
        }
    }, [flightData, flightErr, flightSuccess, flightIsErr]);

    return (
        <>
            <div className="w-full h-[500px] flex justify-center items-center bg-[url('https://www.ramco.com/hubfs/Iraqi%20Airways%20Go%20Live%20PR%20Banner%20Image.png')] bg-cover bg-center bg-[#f7f7f7]">
                <div className="w-[60%]">
                    <div className="bg-[#1f2746] p-6 rounded-lg shadow-lg w-auto">
                        <h1 className="text-2xl text-white mb-4 font-semibold text-center">Search Flights</h1>

                        <form className="p-2" onSubmit={handleSearchFlight}>
                            <div className='mb-2'>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" checked={directChecked} onChange={handleCheckedValue} className="form-checkbox h-5 w-5 text-blue-600" />
                                    <span className="ml-2 text-white">Direct Flight</span>
                                </label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="mb-4 relative">
                                    <label className="text-white text-sm flex gap-3 font-bold mb-2" htmlFor="fromCity">
                                        From {selectedCityFrom ? (<p className='text-red-500 text-[12.5px]'>Please select another city</p>) : (<></>)}
                                    </label>
                                    <input
                                        type="text"
                                        id="fromCity"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Search City"
                                        onChange={handleInputChangeFrom}
                                        value={searchValueFrom}
                                        autoComplete="off"
                                    />
                                    {fromCitiesListing.length > 0 && (
                                        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-auto">
                                            {fromCitiesListing.map((city) => (
                                                <li
                                                    key={city._id}
                                                    className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                                                    onClick={() => handleCitySelectFrom(city)}
                                                >
                                                    {city.city}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="mb-4 relative">
                                    <label className="text-white text-sm flex gap-3 font-bold mb-2" htmlFor="toCity">
                                        To {selectedCityTo ? (<p className='text-red-500 text-[12.5px]'>Please select another city</p>) : (<></>)}
                                    </label>
                                    <input
                                        type="text"
                                        id="toCity"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Search City"
                                        onChange={handleInputChangeTo}
                                        value={searchValueTo}
                                        autoComplete="off"
                                    />
                                    {toCitiesListing.length > 0 && (
                                        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-auto">
                                            {toCitiesListing.map((city) => (
                                                <li
                                                    key={city._id}
                                                    className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                                                    onClick={() => handleCitySelectTo(city)}
                                                >
                                                    {city.city}
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
                                        value={selectedClass}
                                        onChange={handleChangeClass}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option defaultValue="" disabled>Select Class</option>
                                        <option value="economy">Economy</option>
                                        <option value="business">Business</option>
                                        <option value="firstClass">First Class</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                                <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="departureDate">
                                        Departure Date
                                    </label>
                                    <input
                                        type="date"
                                        id="departureDate"
                                        name="departureDate"
                                        value={departuredDate}
                                        onChange={handleChangeDate}
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
                                        value={adlutValue}
                                        onChange={handleAdultValue}
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
                                        Children (2-11)
                                    </label>
                                    <select
                                        id="children"
                                        name="children"
                                        value={childrenValue}
                                        onChange={handleChildrenValue}
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
                                <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2" htmlFor="children">
                                        Infant (below 2 years)
                                    </label>
                                    <select
                                        id="children"
                                        name="children"
                                        value={infantValue}
                                        onChange={handleInfantValue}
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

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-300 w-[100%]"
                                    >
                                        Search Flights
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Airlinesname flightsData={flightsData} />

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <TopSearchFlights flightsData={flightsData} error={searchErr} classDetail={classMatch} />
            )}
        </>
    );
};

export default FlightsPageListing;
