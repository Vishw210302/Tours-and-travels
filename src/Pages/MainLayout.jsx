import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Partials/Footer';
import NavBar from './Partials/NavBar';

const MainLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout