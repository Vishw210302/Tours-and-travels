import '@fortawesome/fontawesome-free/css/all.min.css';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import WarningIcon from '@mui/icons-material/Warning';
import React, { useEffect, useState } from 'react';
import { useAllApiContext } from '../../../../Context/allApiContext';
import PackagesBookingModal from '../../../AllPackages/PackagesBookingModal';
import StripePayment from '../../../Payment/PaymentForm';
import Modal from '../../../Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import PaymentSuccess from '../../../Payment/PaymentSuccess';
import { useAddItenaryParsonDetailsMutation } from '../../../../Api/Api';
import { useNavigate } from 'react-router-dom';

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
    const [importantUpdate, setImportantUpdate] = useState([]);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [paymentModelOpen, setPaymentModelOpen] = useState(false);
    const [stripeModalOpen, setStripeModalOpen] = useState(false)
    const [payMentSucessodalOpen, setPaymentsucessModelOpen] = useState(false)
    const [personDetails, setPersonDetails] = useState({})
    const [handlePersonDetailsApi] = useAddItenaryParsonDetailsMutation()
    const { settingData } = useAllApiContext()
    const [paymentId, setPaymentId] = useState('')
    const navigate = useNavigate()
    const longText = data;

    const handlePackageBookingModal = () => {
        setBookingModalOpen(true)
    }

    const handleBrochureDownload = (urlOfFiles) => {
        const brochureUrl = urlOfFiles
        const a = document.createElement('a');
        a.href = brochureUrl;
        a.download = 'Brochure.pdf';
        a.click();
    }

    useEffect(() => {
        setImportantUpdate(settingData?.data || []);
    }, [settingData]);

    useEffect(() => {
        if (Array.isArray(allData?.itenaryData?.departureDates)) {
            setDepartureDates(allData?.itenaryData?.departureDates);
        }
        setAllItenaryData(allData?.itenaryData);
    }, [allData]);

    const openStraipeModel = (itenryData) => {
        setPersonDetails(itenryData)
        setStripeModalOpen(true)
        setBookingModalOpen(false)
    }

    const handlePaymentSuccess = async (details) => {

        // const personDetails = {
        //     formData: {
        //         name: 'Ajay varma',
        //         mobile: '9173211901',
        //         email: 'varmaajay182@gmail.com',
        //         departureDate: '2024-11-21T00:00:00.000Z',
        //         adults: '2',
        //         childrenWithoutBed: '2',
        //         infants: 2,
        //         percentageSelection: '10'
        //     },
        //     payPrice: 8304.89,
        //     itenaryId: '672b6de28f03f504db1eed74',
        //     remainingBalance: 149488.02
        // }

        try {

            const payload = {
                paymentId: details?.id,
                personDetail: personDetails.formData,
                payPrice: personDetails.payPrice,
                itenaryId: allItenaryData._id,
                remainingBalance: personDetails.remainingBalance
            }

            const response = await handlePersonDetailsApi(payload).unwrap();

            if (response.status === 201) {
                setPaymentId(details?.id)
                setStripeModalOpen(false)
                setPaymentsucessModelOpen(true)

            }  else {
                console.log('Unexpected response:', response);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
       
    }

    const openBookingConfirmPage = ()=>{
        setPaymentsucessModelOpen(false)
        navigate(`/itenary-details/${allData?._id}`);
        toast.success("Itenary booked successfully! Your payment details have been recorded.");
    }

    return (
        <>
            <div className='flex justify-around w-[100%]'>

                <div className='w-[60%]'>

                    <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'>
                        <h1 className='text-[20px] font-semibold text-red-500'>{allItenaryData?.packageTitle}</h1>
                        <div className='flex items-center gap-3 mt-2 border-b-2'>

                            <div className='flex items-center gap-2 mb-2'>
                                <AvTimerIcon
                                    fontSize="large"
                                    sx={{
                                        color: '#ef4444'
                                    }}
                                />
                                <div>
                                    <p> Duration</p>
                                    <p>{allItenaryData?.days?.length} days / {allItenaryData?.days?.length - 1} nights</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-2'>
                                <WarningIcon
                                    fontSize="large"
                                    sx={{
                                        color: '#ef4444'
                                    }}
                                />
                                <div>
                                    <p> Difficulty</p>
                                    <p>Easy to Moderate</p>
                                </div>
                            </div>

                        </div>

                        {Array.isArray(importantUpdate) && importantUpdate.map((items, index) => {
                            if (items?.keyName === "about_update") {
                                return (
                                    <div key={index + "Key"} className='p-3'>
                                        <div className='card rounded-lg bg-red-200 p-3'>
                                            <p className='text-lg font-semibold'>Important Update</p>
                                            <p className='text-sm'>{items?.valueContent}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>

                    <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-3 my-2'>

                        {longText && longText.length > 0 ?
                            <>
                                <p className='text-[18px] text-red-500 font-medium'>About</p>
                                <ReadMoreText text={longText} />
                            </>
                            : <></>
                        }

                        <div>
                            <button
                                onClick={() => {
                                    handleBrochureDownload(allItenaryData?.fileUpload)
                                }}
                                className='bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300 mt-2'
                            >
                                Brochure <i className="fa-solid fa-download"></i>
                            </button>
                        </div>

                    </div>

                </div>

                <div className='w-[25%] h-[100%]'>
                    <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] p-3 transition-all duration-300 hover:shadow-lg'>

                        <div>
                            <span className='text-[20px] font-bold text-red-500'>₹{allItenaryData?.perPersonCost}</span>
                            <span className='text-md font-semibold text-red-500'> / person</span>
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
                            <button
                                onClick={() => {
                                    handlePackageBookingModal()
                                }}
                                className='w-full bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300 mt-2'
                            >
                                Book Now
                            </button>
                        </div>

                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-4 mt-2">
                        <h3 className="text-lg font-medium mb-2">Departure Dates:</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {departureDates && departureDates.map((departureDate, index) => {
                                return (
                                    <div
                                        key={index + "key"}
                                        className="bg-gray-100 rounded-md p-3 text-center hover:bg-gray-200 transition-colors"
                                    >
                                        <p className="text-gray-700 font-medium">
                                            {new Date(departureDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div >

            <PackagesBookingModal
                bookingModalOpen={bookingModalOpen}
                setBookingModalOpen={setBookingModalOpen}
                allData={allData}
                openStraipeModel={openStraipeModel}
            />

            <Modal isOpen={stripeModalOpen} onClose={() => setStripeModalOpen(false)}>
                <StripePayment onPaymentSuccess={handlePaymentSuccess} personDetails={personDetails} description="Payment for itenary" />
            </Modal>

            <Modal isOpen={payMentSucessodalOpen} onClose={() => setPaymentsucessModelOpen(false)} hideCloseButton={true}>
                <PaymentSuccess openBookingConfirmPage={openBookingConfirmPage} paymentId={paymentId} payPrice = {personDetails?.payPrice } title={'Itenary Booking'}/>
            </Modal>

            <ToastContainer
                position="top-right"
                className="toast-container"
                draggable="true"
            />
        </>
    );
}

export default About;