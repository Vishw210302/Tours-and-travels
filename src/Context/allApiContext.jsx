import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGetSettingListingQuery } from '../Api/Api';

const AllApiContext = createContext();

export const AllApiProvider = ({ children }) => {

    const {
        isError: settingIsError,
        error: settingError,
        data: settingData,
        isSuccess: settingIsSuccess,
    } = useGetSettingListingQuery();

    const [hotellisting, setHotelListing] = useState([])

    const [pricingOptions, setPricingOptions] = useState()

    const [totalHotelPrice, setTotalHotelPrice] = useState(null);

    const [hotelBookingDetails, setHotelBookingDetails] = useState({
        hotelName: '',
        checkInDate: '',
        checkOutDate: '',
        roomType: '',
        numberOfNights: '',
        totalGuests: '',
        numberOfRooms:'',
        cityName: '',
    });
    
    const [addToCart, setaddToCart] = useState(() => {
        const savedCart = localStorage.getItem('addToCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
    });

    useEffect(() => {
        localStorage.setItem('addToCart', JSON.stringify(addToCart));
    }, [addToCart]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify([...favorites]));
    }, [favorites]);

    const toggleFavorite = (id, item) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
                setaddToCart(prevCart => prevCart.filter(cartItem => cartItem?._id !== id));
            } else {
                newFavorites.add(id);
                setaddToCart(prevCart => {
                    const itemExists = prevCart.some(cartItem => cartItem?._id === id);
                    return itemExists ? prevCart : [...prevCart, item];
                });
            }
            return newFavorites;
        });
    };

    const removeFromCart = (itemId) => {
        setaddToCart(prevCart => prevCart.filter(item => item._id !== itemId));
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            newFavorites.delete(itemId);
            return newFavorites;
        });
    };

    const clearCart = () => {
        setaddToCart([]);
        setFavorites(new Set());
    };

    return (
        <AllApiContext.Provider value={{
            settingIsError,
            settingError,
            settingData,
            settingIsSuccess,
            addToCart,
            setaddToCart,
            favorites,
            setFavorites,
            toggleFavorite,
            removeFromCart,
            clearCart,
            setHotelListing,
            hotellisting,
            setPricingOptions,
            pricingOptions,
            setTotalHotelPrice,
            totalHotelPrice,
            setHotelBookingDetails,
            hotelBookingDetails
        }}>
            {children}
        </AllApiContext.Provider>
    );
};

export const useAllApiContext = () => {
    return useContext(AllApiContext);
};
