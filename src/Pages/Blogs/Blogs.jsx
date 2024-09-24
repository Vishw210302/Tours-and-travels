import React from 'react'
import blogImage from "../../assets/image.jpg"
import EventIcon from '@mui/icons-material/Event';

const Blogs = () => {
    return (
        <>
            <div className="w-full h-[500px] flex flex-col justify-center items-center bg-[url('https://webimages.ajaymoditravels.com/amtuploads/websiteimages/631155998855.png')] bg-cover bg-center relative">
                <h1 className='text-white text-4xl font-extrabold mb-6 drop-shadow-md'>My Blogs</h1>
                <div className='w-full max-w-lg'>
                    <div className='flex'>
                        <input
                            type="text"
                            placeholder="Search Blog Name..."
                            className="w-full p-[8px] rounded-l-md bg-white text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className='bg-blue-600 text-white p-[8px] rounded-r-md font-semibold shadow-lg hover:bg-blue-700 transition duration-200'>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className='2xl:container 2xl:mx-auto px-5'>
                <div className='grid grid-cols-3 gap-4 mt-5'>

                    <div className='w-[85%] card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-1 relative rounded-xl'>
                        <img src={blogImage} alt='Blog_Image' className='rounded-xl' />
                        <div className='px-5 my-3 flex flex-row gap-2'>
                            <EventIcon sx={{ color: '#ef4444' }} />
                            <p className='text-base text-red-500 font-semibold'>21/03/2002 <span className='text-black'>| Travelling</span></p>
                        </div>
                        <div className='my-1 px-5'>
                            <p className='text-2xl text-black font-semibold'>Dubai Vlog</p>
                            <p className='text-base text-black font-semibold tracking-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam cumque iste animi sapiente quae est nobis, nihil consequatur amet sed?</p>
                        </div>
                    </div>
                    <div className='w-[85%] card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-1 relative rounded-xl'>
                        <img src={blogImage} alt='Blog_Image' className='rounded-xl' />
                        <div className='px-5 my-3 flex flex-row gap-2'>
                            <EventIcon sx={{ color: '#ef4444' }} />
                            <p className='text-base text-red-500 font-semibold'>21/03/2002 <span className='text-black'>| Travelling</span></p>
                        </div>
                        <div className='my-1 px-5'>
                            <p className='text-2xl text-black font-semibold'>Dubai Vlog</p>
                            <p className='text-base text-black font-semibold tracking-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam cumque iste animi sapiente quae est nobis, nihil consequatur amet sed?</p>
                        </div>
                    </div>
                    <div className='w-[85%] card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-1 relative rounded-xl'>
                        <img src={blogImage} alt='Blog_Image' className='rounded-xl' />
                        <div className='px-5 my-3 flex flex-row gap-2'>
                            <EventIcon sx={{ color: '#ef4444' }} />
                            <p className='text-base text-red-500 font-semibold'>21/03/2002 <span className='text-black'>| Travelling</span></p>
                        </div>
                        <div className='my-1 px-5'>
                            <p className='text-2xl text-black font-semibold'>Dubai Vlog</p>
                            <p className='text-base text-black font-semibold tracking-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam cumque iste animi sapiente quae est nobis, nihil consequatur amet sed?</p>
                        </div>
                    </div>
                    <div className='w-[85%] card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-1 relative rounded-xl'>
                        <img src={blogImage} alt='Blog_Image' className='rounded-xl' />
                        <div className='px-5 my-3 flex flex-row gap-2'>
                            <EventIcon sx={{ color: '#ef4444' }} />
                            <p className='text-base text-red-500 font-semibold'>21/03/2002 <span className='text-black'>| Travelling</span></p>
                        </div>
                        <div className='my-1 px-5'>
                            <p className='text-2xl text-black font-semibold'>Dubai Vlog</p>
                            <p className='text-base text-black font-semibold tracking-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam cumque iste animi sapiente quae est nobis, nihil consequatur amet sed?</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Blogs