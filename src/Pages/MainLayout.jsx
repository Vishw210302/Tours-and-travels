import React from 'react';
import { Outlet } from 'react-router-dom';
import { useGetSettingListingQuery } from '../Api/Api';
import Footer from './Partials/Footer';
import NavBar from './Partials/NavBar';

const MainLayout = () => {

    const {
        isError: settingIsError,
        error: settingError,
        data: settingData,
        isSuccess: settingIsSuccess
    } = useGetSettingListingQuery();

    return (
        <>
            <NavBar settingData={settingData} settingIsSuccess={settingIsSuccess} settingError={settingError} settingIsError={settingIsError} />
            <Outlet />
            <Footer settingData={settingData} settingIsSuccess={settingIsSuccess} settingError={settingError} settingIsError={settingIsError} />
        </>
    )
}

export default MainLayout