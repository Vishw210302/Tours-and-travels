import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddMealDataMutation, useGetMealTypeQuery, useLazyGetMealByIdQuery, useLazyGetUpdatedMealOrderQuery } from '../../../Api/Api';
import { useFlightTicketsDetailsContext } from '../../../Context/FlightTicketsDetailsContext';


const MealAndSelect = () => {

    const { id, className } = useParams();
    const navigate = useNavigate();
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [selecteParticularMeals, setSelectetParticularMeals] = useState([]);
    const [mealTypes, setMealTypes] = useState();
    const [particularMeal, setParticularMeal] = useState([]);
    const [mealCounts, setMealCounts] = useState({});
    // const { selectedMealData, setSelectedMealData } = useFlightTicketsDetailsContext();
    const { data, isLoading, isSuccess, isError, error } = useGetMealTypeQuery();

    const [fetchMealByParticularId, {

        data: ParticularMealData,
        isSuccess: isSuccessPasricularMeal,
        isError: isErrorPasricularMeal,
        error: errorPasricularMeal

    }] = useLazyGetMealByIdQuery();

    const [addMealData, {
        isSuccess: isMealDataAddedSuccessfully,
        isError: isMealDataAdditionError,
        error: mealDataAdditionError
    }] = useAddMealDataMutation();

    const [getUpdatedMealData, {
        data: updatedMealData,
        isSuccess: isUpdatedMealDataFetchedSuccessfully,
        isError: isUpdatedMealDataFetchError,
        error: updatedMealDataFetchError
    }] = useLazyGetUpdatedMealOrderQuery();
    

    const mealUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/meal-items-image/`;

    useEffect(() => {
        if (isSuccess) {
            setMealTypes(data?.data);
            if (data?.data?.length > 0) {
                setSelectedMeal(data?.data[0]._id)
                fetchMealByParticularId(data?.data[0]._id)
            }
        } else if (isError) {
            console.log("isLocationError", isError);
        }
    }, [error, data, isSuccess, isError]);

    useEffect(() => {
        if (isSuccessPasricularMeal) {
            setParticularMeal(ParticularMealData?.data);
        } else if (isErrorPasricularMeal) {
            console.log("isLocationError", isErrorPasricularMeal);
        }
    }, [errorPasricularMeal, ParticularMealData, isSuccessPasricularMeal, isErrorPasricularMeal]);

    useEffect(() => {
        if (isMealDataAddedSuccessfully) {
            // navigate(`/flight-seat-booking/${className}/${id}`);
        } else if (isMealDataAdditionError) {
            console.log("isLocationError", mealDataAdditionError);
        }
    }, [isMealDataAddedSuccessfully, isMealDataAdditionError, mealDataAdditionError]);

    useEffect(() => {
        const contactId = localStorage.getItem('contactId');
        if (contactId) {
          console.log(contactId, 'contactIdcontactId');
          getUpdatedMealData(contactId)
        }
      }, []);

    // const getSelectedMealData = (id) => {
    //     return selectedMealData.some(value => value.meal_id === id);
    // }
    // console.log(getSelectedMealData(), 'getSelectedMealData')

    // useEffect(() => {

    //     console.log(selectedMealData, 'selectedMealData')
    // }, [selectedMealData])



    const handlePasengerDetailsPage = () => {

        navigate(`/passenger-details/${className}/${id}`)
    }

    const handleSelectFlightSeat = async () => {

        const selecteMealData = selecteParticularMeals.map((meal) => {
            return {
                meal_id: meal?._id,
                count: mealCounts[meal?._id] || 1,
            };
        });

        const id = localStorage.getItem('contactId');

        const payload = {
            selecteMealData,
            id
        }

        console.log(payload, 'selecteMealDataselecteMealData');

        await addMealData(payload);
       
    };

    const handleSelectMeal = (id) => {
        setSelectedMeal(id)
        fetchMealByParticularId(id)
    }

    const handleSelectMeals = (mealId) => {
        setSelectetParticularMeals((prev) => {
            if (prev.includes(mealId)) {
                return prev.filter((id) => id !== mealId);
            }
            return [...prev, mealId];
        });
    };

    const increaseCount = (id) => {
        setMealCounts((prevCounts) => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 1) + 1,
        }));
    };

    const decreaseCount = (id) => {
        setMealCounts((prevCounts) => ({
            ...prevCounts,
            [id]: prevCounts[id] > 0 ? prevCounts[id] - 1 : 0,
        }));
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
                    <h1 className="relative text-white text-3xl font-bold z-10">Take good meal</h1>
                </div>
                <div className='bg-[#f7f7f7]'>

                    <div className='2xl:container 2xl:mx-auto px-5 mt-5'>
                        <div className='flex justify-center gap-6 text-4xl flex-wrap'>
                            {mealTypes?.length > 0 && mealTypes.map((meal, index) => (
                                <div
                                    key={index}
                                    className={`border rounded-lg p-2 cursor-pointer ${selectedMeal === meal._id ? 'bg-red-300' : 'hover:bg-red-400'
                                        }`}
                                    onClick={() => handleSelectMeal(meal._id)}
                                >
                                    <p className='text-xl flex flex-1 justify-center items-center font-semibold'>
                                        {meal.mealCategories}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='2xl:container 2xl:mx-auto px-5 mt-5'>

                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 px-5 mt-5'>
                            {particularMeal?.length > 0 ? (
                                particularMeal.map((meal, index) => (
                                    <div
                                        key={index}
                                        className='bg-white rounded-xl shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 w-full flex flex-col'
                                    >
                                        <img
                                            src={`${mealUrl}${meal?.mealItemsImage}`}
                                            alt={meal.name}
                                            className='w-full h-52 rounded-t-xl'
                                        />
                                        <div className='p-3 grid grid-cols-2 items-center'>
                                            <h3 className='text-lg font-semibold'>{meal?.mealItems}</h3>
                                            <span className='text-xl font-bold text-red-500 text-right'>₹{meal.mealPrice}</span>
                                            <label className='flex items-center mt-2'>
                                                <input
                                                    type='checkbox'
                                                    checked={selecteParticularMeals.includes(meal)}
                                                    onChange={() => handleSelectMeals(meal)}
                                                    className='mr-2'
                                                />
                                                <span>Select</span>
                                            </label>
                                            {selecteParticularMeals.includes(meal) && (
                                                <div className='flex flex-row-reverse items-center  mt-3'>
                                                    <button
                                                        onClick={() => increaseCount(meal._id)}
                                                        className='bg-red-300 hover:bg-red-400 px-3 py-1 rounded-lg font-bold text-xl'
                                                    >
                                                        +
                                                    </button>
                                                    <span className='mx-2 text-lg'>{mealCounts[meal._id] || 1}</span>
                                                    <button
                                                        onClick={() => decreaseCount(meal._id)}
                                                        className='bg-red-300 hover:bg-red-400 px-3 py-1 rounded-lg font-bold text-xl'
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='col-span-3 text-center text-xl font-semibold text-gray-500'>
                                    No meals available
                                </div>
                            )}
                        </div>

                    </div>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        <button
                            className="mt-8 w-1/7 bg-blue-400 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition duration-300 shadow-md hover:shadow-lg p-2"
                            onClick={() => {
                                handlePasengerDetailsPage()
                            }}
                        >
                            <p className='text-sm flex flex-1 gap-2 items-center'>
                                <ArrowCircleLeftIcon />
                                Go to previous form
                            </p>
                        </button>
                        <button
                            className="mt-8 w-1/7 bg-red-400 text-white font-semibold py-3 rounded-lg hover:bg-red-500 transition duration-300 shadow-md hover:shadow-lg p-2"
                            onClick={() => {
                                handleSelectFlightSeat()
                            }}
                        >
                            <p className='text-sm flex flex-1 gap-2 items-center'>
                                Go to next form
                                <ArrowCircleRightIcon />
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MealAndSelect