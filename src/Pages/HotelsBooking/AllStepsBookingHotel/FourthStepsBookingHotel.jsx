import React, { useState } from 'react';
import StripePayment from '../../Payment/PaymentForm';
import Modal from '../../Modal/Modal';
import { useProcessHotelPaymentMutation } from '../../../Api/Api';
import { useAllApiContext } from '../../../Context/allApiContext';
import PaymentSuccess from '../../Payment/PaymentSuccess';
import { useNavigate } from 'react-router-dom';

const FourthStepsBookingHotel = ({finalHotelPrice}) => {

    const [paymentModal, setPaymentModal] = useState(false)
    const [paymentSuccessModal, setPaymentSuccessModal] = useState(false)
    const navigate = useNavigate();
    const [personDetails, setPersonDetails] =useState('')
    const {hotelBookingDetails} = useAllApiContext()
    const [paymentId, setPaymentId] = useState(null)
    const [processHotelPayment] = useProcessHotelPaymentMutation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: '',
        idProof: null
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, idProof: e.target.files[0] });
        if (errors.idProof) {
            setErrors({ ...errors, idProof: '' });
        }
    };

    const validate = () => {
        let formErrors = {};

        if (!formData.firstName) {
            formErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName) {
            formErrors.lastName = 'Last Name is required';
        }
        if (!formData.email) {
            formErrors.email = 'Email Address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email Address is invalid';
        }
        if (!formData.phone) {
            formErrors.phone = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            formErrors.phone = 'Phone Number is invalid';
        }
        if (!formData.idProof) {
            formErrors.idProof = 'ID Proof is required';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setPersonDetails({
            formData: {
                ...formData,
                name: `${formData.firstName} ${formData.lastName}` 
            },
            payPrice:finalHotelPrice
        })

        setPaymentModal(true)

        if (validate()) {

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                specialRequests: '',
                idProof: null
            });
            setErrors({});
        }
    };

    const handlePaymentSuccess = async (paymentDetail)=> {

        try{
            const payload = {
                hotelBookingDetails,
                personDetails: personDetails.formData,
                bookingAmount: personDetails.payPrice,
                paymentId:paymentDetail.id
            }

          const bookingRes =  await processHotelPayment(payload).unwrap()

          if(bookingRes.success){
            setPaymentId(paymentDetail.id)
            setPaymentModal(false)
            setPaymentSuccessModal(true)
          }

        }catch(err){
            console.log('hotel payment', err)
        }

    }

    const handleRedirect = ()=> {
        navigate({pathname:"/hotels"})
    }

    return (
        <>
            <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 w-[95%] h-fit'>
                <div>
                    <p className='text-2xl font-semibold text-gray-500 mb-4'>Billing Information</p>

                    <form onSubmit={handleSubmit}>

                        <div className='flex flex-row gap-2 items-center'>

                            <div className="mb-4 w-[100%]">
                                <div className='flex flex-row gap-1'>
                                    <label className="block text-base font-medium text-gray-500 h-fit">First Name :-</label>
                                    <span className='text-red-500 text-2xl h-fit font-semibold'>*</span>
                                </div>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${errors.firstName ? 'border-red-500' : ''}`}
                                    placeholder="Enter your first name"
                                />
                                {errors.firstName && <p className="text-red-500 text-md font-normal">{errors.firstName}</p>}
                            </div>

                            <div className="mb-4 w-[100%]">
                                <div className='flex flex-row gap-1'>
                                    <label className="block text-base font-medium text-gray-700">Last Name</label>
                                    <span className='text-red-500 text-2xl h-fit font-semibold'>*</span>
                                </div>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${errors.lastName ? 'border-red-500' : ''}`}
                                    placeholder="Enter your last name"
                                />
                                {errors.lastName && <p className="text-red-500 text-md font-normal">{errors.lastName}</p>}
                            </div>

                        </div>

                        <div className='flex flex-row gap-2 items-center'>

                            <div className="mb-4 w-[100%]">
                                <div className='flex flex-row gap-1'>
                                    <label className="block text-base font-medium text-gray-700">Email Address</label>
                                    <span className='text-red-500 text-2xl h-fit font-semibold'>*</span>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500 text-md font-normal">{errors.email}</p>}
                            </div>

                            <div className="mb-4 w-[100%]">
                                <div className='flex flex-row gap-1'>
                                    <label className="block text-base font-medium text-gray-700">Phone Number</label>
                                    <span className='text-red-500 text-2xl h-fit font-semibold'>*</span>
                                </div>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${errors.phone ? 'border-red-500' : ''}`}
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && <p className="text-red-500 text-md font-normal">{errors.phone}</p>}
                            </div>

                        </div>

                        <div className='flex flex-row gap-2 items-center'>

                            <div className="mb-4 w-[100%]">
                                <label className="block text-base font-medium text-gray-700">Special Requests</label>
                                <textarea
                                    name="specialRequests"
                                    value={formData.specialRequests}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                    rows="3"
                                    placeholder="Add any special requests"
                                ></textarea>
                            </div>

                            <div className="mb-4 w-[100%]">
                                <div className='flex flex-row gap-1'>
                                    <label className="block text-base font-medium text-gray-700">
                                        Upload Documents (ID Proof)
                                        <span className='text-red-500 text-2xl h-fit font-semibold'>*</span>
                                        <p className="text-sm text-gray-500 mb-2">
                                            Please upload a valid ID proof for security purposes. Accepted formats: PDF, JPG, PNG.
                                        </p>
                                    </label>
                                </div>

                                <input
                                    type="file"
                                    name="idProof"
                                    onChange={handleFileChange}
                                    className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${errors.idProof ? 'border-red-500' : ''}`}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                                {errors.idProof && <p className="text-red-500 text-md font-normal">{errors.idProof}</p>}
                            </div>

                        </div>

                        <div className='flex flex-row justify-center'>
                            <button
                                type="submit"
                                className="bg-red-400 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-500 transition duration-200"
                            >
                                Confirm Booking ( ₹{finalHotelPrice})
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            <Modal isOpen={paymentModal} onClose={() => setPaymentModal(false)}>
                <StripePayment onPaymentSuccess={handlePaymentSuccess} personDetails={personDetails} description="Payment for itenary" />
            </Modal>

            <Modal isOpen={paymentSuccessModal} onClose={() => setPaymentSuccessModal(false)} hideCloseButton={true}>
                <PaymentSuccess openBookingConfirmPage={handleRedirect} paymentId={paymentId} payPrice = {personDetails?.payPrice } title={'Hotel Booking'}/>
            </Modal>

        </>
    );
};

export default FourthStepsBookingHotel;