import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFlightTicketsDetailsContext } from '../../../Context/FlightTicketsDetailsContext';
import { usePassenger } from '../../../Context/PassengerCountContext';
import { useAddPassengerDetailsMutation, useGetPassengerDetailsByEmailQuery } from '../../../Api/Api';
import { ToastContainer, toast } from 'react-toastify';

const PassengerDetails = ({ flightId }) => {
  const { id, className } = useParams();
  const navigate = useNavigate();
  const { passengerCount } = usePassenger();
  const { passengerPersonalDetails, setPassengerPersonalDetails } = useFlightTicketsDetailsContext();
  const [email, setEmail] = useState('')

  
  const {
    data: storeDPassengerData,
    isSuccess: isPassengerDataFetched,
    isError: isPassengerDataError,
    error: passengerFetchError
  } = useGetPassengerDetailsByEmailQuery(email)

 

  const [submitPassengerDetails, {
    data,
    isSuccess,
    isLoading,
    isError,
    error
  }] = useAddPassengerDetailsMutation();

  const [errors, setErrors] = useState({});

  const totalPassengers =
    Number(passengerCount.adult) +
    Number(passengerCount.children)

  const [details, setDetails] = useState({
    passengerDetailsData: passengerPersonalDetails?.passengerDetailsData?.length > 0
      ? passengerPersonalDetails.passengerDetailsData
      : Array(totalPassengers).fill().map(() => ({
        fullName: '',
        age: '',
        gender: ''
      })),
    contactDetails: passengerPersonalDetails?.contactDetails || {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    var savedEmail = localStorage.getItem('email');
    setEmail(savedEmail)
    // console.log(savedEmail, 'savedEmailsavedEmail')
  }, []);

  useEffect(() => {

    if (isSuccess) {
      console.log(data?.email, "data data")
      localStorage.setItem('email', data?.email);
    } else if (isError) {
      toast.error('Error ocuure while storing a mail ;', { autoClose: 3000 });
      // alert('Error ocuure while storing a mail :', error)
    }

  }, [data, isSuccess, isError, error])


  const handleInputChange = (index, field, value) => {
    const updatedPassengerDetails = details.passengerDetailsData.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setDetails((prevDetails) => ({
      ...prevDetails,
      passengerDetailsData: updatedPassengerDetails,
    }));
  };

  const handleInputChangeContact = (field, value) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      contactDetails: {
        ...prevDetails.contactDetails,
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate passenger details
    details.passengerDetailsData.forEach((passenger, index) => {
      if (!passenger.fullName) {
        newErrors[`fullName-${index}`] = 'Full Name is required';
        isValid = false;
      }
      if (!passenger.age) {
        newErrors[`age-${index}`] = 'Age is required';
        isValid = false;
      }
      if (!passenger.gender) {
        newErrors[`gender-${index}`] = 'Gender is required';
        isValid = false;
      }
    });

    // Validate contact details
    if (!details.contactDetails.fullName) {
      newErrors.contactFullName = 'Full Name is required';
      isValid = false;
    }
    if (!details.contactDetails.email) {
      newErrors.contactEmail = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(details.contactDetails.email)) {
      newErrors.contactEmail = 'Email is not valid';
      isValid = false;
    }
    if (!details.contactDetails.phoneNumber) {
      newErrors.contactPhone = 'Phone Number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(details.contactDetails.phoneNumber)) {
      newErrors.contactPhone = 'Phone Number must be 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleTripSummaryPage = (key) => {
    navigate(`/flight-book/${className}/${key}/${id}`);
  };

  const handleMealAndFlightSeatPage = async () => {
    // if (validateForm()) {
    //   setPassengerPersonalDetails(details);
    // }

    const payload = {
      flightId: id,
      details
    }

    console.log(email, 'savedEmailsavedEmailsavedEmailsavedEmailsavedEmailsavedEmail')

    if (!email) {
      const response = await submitPassengerDetails(payload)

    }

    // navigate(`/meal-booking/${className}/${id}`);
  };

  return (
    <>
      <div className='bg-[#f7f7f7]'>
        <div className="relative h-[400px] w-full bg-[url('https://assets.gqindia.com/photos/6540e2ba4622f7146b12b76b/16:9/w_2560%2Cc_limit/best-time-to-book-flights.jpg')] bg-cover bg-center flex justify-center items-center">
          <div
            className="absolute top-0 bottom-0 left-0 right-0"
            style={{
              background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%)',
              zIndex: 0
            }}
          />
          <h1 className="relative text-white text-3xl font-bold z-10">Passenger Details</h1>
        </div>

        <div className='bg-[#f7f7f7]'>
          <div className='2xl:container 2xl:mx-auto px-5 mt-5'>
            <div className='flex flex-row justify-around gap-3'>
              <div className='w-[70%]'>
                <p className='px-2 font-bold text-xl'>Passenger Detail</p>
                {details.passengerDetailsData.map((passenger, index) => (
                  <div key={index + 1} className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 h-fit'>
                    <div>
                      <p className='font-medium mb-4'>Passenger {index + 1}</p>
                    </div>

                    <div className='mb-4'>
                      <label
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        Full Name
                      </label>
                      <input
                        type='text'
                        className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter full name'
                        value={passenger.fullName}
                        onChange={(e) => handleInputChange(index, 'fullName', e.target.value)}
                      />
                      {errors[`fullName-${index}`] && <p className="text-red-500 text-sm">{errors[`fullName-${index}`]}</p>}
                    </div>

                    <div className='grid grid-cols-2 gap-2'>
                      <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Age</label>
                        <input
                          type='number'
                          className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          placeholder='Enter age'
                          value={passenger.age}
                          onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                        />
                        {errors[`age-${index}`] && <p className="text-red-500 text-sm">{errors[`age-${index}`]}</p>}
                      </div>
                      <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Gender</label>
                        <select
                          className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          value={passenger.gender}
                          onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                        >
                          <option value=''>Select gender</option>
                          <option value='male'>Male</option>
                          <option value='female'>Female</option>
                          <option value='other'>Other</option>
                        </select>
                        {errors[`gender-${index}`] && <p className="text-red-500 text-sm">{errors[`gender-${index}`]}</p>}
                      </div>
                    </div>
                  </div>
                ))}

                <div className='card bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 h-fit'>
                  <div>
                    <p className='font-medium mb-4'>Contact Details</p>
                  </div>

                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                    <input
                      type='text'
                      className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='Enter full name'
                      value={details.contactDetails.fullName}
                      onChange={(e) => handleInputChangeContact('fullName', e.target.value)}
                    />
                    {errors.contactFullName && <p className="text-red-500 text-sm">{errors.contactFullName}</p>}
                  </div>

                  <div className='grid grid-cols-2 gap-2'>
                    <div className='mb-4'>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                      <input
                        type='text'
                        className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter valid email'
                        value={details.contactDetails.email}
                        onChange={(e) => handleInputChangeContact('email', e.target.value)}
                      />
                      {errors.contactEmail && <p className="text-red-500 text-sm">{errors.contactEmail}</p>}
                    </div>
                    <div className='mb-4'>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
                      <input
                        type='number'
                        className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter phone number'
                        value={details.contactDetails.phoneNumber}
                        onChange={(e) => handleInputChangeContact('phoneNumber', e.target.value)}
                      />
                      {errors.contactPhone && <p className="text-red-500 text-sm">{errors.contactPhone}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reservation Summary */}
              <div className='card w-[30%] bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 h-fit'>
                <div>
                  <h1 className='font-semibold text-md text-black'>Reservation Summary</h1>
                </div>
                <div className='my-2 border border-dotted rounded-md border-black p-2'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='bg-[#dae6ff] p-2 rounded-md'>
                      <p className='text-sm font-normal'>Check-In</p>
                      <p className='text-sm font-medium text-black'>05 Feb 2024</p>
                    </div>
                    <div className='bg-[#dae6ff] p-2 rounded-md'>
                      <p className='text-sm font-normal'>Check-Out</p>
                      <p className='text-sm font-medium text-black'>15 Feb 2024</p>
                    </div>
                  </div>
                </div>
                <div className='my-4'>
                  <button
                    onClick={() => handleTripSummaryPage('1')}
                    className='w-full bg-[#263650] text-white font-semibold py-3 rounded-lg hover:bg-[#111b2b] transition duration-300 shadow-md hover:shadow-lg'
                  >
                    View Summary
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleMealAndFlightSeatPage}
                    className='w-full bg-red-400 text-white font-semibold py-3 rounded-lg hover:bg-red-500 transition duration-300 shadow-md hover:shadow-lg'
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          className="toast-container"
          draggable="true"
        />
      </div>
    </>
  );
};

export default PassengerDetails;
