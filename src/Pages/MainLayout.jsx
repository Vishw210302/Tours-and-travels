import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from './Partials/NavBar'
import Footer from './Partials/Footer'

const MainLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default MainLayout