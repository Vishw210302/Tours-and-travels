import CloseIcon from '@mui/icons-material/Close';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Description = ({ description }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 100;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <span className='text-[15px] font-normal mt-2 text-justify'>
                {isExpanded ? description : description?.slice(0, maxLength)}
                {description.length > maxLength && (
                    <button onClick={toggleExpanded} className='text-red-500 ml-2'>
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                )}
            </span>
        </div>
    );
};

const Modal = ({ isOpen, onClose, siteDetails }) => {

    const siteSeenImage = "http://192.168.1.45:7781/uploads/siteseen-image/"
    const [isExpanded, setIsExpanded] = useState(false);
    const maxWords = 45;

    if (!isOpen) return null;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const getDescription = (description) => {
        const words = description?.split(' ');
        return isExpanded ? description : words?.slice(0, maxWords).join(' ');
    };

    return (
        <div className='modal z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='modal-content bg-white rounded-lg p-5 w-[40%]'>
                <div className='flex justify-between'>
                    <p className='font-semibold text-lg'>{siteDetails?.SiteseenName}</p>
                    <CloseIcon
                        onClick={onClose}
                        sx={{
                            cursor: 'pointer',
                            color: '#ef4444',
                        }}
                    />
                </div>
                <div className='border border-gray-300 my-2'></div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='w-full'>
                        <img src={`${siteSeenImage}${siteDetails?.siteseen}`} alt={siteDetails?.SiteseenName} className='w-full h-48 object-cover rounded-lg' />
                    </div>
                    <div>
                        <p className='text-base'>{getDescription(siteDetails?.SiteseenDescription)}</p>
                        {siteDetails?.SiteseenDescription?.split(' ').length > maxWords && (
                            <button onClick={toggleExpanded} className='text-red-500'>
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Days = ({ data }) => {

    const [allDaysViseItenary, setAllDaysViseItenary] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedSiteSeen, setSelectedSiteSeen] = useState(null);

    const siteSeenImage = "http://192.168.1.45:7781/uploads/siteseen-image/"
    const defultImage = "http://192.168.1.45:7781/uploads/itenary-package/";

    useEffect(() => {
        if (data) {
            console.log(data, 'adta')
            setAllDaysViseItenary(data)
        } else {
            console.error("Expected data to be an array, but got:", data);
        }
    }, [data])

    const handleSiteseenModel = (siteSeen) => {
        setSelectedSiteSeen(siteSeen);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedSiteSeen(null);
    };

    return (
        <div className='w-[60%] h-[100%]'>
            {allDaysViseItenary && allDaysViseItenary.map((daysItenary, index) => {
                return (
                    <div key={index} className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'>
                        <p className='text-lg font-semibold'>Day {index + 1}</p>
                        <div className='grid grid-cols-2 mt-2'>
                            <div className='w-[100%]'>
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    loop={true}
                                    modules={[Autoplay]}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                >
                                    {daysItenary?.siteseens?.length > 0 ? (
                                        daysItenary.siteseens.map((siteseen, index) => {
                                            
                                            return (
                                                <SwiperSlide key={index}>
                                                    <img
                                                        src={`${siteSeenImage}${siteseen.siteseen}`}
                                                        alt={siteseen.siteseen}
                                                        className="w-[90%] h-48 rounded-lg"
                                                    />
                                                </SwiperSlide>
                                            )
                                        })
                                    ) : (
                                        <img
                                            src={`${defultImage}${daysItenary?.deFaultImage}`}
                                            alt={daysItenary?.deFaultImage}
                                            className="w-[90%] h-48 rounded-lg"
                                        />
                                    )}

                                </Swiper>
                            </div>

                            <div>
                                <div>
                                    <span className='text-[18px] text-black font-semibold'>{daysItenary?.title}</span>
                                </div>
                                <div>
                                    <Description description={daysItenary?.description} />
                                </div>
                                <div className='text-black font-semibold text-[15px] mt-2'>
                                    <p>Sight Seeing Included:</p>
                                </div>
                                <div className='flex'>
                                    {daysItenary?.siteseens && daysItenary.siteseens.map((siteseen, index) => {
                                        return (
                                            <div key={index} className='mt-1 cursor-pointer' onClick={() => handleSiteseenModel(siteseen)}>
                                                <span className='text-red-500 mx-1 font-semibold'>{siteseen?.SiteseenName}</span>
                                                {index < daysItenary.siteseens.length - 1 && '/'}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div>
                                    <div className='flex items-center gap-2'>
                                        {daysItenary?.meal && daysItenary?.meal.map((meal, index) => {
                                            return (
                                                <div key={index} className='flex items-center gap-1'>
                                                    <div>
                                                        <span><LunchDiningIcon fontSize="large" sx={{ color: '#ef4444' }} /></span>
                                                    </div>
                                                    <div>
                                                        <span>{meal}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            <div className='grid grid-cols-2 gap-4 w-[100%]'>
                <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg my-2 p-3'>
                    <p className='text-center text-[18px] font-semibold'>Inclusions</p>
                    <div className='mt-3 px-3'>
                        <p className='text-gray-800 mb-1'>Return Economy class Airfare Ex-Ahmedabad</p>
                        <p className='text-gray-800 mb-1'>3 Nights Stay in 4* Hotel - Singapore</p>
                        <p className='text-gray-800 mb-1'>2 Nights Stay in 4* Hotel - Genting Highland</p>
                        <p className='text-gray-800 mb-1'>1 Night Stay in 5* Hotel - Kuala Lumpur</p>
                        <p className='text-gray-800 mb-1'>Normal Visa Charges (Only Singapore Visa)</p>
                        <p className='text-gray-800 mb-1'>English Speaking Guide + Tour Manager</p>
                    </div>
                </div>

                <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg my-2 p-3'>
                    <p className='text-center text-[18px] font-semibold'>Exclusions</p>
                    <div className='mt-3'>
                        <p className='text-gray-800 mb-1'>GST & TCS</p>
                        <p className='text-gray-800 mb-1'>All personal expenses like tips, laundry, telephone calls/fax, alcoholic beverages, camera/video camera fees at monuments, medical expenses, airport departure tax, etc.</p>
                        <p className='text-gray-800 mb-1'>Anything not mentioned under Package Inclusions.</p>
                        <p className='text-gray-800 mb-1'>Travel Insurance</p>
                        <p className='text-gray-800 mb-1'>Cruise upgradation</p>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} siteDetails={selectedSiteSeen} />
        </div>
    )
}

export default Days;
