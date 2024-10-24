import { Calendar, Home, MapPin, Search, Users } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLazyGetCitiesListingQuery } from '../../Api/Api';

const HotelBookingSearch = ({ onSearch }) => {

    const navigate = useNavigate();
    const [fetchCitiesListing, { data, error, isSuccess, isError }] = useLazyGetCitiesListingQuery();
    const [fromCitiesListing, setFromCitiesListing] = useState([]);
    const timeoutRef = useRef(null);
    const [selectedCityFrom, setSelectedCityFrom] = useState(false);
    const [searchValueFrom, setSearchValueFrom] = useState('');

    const [formData, setFormData] = useState({
        city: '',
        checkinDate: '',
        checkoutDate: '',
        adults: 1,
        children: 0,
        rooms: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { city, checkinDate, checkoutDate, adults, rooms } = formData;
        if (!city || !checkinDate || !checkoutDate || adults < 1 || rooms < 1) {
            toast.error("Please fill in all required fields.", {
                position: "top-right",
                className: "toast-error",
                draggable: true,
            });
            return;
        }
        onSearch();
        navigate('/booking-results', { state: { formData } });
    };

    const handleInputChangeCity = (event) => {
        const value = event.target.value;
        setSearchValueFrom(value);
        setSelectedCityFrom(false);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            fetchCitiesListing(value);
        }, 500);
    };

    useEffect(() => {
        if (isSuccess && data) {
            setFromCitiesListing(data.data || []);
        } else if (isError) {
            console.error("City fetching error:", error);
            setFromCitiesListing([]);
        }
    }, [data, error, isSuccess, isError]);

    const handleCitySelectFrom = (city) => {
        setSearchValueFrom(city.city);
        setFormData((prev) => ({ ...prev, city: city.city }));
        setFromCitiesListing([]);
        setSelectedCityFrom(false);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <>
            <div className="bg-[#1f2746] bg-opacity-90 p-6 backdrop-blur-sm w-[80%] relative left-[10%] bottom-14 z-10 rounded-xl">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-6 text-white">Luxury Stay Booking</h2>
                    <form className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center" onSubmit={handleSubmit}>

                        <div className="col-span-1">
                            <div className="relative">
                                <label htmlFor="fromCity" className="text-sm font-semibold text-white mb-1 flex items-center">
                                    <MapPin className="mr-1" size={16} />
                                    City
                                    {selectedCityFrom && (
                                        <p className='text-red-500 text-[12.5px]'>Please select another city</p>
                                    )}
                                </label>
                                <input
                                    type="text"
                                    id="fromCity"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Search City"
                                    value={searchValueFrom}
                                    onChange={handleInputChangeCity}
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
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="checkinDate" className="text-sm font-semibold text-white mb-1 flex items-center">
                                <Calendar className="mr-1" size={16} />
                                Check-in Date
                            </label>
                            <input
                                type="date"
                                id="checkinDate"
                                name="checkinDate"
                                value={formData.checkinDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="checkoutDate" className="text-sm font-semibold text-white mb-1 flex items-center">
                                <Calendar className="mr-1" size={16} />
                                Check-out Date
                            </label>
                            <input
                                type="date"
                                id="checkoutDate"
                                name="checkoutDate"
                                value={formData.checkoutDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="adults" className="text-sm font-semibold text-white mb-1 flex items-center">
                                <Users className="mr-1" size={16} />
                                Adults
                            </label>
                            <input
                                type="number"
                                id="adults"
                                name="adults"
                                value={formData.adults}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                min="1"
                            />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="children" className="text-sm font-semibold text-white mb-1 flex items-center">
                                <Users className="mr-1" size={16} />
                                Children
                            </label>
                            <input
                                type="number"
                                id="children"
                                name="children"
                                value={formData.children}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                min="0"
                            />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="rooms" className="text-sm font-semibold text-white mb-1 flex items-center">
                                <Home className="mr-1" size={16} />
                                Rooms
                            </label>
                            <input
                                type="number"
                                id="rooms"
                                name="rooms"
                                value={formData.rooms}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                min="1"
                            />
                        </div>

                        <div className="col-span-1 w-fit h-fit mt-6">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all ease-in-out duration-300 flex items-center justify-center"
                            >
                                <Search className="mr-2" size={20} />
                                Find Your Stay
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                className="toast-container"
                draggable="true"
            />

        </>
    );
};

export default HotelBookingSearch;