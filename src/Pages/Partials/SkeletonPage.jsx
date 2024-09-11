import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPage = ({ w, h }) => {
   
    return (
        <Skeleton className={`w-${w} h-${h} shadow-xl`} />
    );
}

export default SkeletonPage