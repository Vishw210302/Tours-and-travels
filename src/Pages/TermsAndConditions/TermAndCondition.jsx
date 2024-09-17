import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const TermsAndConditionsCard = () => {

    const [openTermAndConditionModal, setOpenTermAndConditionModal] = useState(false);
    const [openBookingTermModal, setOpenBookingTermModal] = useState(false);
    const [openCancellationModal, setOpenCancellationModal] = useState(false);

    const handleTermAndConditionModalOpen = () => {
        setOpenTermAndConditionModal(true);
    };

    const handleCloseTermAndConditionModal = () => {
        setOpenTermAndConditionModal(false);
    };

    const handleBookingTermsModalOpen = () => {
        setOpenBookingTermModal(true);
    };

    const handleBookingTermsModalClose = () => {
        setOpenBookingTermModal(false);
    };

    const handleCancellationModalOpen = () => {
        setOpenCancellationModal(true);
    };

    const handleCancellationModalClose = () => {
        setOpenCancellationModal(false);
    };

    return (
        <>
            <div className='grid grid-cols-3 gap-4 w-full'>
                <div
                    className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'
                    onClick={handleTermAndConditionModalOpen}
                >
                    <div className='flex justify-between items-center'>
                        <h1 className='text-center font-semibold text-base text-[#ef4444]'>Terms & Conditions</h1>
                        <span className='text-center font-semibold text-base'>
                            <ArrowRightAltIcon fontSize="large" sx={{ color: '#ef4444' }} />
                        </span>
                    </div>
                </div>
                <div
                    className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'
                    onClick={handleBookingTermsModalOpen}
                >
                    <div className='flex justify-between items-center'>
                        <h1 className='text-center font-semibold text-base text-[#ef4444]'>Booking Terms</h1>
                        <span className='text-center font-semibold text-base'>
                            <ArrowRightAltIcon fontSize="large" sx={{ color: '#ef4444' }} />
                        </span>
                    </div>
                </div>
                <div
                    className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'
                    onClick={handleCancellationModalOpen}
                >
                    <div className='flex justify-between items-center'>
                        <h1 className='text-center font-semibold text-base text-[#ef4444]'>Cancellation Policy</h1>
                        <span className='text-center font-semibold text-base'>
                            <ArrowRightAltIcon fontSize="large" sx={{ color: '#ef4444' }} />
                        </span>
                    </div>
                </div>
            </div>

            <Modal
                open={openTermAndConditionModal}
                onClose={handleCloseTermAndConditionModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}>
                    <Box sx={{
                        position: 'relative',
                        width: '30%',
                        bgcolor: 'white',
                        boxShadow: 24,
                        borderRadius: 1,
                    }}>
                        <CloseIcon
                            onClick={handleCloseTermAndConditionModal}
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                cursor: 'pointer',
                                color: '#ef4444',
                            }}
                        />
                        <div>
                            <div className='p-3 border-b-2'>
                                <p>Terms & Condition</p>
                            </div>
                            <div className='p-3'>
                                <div>
                                    <span className='text-[18px] text-gray-500 font-semibold tracking-widest'>Discipline</span>
                                </div>
                                <div className='mt-1'>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600 '>This is an Adventure Camp and not a leisure tour, so we expect a high level of discipline</p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>Participants will have to follow the instructions clearly given by the volunteer/guide, Misbehave/Arguing with the volunteers/guide/instructors will be considered as disciplinary issues
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>Smoking, Alcohol, Tobacco & Abusive Language are strictly prohibited and if anyone found a suspect in such cases, the participation will be terminated and no further service/return traveling/refund will be offered then after
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>Accommodation & Sanitary Facilities for Girls & Boys are separate</p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>Punctuality is taken as a serious matter
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-3'>
                                <div>
                                    <span className='text-[18px] text-gray-500 font-semibold tracking-widest'>Discipline</span>
                                </div>
                                <div className='mt-1'>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>
                                            ✓ In case of unforeseen conditions, the schedule/itinerary can be modified/canceled
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>
                                            ✓ Invincible reserves all rights to cancel/shorten/modify the itinerary, and the final decision is authorized with the trustee team
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Box>
            </Modal >

            <Modal
                open={openBookingTermModal}
                onClose={handleBookingTermsModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}>
                    <Box sx={{
                        position: 'relative',
                        width: '30%',
                        bgcolor: 'white',
                        boxShadow: 24,
                        borderRadius: 1,
                    }}>
                        <CloseIcon
                            onClick={handleBookingTermsModalClose}
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                cursor: 'pointer',
                                color: '#ef4444',
                            }}
                        />
                        <div>
                            <div className='p-3 border-b-2'>
                                <p>Booking Terms</p>
                            </div>
                            <div className='p-3'>
                                <div>
                                    <span className='text-[18px] text-gray-500 font-semibold tracking-widest'>Discipline</span>
                                </div>
                                <div className='mt-1'>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600 '>This is an Adventure Camp and not a leisure tour, so we expect a high level of discipline</p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>Participants will have to follow the instructions clearly given by the volunteer/guide, Misbehave/Arguing with the volunteers/guide/instructors will be considered as disciplinary issues
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>Smoking, Alcohol, Tobacco & Abusive Language are strictly prohibited and if anyone found a suspect in such cases, the participation will be terminated and no further service/return traveling/refund will be offered then after
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>Accommodation & Sanitary Facilities for Girls & Boys are separate</p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>Punctuality is taken as a serious matter
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-3'>
                                <div>
                                    <span className='text-[18px] text-gray-500 font-semibold tracking-widest'>Discipline</span>
                                </div>
                                <div className='mt-1'>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>
                                            ✓ In case of unforeseen conditions, the schedule/itinerary can be modified/canceled
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>
                                            ✓ Invincible reserves all rights to cancel/shorten/modify the itinerary, and the final decision is authorized with the trustee team
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={openCancellationModal}
                onClose={handleCancellationModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}>
                    <Box sx={{
                        position: 'relative',
                        width: '30%',
                        bgcolor: 'white',
                        boxShadow: 24,
                        borderRadius: 1,
                    }}>
                        <CloseIcon
                            onClick={handleCancellationModalClose}
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                cursor: 'pointer',
                                color: '#ef4444',
                            }}
                        />
                        <div>
                            <div className='p-3 border-b-2'>
                                <p>Cancellation Policy</p>
                            </div>
                            <div className='p-3'>
                                <div>
                                    <span className='text-[18px] text-gray-500 font-semibold tracking-widest'>Discipline</span>
                                </div>
                                <div className='mt-1'>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600 '>This is an Adventure Camp and not a leisure tour, so we expect a high level of discipline</p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>Participants will have to follow the instructions clearly given by the volunteer/guide, Misbehave/Arguing with the volunteers/guide/instructors will be considered as disciplinary issues
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>Smoking, Alcohol, Tobacco & Abusive Language are strictly prohibited and if anyone found a suspect in such cases, the participation will be terminated and no further service/return traveling/refund will be offered then after
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>Accommodation & Sanitary Facilities for Girls & Boys are separate</p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>Punctuality is taken as a serious matter
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-3'>
                                <div>
                                    <span className='text-[18px] text-gray-500 font-semibold tracking-widest'>Discipline</span>
                                </div>
                                <div className='mt-1'>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>
                                            ✓ In case of unforeseen conditions, the schedule/itinerary can be modified/canceled
                                        </p>
                                    </div>
                                    <div className='flex'>
                                        <ArrowForwardIcon className='text-[#ef4444] mr-1' fontSize='small' />
                                        <p className='text-sm text-gray-600'>
                                            ✓ Invincible reserves all rights to cancel/shorten/modify the itinerary, and the final decision is authorized with the trustee team
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default TermsAndConditionsCard;
