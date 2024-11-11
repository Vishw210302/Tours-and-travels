import '@fortawesome/fontawesome-free/css/all.min.css';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import WarningIcon from '@mui/icons-material/Warning';
import React, { useEffect, useState } from 'react';

const formatDate = (dateString) => {

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
};

const ReadMoreText = ({ text }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const words = text?.split(' ');
    const shortText = words?.slice(0, 100).join(' ');

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (

        <div>
            <p className='text-[15px] text-justify'>
                {isExpanded ? text : `${shortText}`}
            </p>
            {words?.length > 100 && (
                <button onClick={toggleReadMore} className="text-blue-500">
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </div>

    );
};

const About = ({ data, allData }) => {

    const [departureDates, setDepartureDates] = useState([]);
    const [allItenaryData, setAllItenaryData] = useState();

    useEffect(() => {
        if (Array.isArray(allData?.itenaryData?.departureDates)) {
            setDepartureDates(allData?.itenaryData?.departureDates);
        }
        setAllItenaryData(allData?.itenaryData);
    }, [allData]);

    const handleBrochureDownload = (fileUrl) => {
        if (fileUrl) {
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = fileUrl.split('/').pop();
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("File URL is not available.");
        }
    };

    const longText = data;

    return (
        <div className='flex justify-around w-[100%]'>

            <div className='w-[60%]'>

                <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'>
                    <h1 className='text-[20px] font-semibold text-red-500'>{allItenaryData?.packageTitle}</h1>
                    <div className='flex items-center gap-2 mt-2 border-b-2'>

                        <div className='flex items-center gap-2 mb-2'>
                            <AvTimerIcon fontSize="large" sx={{ color: '#ef4444' }} />
                            <div>
                                <p> Duration</p>
                                <p>{allItenaryData?.days?.length} days / {allItenaryData?.days?.length - 1} nights</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <WarningIcon fontSize="large" sx={{ color: '#ef4444' }} />
                            <div>
                                <p> Difficulty</p>
                                <p>Easy to Moderate</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <InterpreterModeIcon fontSize="large" sx={{ color: '#ef4444' }} />
                            <div>
                                <p> Age Group</p>
                                <p>16-35 years</p>
                            </div>
                        </div>

                    </div>

                    <div className='p-3'>
                        <div className='card rounded-lg bg-red-200 p-3'>
                            <p className='text-lg font-semibold'>Important Update</p>
                            <p className='text-sm'>If anything goes wrong, please contact us at +91 9173211901</p>
                        </div>
                    </div>

                </div>

                <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'>
                    <p className='text-[18px] font-medium'>About</p>
                    <ReadMoreText text={longText} />
                    <div>
                        <button
                            onClick={() => handleBrochureDownload(allData?.itenaryData?.fileUpload)}
                            className='bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300 mt-2'
                        >
                            Brochure <i className="fa-solid fa-download"></i>
                        </button>
                    </div>
                </div>

            </div>

            <div className='w-[25%] h-[100%]'>

                <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] p-3 transition-all duration-300 hover:shadow-lg'>

                    <div>
                        <span className='text-lg font-bold text-red-500'>₹{allItenaryData?.perPersonCost}</span>
                        <span className='text-md font-semibold text-red-500'> / person</span>
                    </div>

                    <div>
                        <p className='text-md'>Includes</p>
                    </div>

                    <div className='mt-4 grid grid-cols-[50%,50%]'>
                        <p><LocalDiningIcon /> Food</p>
                        <p><DirectionsBikeIcon /> Travelling</p>
                        <p><PersonIcon /> Instructor</p>
                        <p><LocalHospitalIcon /> First Aid</p>
                        <p><PaidIcon /> GST</p>
                        <p><ApartmentIcon /> Accommodation</p>
                    </div>

                    <div>
                        <button className='w-full bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300 mt-2'>
                            Book Now
                        </button>
                    </div>

                </div>

                <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2 flex flex-wrap'>
                    <p className='font-medium text-[15px] text-red-500 mr-1'>Dates:-</p>
                    {departureDates && departureDates.map((departureDate, index) => (
                        <p key={index} className='text-[15px] font-semibold'>
                            {formatDate(departureDate)}
                            {index < departureDates?.length - 1 && ' ,  '}
                        </p>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default About;