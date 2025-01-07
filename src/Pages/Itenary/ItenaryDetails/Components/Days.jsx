import CloseIcon from '@mui/icons-material/Close';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import React, { memo, useCallback, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const DESCRIPTION_MAX_LENGTH = 100;
const MODAL_DESCRIPTION_MAX_WORDS = 45;

const Description = memo(({ description }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    if (!description) return null;

    const displayText = isExpanded ? description : description.slice(0, DESCRIPTION_MAX_LENGTH);
    const shouldShowButton = description.length > DESCRIPTION_MAX_LENGTH;

    return (
        <div>
            <span className='sm:text-[16px] text-[13px] font-normal text-justify'>
                {displayText}
                {shouldShowButton && (
                    <button
                        onClick={toggleExpanded}
                        className='text-red-500 sm:text-[16px] text-[13px] font-medium ml-2 hover:border-b-2 hover:border-red-400'
                    >
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                )}
            </span>
        </div>
    );
});

Description.displayName = 'Description';

const ImageModal = memo(({ isOpen, onClose, imageUrl }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative max-w-4xl w-full mx-4">
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white hover:text-gray-300"
                >
                    <CloseIcon />
                </button>
                <img
                    src={imageUrl}
                    alt="Modal"
                    className="w-full h-auto rounded-lg"
                />
            </div>
        </div>
    );
});

ImageModal.displayName = 'ImageModal';

const SiteModal = memo(({ isOpen, onClose, siteDetails }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    const siteSeenImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/siteseen-image/`;

    if (!isOpen || !siteDetails) return null;

    const toggleExpanded = () => setIsExpanded(prev => !prev);

    const getDescription = (description) => {
        if (!description) return '';
        const words = description.split(' ');
        return isExpanded ? description : words.slice(0, MODAL_DESCRIPTION_MAX_WORDS).join(' ');
    };

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setModalImage(null);
    };

    return (
        <>
            <div className='modal z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <div className='modal-content bg-white rounded-lg p-5 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-[74vh] overflow-y-auto'>
                    <div className='flex justify-between items-center'>
                        <p className='font-semibold text-red-500 text-lg'>{siteDetails.SiteseenName}</p>
                        <button onClick={onClose}>
                            <CloseIcon sx={{ color: '#ef4444', cursor: 'pointer' }} />
                        </button>
                    </div>
                    <div className='border border-gray-300 my-2' />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div
                            className='w-full cursor-pointer'
                            onClick={() => handleImageClick(`${siteSeenImage}${siteDetails.siteseen}`)}
                        >
                            <img
                                src={`${siteSeenImage}${siteDetails.siteseen}`}
                                alt={siteDetails.SiteseenName}
                                className='w-full h-48 object-cover rounded-lg'
                            />
                        </div>
                        <div>
                            <p className='text-base text-justify'>
                                {getDescription(siteDetails.SiteseenDescription)}
                            </p>
                            {siteDetails.SiteseenDescription?.split(' ').length > MODAL_DESCRIPTION_MAX_WORDS && (
                                <button
                                    onClick={toggleExpanded}
                                    className='text-red-500 text-[16px] font-medium ml-2'
                                >
                                    {isExpanded ? 'Read Less' : 'Read More'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ImageModal
                isOpen={isImageModalOpen}
                onClose={closeImageModal}
                imageUrl={modalImage}
            />
        </>
    );
});

SiteModal.displayName = 'SiteModal';

const SiteSeenList = memo(({ siteseens, onSiteClick }) => {
    if (!siteseens?.length) return null;

    return (
        <div>
            <div className='text-black font-bold text-[12px] sm:text-[15px] mt-3'>
                <p>Sight Seeing Included:</p>
            </div>
            <div className='flex flex-wrap gap-2'>
                {siteseens.map((siteseen, index) => (
                    <div key={siteseen.SiteseenName} onClick={() => onSiteClick(siteseen)}>
                        <p className='text-[14px] sm:text-[18px] cursor-pointer font-semibold text-red-500'>
                            {siteseen.SiteseenName}
                            {index < siteseens.length - 1 && ' /'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
});

SiteSeenList.displayName = 'SiteSeenList';

const Days = ({ days }) => {

    const [allDaysViseItenary, setAllDaysViseItenary] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedSiteSeen, setSelectedSiteSeen] = useState(null);

    const siteSeenImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/siteseen-image/`;
    const defaultImage = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/packages-Image/`;

    useEffect(() => {
        if (days) {
            setAllDaysViseItenary(days);
        }
    }, [days]);

    const handleSiteseenModel = useCallback((siteSeen) => {
        setSelectedSiteSeen(siteSeen);
        setModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalOpen(false);
        setSelectedSiteSeen(null);
    }, []);

    return (
        <div>
            {allDaysViseItenary?.map((daysItenary, index) => (
                <div
                    key={`day-${index}`}
                    className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'
                >
                    <span className='text-lg text-red-500 font-bold'>Day {index + 1}</span>
                    <div className='grid grid-cols-2 mt-2'>
                        <div className='w-[100%]'>
                            {daysItenary?.siteseens?.length > 0 ? (
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
                                    {daysItenary.siteseens.map((siteseen) => (
                                        <SwiperSlide key={siteseen.SiteseenName}>
                                            <img
                                                src={`${siteSeenImage}${siteseen.siteseen}`}
                                                alt={siteseen.SiteseenName}
                                                className="w-[90%] h-48 rounded-lg"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <img
                                    src={`${defaultImage}${daysItenary.deFaultImage}`}
                                    alt={daysItenary.title}
                                    className="w-[90%] h-48 rounded-lg"
                                />
                            )}
                        </div>

                        <div>
                            <div className='mb-2'>
                                <span className='text-[14px] sm:text-[16px] text-red-500 lowercase font-bold'>
                                    {daysItenary.title}
                                </span>
                            </div>
                            <Description description={daysItenary.description} />
                            <SiteSeenList
                                siteseens={daysItenary.siteseens}
                                onSiteClick={handleSiteseenModel}
                            />
                            {daysItenary?.meal?.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3">
                                    {daysItenary.meal.map((meal, index) => (
                                        <div key={`meal-${index}`} className="flex items-center gap-2">
                                            <LunchDiningIcon
                                                fontSize="large"
                                                sx={{ color: '#ef4444' }}
                                            />
                                            <span>{meal}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            <SiteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                siteDetails={selectedSiteSeen}
            />
        </div>
    );
};

export default memo(Days);