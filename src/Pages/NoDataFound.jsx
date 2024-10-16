import React from 'react'
import noDataFoundImage from "../assets/nodatafound2.jpg"

const NoDataFound = ({ message }) => {
    return (
        <div className='p-3'>
            <div className='flex justify-center items-center'>
                <img src={noDataFoundImage} alt="No data found" width={500} height={500} />
            </div>
            <div className='flex justify-center items-center'>
                <p className='text-2xl font-semibold'>{message}</p>
            </div>
        </div>
    )
}

export default NoDataFound