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

    const modalStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        px: 2,
    };

    const modalContentStyle = {
        position: 'relative',
        width: { xs: '90%', sm: '70%', md: '50%', lg: '40%' },
        maxHeight: '90vh',
        overflowY: 'auto',
        bgcolor: 'white',
        boxShadow: 24,
        borderRadius: 1,
    };

    const termAndConditionData = [
        "This is an Adventure Camp and not a leisure tour, so we expect a high level of discipline",
        "Participants will have to follow the instructions clearly given by the volunteer/guide, Misbehave/Arguing with the volunteers/guide/instructors will be considered as disciplinary issues",
        "Smoking, Alcohol, Tobacco & Abusive Language are strictly prohibited and if anyone found a suspect in such cases, the participation will be terminated and no further service/return traveling/refund will be offered then after",
        "Accommodation & Sanitary Facilities for Girls & Boys are separate",
        "Punctuality is taken as a serious matter",
    ];

    const bookingTermData = [
        "This is an Adventure Camp and not a leisure tour, so we expect a high level of discipline.",
        "Participants will have to follow the instructions clearly given by the volunteer/guide. Misbehavior/arguing with the volunteers/guide/instructors will be considered as disciplinary issues.",
        "Smoking, Alcohol, Tobacco & Abusive Language are strictly prohibited. If anyone is found suspect in such cases, the participation will be terminated, and no further service/return traveling/refund will be offered thereafter.",
        "Accommodation & Sanitary Facilities for Girls & Boys are separate.",
        "Punctuality is taken as a serious matter.",
    ];

    const cancellationPolicyData = [
        "This is an Adventure Camp and not a leisure tour, so we expect a high level of discipline.",
        "Participants will have to follow the instructions clearly given by the volunteer/guide. Misbehaving/arguing with the volunteers/guide/instructors will be considered as disciplinary issues.",
        "Smoking, Alcohol, Tobacco & Abusive Language are strictly prohibited. If anyone is found suspect in such cases, the participation will be terminated, and no further service/return traveling/refund will be offered thereafter.",
        "Accommodation & Sanitary Facilities for Girls & Boys are separate.",
        "Punctuality is taken as a serious matter.",
    ];

    return (
        <>
            <div className='grid sm:grid-cols-3 grid-cols-1 gap-4 w-full'>
                <div
                    className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'
                    onClick={handleTermAndConditionModalOpen}
                >
                    <div className='flex justify-between items-center cursor-pointer'>
                        <h1 className='text-center font-semibold text-lg text-[#ef4444]'>Terms & Conditions</h1>
                        <span className='text-center font-semibold text-base'>
                            <ArrowRightAltIcon fontSize="large" sx={{ color: '#ef4444' }} />
                        </span>
                    </div>
                </div>
                <div
                    className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'
                    onClick={handleBookingTermsModalOpen}
                >
                    <div className='flex justify-between items-center cursor-pointer'>
                        <h1 className='text-center font-semibold text-lg text-[#ef4444]'>Booking Terms</h1>
                        <span className='text-center font-semibold text-base'>
                            <ArrowRightAltIcon fontSize="large" sx={{ color: '#ef4444' }} />
                        </span>
                    </div>
                </div>
                <div
                    className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'
                    onClick={handleCancellationModalOpen}
                >
                    <div className='flex justify-between items-center cursor-pointer'>
                        <h1 className='text-center font-semibold text-lg text-[#ef4444]'>Cancellation Policy</h1>
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
                sx={modalStyle}
            >
                <Box sx={modalContentStyle}>
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
                            <p className='text-red-500 font-semibold text-[15px] sm:text-[21px] text-center'>Terms & Condition</p>
                        </div>
                        <div className='px-[28px] py-[15px]'>
                            <div className='mb-3'>
                                <span className='text-red-500 text-[15px] sm:text-[21px] font-semibold text-center tracking-widest'>
                                    Discipline
                                </span>
                            </div>
                            <div className="mt-1">
                                {termAndConditionData.map((item, index) => (
                                    <div key={index} className="flex mb-3">
                                        <ArrowForwardIcon
                                            className="text-[#ef4444] mr-1"
                                        />
                                        <p className="text-[14px] sm:text-[15px] text-gray-600">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openBookingTermModal}
                onClose={handleBookingTermsModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={modalStyle}
            >
                <Box sx={modalContentStyle}>
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
                            <p className='text-red-500 text-[18px] sm:text-[21px] font-semibold text-center'>Booking Terms</p>
                        </div>
                        <div className='px-[28px] py-[15px]'>
                            <div className='mb-3'>
                                <span className='text-red-500 text-[16px] sm:text-[21px] font-semibold text-center tracking-widest'>
                                    Discipline
                                </span>
                            </div>
                            <div className="mt-1">
                                {bookingTermData.map((term, index) => (
                                    <div key={index} className="flex mb-3">
                                        <ArrowForwardIcon
                                            className="text-[#ef4444] mr-1"
                                        />
                                        <p className="text-sm text-gray-600">{term}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openCancellationModal}
                onClose={handleCancellationModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={modalStyle}
            >
                <Box sx={modalContentStyle}>
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
                            <p className='text-red-500 text-[18px] sm:text-[21px] font-semibold text-center'>Cancellation Policy</p>
                        </div>
                        <div className='px-[28px] py-[15px]'>
                            <div className='mb-3'>
                                <span className='text-red-500 text-[16px] sm:text-[21px] font-semibold text-center tracking-widest'>
                                    Discipline
                                </span>
                            </div>
                            <div className="mt-1">
                                {cancellationPolicyData.map((policy, index) => (
                                    <div key={index} className="flex mb-3">
                                        <ArrowForwardIcon className="text-[#ef4444] mr-1" />
                                        <p className="text-[14px] sm:text-[18px] text-gray-600">{policy}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default TermsAndConditionsCard;
