import React, { useState, useEffect } from 'react';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { useFlightTicketsDetailsContext } from '../../Context/FlightTicketsDetailsContext';

const PaymentSuccess = ({ openBookingConfirmPage, paymentId, payPrice, title }) => {

    const [countdown, setCountdown] = useState(5);
    const [showContent, setShowContent] = useState(false);
    const [animationClass, setAnimationClass] = useState('translate-y-full opacity-0');
    const {totalTicketPrice} = useFlightTicketsDetailsContext();

    const formatDate = (date) => {
        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${String(hours % 12 || 12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;

        return `${formattedDate} | ${formattedTime}`;
    };

    const now = new Date();
    const walletAddress = paymentId;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAddress)
            .then(() => {
                alert('Copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    useEffect(() => {

        setTimeout(() => {
            setAnimationClass('translate-y-0 opacity-100');
            setShowContent(true);
        }, 1000);

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    openBookingConfirmPage()
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='bg-white w-full rounded-lg h-[673px]'>
            <div className={`w-full rounded-t-lg h-[73%] bg-[#40A639] flex justify-center items-center transition-transform duration-1000 ${animationClass}`}>
                <div className='text-center'>
                    <div className='w-full justify-center items-center flex'>
                        <div className='w-24 h-24 flex justify-center p-1 items-center bg-white bg-opacity-50 rounded-full'>
                            <div className={`w-[90%] h-[90%] rounded-full bg-white flex items-center justify-center transition-all duration-500`}>
                                <svg className="w-8 h-8 text-green-500 text-xl font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className='text-white text-xl font-semibold mt-6'>
                        Payment Successful
                    </div>

                    <div className='text-white text-2xl font-semibold mt-6'>
                        ₹{payPrice? payPrice : totalTicketPrice}
                    </div>
                </div>
            </div>
            {showContent && ( // Conditionally render content after animation
                <div className='mt-3 ml-3'>
                    <div>
                        <div className='text-lg font-semibold'>
                            {title}
                        </div>
                        <p className='text-sm font-normal'>{formatDate(now)}</p>
                    </div>
                    <div className='flex my-6'>
                        <p className='text-lg font-light mr-2'>Wallet |</p>
                        <p className='mr-2'>{walletAddress}</p>
                        <p onClick={copyToClipboard} className='cursor-pointer'><CopyAllIcon /></p>
                    </div>

                    <div className='mt-8'>
                        <div className='text-blue-500 underline cursor-pointer'>
                            Redirecting in {countdown} seconds...
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;
