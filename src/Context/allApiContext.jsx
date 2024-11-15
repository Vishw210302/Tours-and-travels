import React, { createContext, useContext, useState } from 'react';
import { useGetSettingListingQuery } from '../Api/Api';

const AllApiContext = createContext();

export const AllApiProvider = ({ children }) => {

    const {
        isError: settingIsError,
        error: settingError,
        data: settingData,
        isSuccess: settingIsSuccess
    } = useGetSettingListingQuery();
    const [addToCart, setaddToCart] = useState("")

    return (
        <AllApiContext.Provider value={{ settingIsError, settingError, settingData, settingIsSuccess, addToCart, setaddToCart }}>
            {children}
        </AllApiContext.Provider>
    );

};

export const useAllApiContext = () => {
    return useContext(AllApiContext);
};