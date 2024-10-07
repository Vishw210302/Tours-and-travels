import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePassenger } from '../../../Context/PassengerCountContext';
import { useFlightTicketsDetailsContext } from '../../../Context/FlightTicketsDetailsContext';

const PassengerDetails = ({ flightId }) => {
  const { id, className } = useParams();
  const navigate = useNavigate();
  const { passengerCount } = usePassenger();
  const { passengerPersonalDetails, setPassengerPersonalDetails } = useFlightTicketsDetailsContext();

  const [details, setDetails] = useState({
    passengerDetails: passengerPersonalDetails?.passengerDetails?.length > 0
      ? passengerPersonalDetails.passengerDetails
      : Array(passengerCount).fill().map(() => ({
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

  const handleInputChange = (index, field, value) => {
    const updatedPassengerDetails = details.passengerDetails.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setDetails((prevDetails) => ({
      ...prevDetails,
      passengerDetails: updatedPassengerDetails,
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

  const handleTripSummaryPage = (key) => {
    navigate(`/flight-book/${className}/${key}/${id}`);
  };

  const handleMealAndFlightSeatPage = () => {
    setPassengerPersonalDetails(details); 
    navigate(`/meal-booking/${className}/${id}`);
  };

  return (
    <>
      <div className='bg-[#f7f7f7] h-screen'>
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

        <div className='h-screen bg-[#f7f7f7]'>
          <div className='2xl:container 2xl:mx-auto px-5 mt-5'>
            <div className='flex flex-row justify-around gap-3'>
              <div className='w-[70%]'>
                <p className='px-2 font-bold text-xl'>Passenger Detail</p>
                {details.passengerDetails.map((passenger, index) => (
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
                    </div>
                    <div className='mb-4'>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
                      <input
                        type='text'
                        className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter phone number'
                        value={details.contactDetails.phoneNumber}
                        onChange={(e) => handleInputChangeContact('phoneNumber', e.target.value)}
                      />
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
                    onClick={() => handleTripSummaryPage(flightId)}
                    className='w-full bg-[#111b2b] text-white px-3 py-2 rounded-md'
                  >
                    View Summary
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleMealAndFlightSeatPage}
                    className='w-full bg-[#4c6fc8] text-white px-3 py-2 rounded-md'
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PassengerDetails;
