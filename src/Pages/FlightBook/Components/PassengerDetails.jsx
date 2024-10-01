import React, { useState } from 'react';

const PassengerDetails = () => {

  const [numAdults, setNumAdults] = useState(1);
  const [formVisibility, setFormVisibility] = useState([false]);
  const [contactVisibility, setContactVisibility] = useState(false);

  const [details, setDetails] = useState({
    passengerDetails: [{ title: '', firstName: '', lastName: '', dob: '' }],
    contactDetails: {
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });

  const updateNumAdults = (e) => {
    const count = parseInt(e.target.value);
    setNumAdults(count);
    setFormVisibility(Array(count).fill(false));
    setDetails((prevDetails) => ({
      ...prevDetails,
      passengerDetails: Array(count).fill({ title: '', firstName: '', lastName: '', dob: '' }),
    }));
  };

  const toggleForm = (index) => {
    setFormVisibility((prevVisibility) =>
      prevVisibility.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  const toggleContactForm = () => {
    setContactVisibility(!contactVisibility);
  };

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

  const handleSubmitDetails = () => {
    console.log(details, 'All Details');
  };

  return (

    <>
      <div className="w-full relative h-[400px] bg-[url('https://assets.gqindia.com/photos/6540e2ba4622f7146b12b76b/16:9/w_2560%2Cc_limit/best-time-to-book-flights.jpg')] bg-cover bg-center flex justify-center items-center">
        <div
          className="absolute top-0 bottom-0 left-0 right-0"
          style={{
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%)',
            zIndex: 0
          }}
        />
        <div className='text-white z-10 font-semibold text-3xl'>Flight Submission</div>
      </div>
      <div className='w-full flex justify-center'>
        <div className="mt-5 flex  w-[70%] gap-6 ">
          <div className='step'>

          </div>
          <div className='flex w-full'>
            <div className=" w-[60%] p-6">
              <div>
                <p className="font-semibold text-2xl">Passenger Details</p>
                <div className="my-4">
                  <label className="block text-sm font-medium mb-1">Select number of adults</label>
                  <select
                    value={numAdults}
                    onChange={updateNumAdults}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {Array.from({ length: numAdults }).map((_, index) => (
                  <div key={index} className="bg-white p-4 my-4 rounded-lg shadow-lg">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleForm(index)}
                    >
                      <p>Adult {index + 1} Details</p>
                      <p>
                        {formVisibility[index] ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 682.667 682.667" transform="rotate(180)">
                            <path fill="currentColor" d="M341.333 461.248L574.55 228.82c13.312-13.269 34.88-13.269 48.192 0l1.536 1.536c13.376 13.334 13.376 35.008 0 48.363L366.272 535.85c-13.781 13.74-36.117 13.74-49.899 0L58.368 278.72c-13.376-13.333-13.376-35.008 0-48.363l1.536-1.536c13.312-13.269 34.88-13.269 48.192 0l233.216 232.427z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 682.667 682.667">
                            <path fill="currentColor" d="M341.333 461.248L574.55 228.82c13.312-13.269 34.88-13.269 48.192 0l1.536 1.536c13.376 13.334 13.376 35.008 0 48.363L366.272 535.85c-13.781 13.74-36.117 13.74-49.899 0L58.368 278.72c-13.376-13.333-13.376-35.008 0-48.363l1.536-1.536c13.312-13.269 34.88-13.269 48.192 0l233.216 232.427z" />
                          </svg>
                        )}
                      </p>
                    </div>

                    {formVisibility[index] && (
                      <div className="p-4 my-4 rounded-lg">
                        <p className="font-semibold text-lg mb-2">Passenger {index + 1} Information</p>
                        <div className="flex flex-col gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <select
                              value={details.passengerDetails[index]?.title || ''}
                              onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              <option value="">Select</option>
                              <option value="Mr">Mr</option>
                              <option value="Ms">Ms</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <input
                              type="text"
                              value={details.passengerDetails[index]?.firstName || ''}
                              onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="Enter first name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <input
                              type="text"
                              value={details.passengerDetails[index]?.lastName || ''}
                              onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="Enter last name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Date of Birth</label>
                            <input
                              type="date"
                              value={details.passengerDetails[index]?.dob || ''}
                              onChange={(e) => handleInputChange(index, 'dob', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-white shadow-lg p-3 rounded-lg">
                <div className="flex justify-between items-center cursor-pointer " onClick={toggleContactForm}>
                  <p className="font-semibold text-lg mb-2">Contact Information</p>
                  <p>
                    {contactVisibility ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 682.667 682.667" transform="rotate(180)">
                        <path fill="currentColor" d="M341.333 461.248L574.55 228.82c13.312-13.269 34.88-13.269 48.192 0l1.536 1.536c13.376 13.334 13.376 35.008 0 48.363L366.272 535.85c-13.781 13.74-36.117 13.74-49.899 0L58.368 278.72c-13.376-13.333-13.376-35.008 0-48.363l1.536-1.536c13.312-13.269 34.88-13.269 48.192 0l233.216 232.427z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 682.667 682.667">
                        <path fill="currentColor" d="M341.333 461.248L574.55 228.82c13.312-13.269 34.88-13.269 48.192 0l1.536 1.536c13.376 13.334 13.376 35.008 0 48.363L366.272 535.85c-13.781 13.74-36.117 13.74-49.899 0L58.368 278.72c-13.376-13.333-13.376-35.008 0-48.363l1.536-1.536c13.312-13.269 34.88-13.269 48.192 0l233.216 232.427z" />
                      </svg>
                    )}
                  </p>
                </div>

                {contactVisibility && (
                  <div className="mt-4">

                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <select
                          value={details.contactDetails.title}
                          onChange={(e) => handleInputChangeContact('title', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select</option>
                          <option value="Mr">Mr</option>
                          <option value="Ms">Ms</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input
                          type="text"
                          value={details.contactDetails.firstName}
                          onChange={(e) => handleInputChangeContact('firstName', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input
                          type="text"
                          value={details.contactDetails.lastName}
                          onChange={(e) => handleInputChangeContact('lastName', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Enter last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                          type="email"
                          value={details.contactDetails.email}
                          onChange={(e) => handleInputChangeContact('email', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Enter email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={details.contactDetails.phoneNumber}
                          onChange={(e) => handleInputChangeContact('phoneNumber', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='w-full flex flex-row-reverse'>
                <button
                  className="mt-6  bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={handleSubmitDetails}
                >
                  Submit
                </button>
              </div>
            </div>

            <div className=' w-[30%] mt-16 bg-white shadow-lg p-4 h-[250px]'>
              <p className='text-lg font-bold mb-4'>Price Detail</p>
              <div className='bg-white p-4 '>
                <div className='flex justify-between '>
                  <div>
                    <div className='font-semibold text-lg'>Adult</div>
                    <p className='font-light text-sm'>per person</p>
                  </div>
                  <div className='font-semibold text-lg'>₹2000</div>
                </div>
                <div className='bg-[#808080] h-[1px] w-full my-3'></div>
                <div className='flex justify-between '>
                  <div>
                    <div className='font-semibold text-lg'>Total Price</div>
                  </div>
                  <div className='font-semibold text-lg'>₹2000</div>
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