import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './Partials/NavBar';
import LocomotiveScrollWrapper from './LocomotiveScrollWrapper';
import Footer from './Partials/Footer';

const MainLayout = () => {
    return (
        <>
            <NavBar />
            {/* <LocomotiveScrollWrapper> */}
            <Outlet />
            <Footer />
            {/* </LocomotiveScrollWrapper> */}
        </>
    )
}

export default MainLayout