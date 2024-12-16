import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetHotelCouponCodeDataQuery } from '../../../Api/Api';
import HotelTestimonialForm from '../HotelTestimonialForm';
import { useAllApiContext } from '../../../Context/allApiContext';

const ThirdStepsBookingHotel = ({ setFinalTotalPrice }) => {

    const { isError, error, data, isSuccess } = useGetHotelCouponCodeDataQuery();
    const [hotelCouponCodeListing, setHotelCouponCodeListing] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredCoupons, setFilteredCoupons] = useState(hotelCouponCodeListing);
    const { totalHotelPrice } = useAllApiContext()
    const [tax, setTax] = useState(20);
    const [couponCode, setCouponCode] = useState("");
    const [finalHotelPrice, setFinalHotelPrice]= useState(totalHotelPrice + tax);

    useEffect(() => {
        if (isSuccess) {
            setHotelCouponCodeListing(data?.data);
        } else if (isError) {
            console.log("error", isError);
        }
    }, [error, data, isSuccess, isError]);

    useEffect(() => {
     if(finalHotelPrice){
        setFinalTotalPrice(finalHotelPrice)
     }
    }, [finalHotelPrice])
    

    const handleInputFocus = () => {
        setFilteredCoupons(hotelCouponCodeListing);
        setShowSuggestions(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => setShowSuggestions(false), 150);
    };

    const handleInputChange = (event) => {
        const value = event.target.value.toLowerCase();
        const filtered = hotelCouponCodeListing.filter(coupon =>
            coupon.promoCode.toLowerCase().includes(value)
        );
        setFilteredCoupons(filtered);
    };

    const handleApplyCoupon = () => {
        
        if (couponCode) {
            const coupon = hotelCouponCodeListing.find(coupon => coupon.promoCode == couponCode);
            if (coupon) {
                toast.success(`Coupon code ${couponCode} applied successfully! Discount: ₹${coupon.discountAmount}`);
                setFinalHotelPrice(finalHotelPrice - Number(coupon.discountAmount))
            } else {
                toast.error(`Invalid coupon code: ${couponCode}`);
            }
        } else {
            toast.error("Please enter a coupon code.");
        }
    };

    return (
        <>
            <div className='card bg-white w-[98%] shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 h-fit rounded-md'>
                <div className='grid grid-cols-6 gap-2'>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Single Room</p>
                        <p className='text-base text-gray-400 font-medium'>Non-refundable Rate</p>
                    </div>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Net Price</p>
                        <p className='text-base text-gray-400 font-medium'>₹ {totalHotelPrice}</p>
                    </div>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Tax</p>
                        <p className='text-base text-gray-400 font-medium'>₹ {tax}</p>
                    </div>
                    <div>
                        <p className='text-lg text-red-500 font-semibold'>Total Price</p>
                        <p className='text-base text-gray-400 font-medium'>₹ {finalHotelPrice}</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row gap-2 w-full'>
                <div className='card bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-lg p-5 my-2 w-full h-fit rounded-md'>
                    <p className='text-gray-400 font-semibold text-lg w-fit'>Enter your coupon code</p>

                    <div className="mt-4 relative">
                        <div className="flex rounded-md shadow-sm">
                            <input
                                type="text"
                                id="promoCode"
                                className="flex-1 block w-full rounded-l-md text-base font-medium border border-gray-300 px-2"
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                onClick={handleApplyCoupon}
                                className="bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-all h-fit px-[23px] py-[7px]"
                            >
                                Apply
                            </button>
                        </div>
                        {showSuggestions && filteredCoupons.length > 0 && (
                            <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-60 overflow-auto">
                                {filteredCoupons.map((coupon, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="p-3 hover:bg-blue-100 cursor-pointer transition-all"
                                            onClick={() => setCouponCode(coupon?.promoCode || "")}
                                        >
                                            <p className="text-gray-800 font-semibold">{coupon?.promoCode}</p>
                                            <p className="text-sm text-gray-500">Discount: {coupon?.discountAmount} ₹</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
                <div className='w-full'>
                    <HotelTestimonialForm />
                </div>
                
            </div>
            <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
        </>
    );
};

export default ThirdStepsBookingHotel;