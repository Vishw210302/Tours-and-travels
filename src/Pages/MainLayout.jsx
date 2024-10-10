import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './Partials/NavBar';
import LocomotiveScrollWrapper from './LocomotiveScrollWrapper';

const MainLayout = () => {
    return (
        <>
            <NavBar />
            {/* <LocomotiveScrollWrapper> */}
                <Outlet />
            {/* </LocomotiveScrollWrapper> */}
        </>
    )
}

export default MainLayout