import React, { createContext, useContext } from 'react';
import { useGetSettingListingQuery } from '../Api/Api';

const AllApiContext = createContext();

export const AllApiProvider = ({ children }) => {

    const {
        isError: settingIsError,
        error: settingError,
        data: settingData,
        isSuccess: settingIsSuccess
    } = useGetSettingListingQuery();

    return (
        <AllApiContext.Provider value={{ settingIsError, settingError, settingData, settingIsSuccess }}>
            {children}
        </AllApiContext.Provider>
    );

};

export const useAllApiContext = () => {
    return useContext(AllApiContext);
};