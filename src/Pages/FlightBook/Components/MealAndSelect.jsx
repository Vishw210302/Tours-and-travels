import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import React, { useEffect, useState } from 'react';
import mealImage from "../../../assets/cofeeImage.jpg"
import mealImage1 from "../../../assets/sandwichImage.jpg"
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMealTypeQuery, useLazyGetMealByIdQuery } from '../../../Api/Api';

const MealAndSelect = () => {
    
    const { id } = useParams();

    const { data, isLoading, isSuccess, isError, error } = useGetMealTypeQuery();

    const [fetchMealByParticularId, {

        data: ParticularMealData,
        isSuccess: isSuccessPasricularMeal,
        isError: isErrorPasricularMeal,
        error: errorPasricularMeal

    }] = useLazyGetMealByIdQuery();

    const [selectedMeal, setSelectedMeal] = useState(null);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [mealTypes, setMealTypes] = useState();
    const [particularMeal, setParticularMeal] = useState([]);
    const navigate = useNavigate();

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


    const handlePasengerDetailsPage = () => {
        navigate(`/passenger-details/${id}`)
    }

    const handleSelectFlightSeat = () => {
        navigate(`/flight-seat-booking/${id}`)
    }

    const handleSelectMeal = (id) => {
        setSelectedMeal(id)
        fetchMealByParticularId(id)
    }
    const mealOptions = [
        'Vegetarian Meal',
        'Non-Vegetarian Meal',
        'Vegan Meal',
        'Special Meal (Gluten-Free, etc.)',
    ];

    const mealdetails = [
        {
            id: 1,
            name: 'Cold Coffee',
            price: '500₹',
            imgSrc: mealImage,
        },
        {
            id: 2,
            name: 'Sandwich',
            price: '300₹',
            imgSrc: mealImage1,
        },
        {
            id: 3,
            name: 'Burger',
            price: '250₹',
            imgSrc: mealImage,
        },
    ];


    const handleSelectMeals = (mealId) => {
        setSelectedMeals((prev) => {
            if (prev.includes(mealId)) {
                return prev.filter((id) => id !== mealId);
            }
            return [...prev, mealId];
        });
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
                    <h1 className="relative text-white text-3xl font-bold z-10">Take good meal</h1>
                </div>
                <div className='h-screen bg-[#f7f7f7]'>

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
                                                    checked={selectedMeals.includes(meal._id)}
                                                    onChange={() => handleSelectMeals(meal._id)}
                                                    className='mr-2'
                                                />
                                                <span>Select</span>
                                            </label>
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