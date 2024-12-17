import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useCreatePaymentIntentMutation } from '../../Api/Api';
import { useFlightTicketsDetailsContext } from '../../Context/FlightTicketsDetailsContext';
import PlaneLoader from '../PlaneLoader';

const PaymentForm = ({ onPaymentSuccess, description, personDetails }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const { totalTicketPrice } = useFlightTicketsDetailsContext();
    const [billingAddress, setBillingAddress] = useState({
        line1: '',
        city: '',
        state: '',
        postal_code: '',
        country: ''
    })

    const handleBillingAddressChange = (e) => {
        setBillingAddress({
            ...billingAddress,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);


        try {

            const cardholderName = event.target.name.value;
            const payload = {
                amount: personDetails ? parseFloat(personDetails.payPrice.replace(/[^\d]/g, '')) * 100 : totalTicketPrice * 100,
                currency: 'inr',
                description: description,
                billing_details: {
                    name: cardholderName,
                    address: billingAddress,
                },
            }

            // onPaymentSuccess({
            //     id: 'pi_3QUmuZSEV9soa2c80oPuPxva',
            // });

            const response = await createPaymentIntent(payload).unwrap()

            if (response && response?.paymentIntent?.client_secret) {

                const clientSecret = response?.paymentIntent.client_secret

                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: cardholderName,
                            address: billingAddress,
                        },
                    },
                });

                if (result.error) {

                    toast.error(result.error.message, { autoClose: 3000 });
                } else {
                    if (result.paymentIntent.status === 'succeeded') {
                        onPaymentSuccess({
                            id: result.paymentIntent.id,
                            amount: result.paymentIntent.amount,
                            status: result.paymentIntent.status,
                        });
                    }
                }
            } else {
                toast.error("Something went wrong while creating the payment intent.")
                return;
            }

        } catch (err) {
            toast.error(err.message, { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className='p-5'>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Payment Details</h2>

                {error && (
                    <div className="mb-6 p-4 text-red-700 bg-red-100 border border-red-300 rounded-lg">
                        <strong>Payment Error:</strong> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Cardholder Name</label>
                        {personDetails ? (
                            <input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                value={personDetails ? personDetails.formData.name : ""}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none transition"
                            />
                        ) : (
                            <input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none transition"
                            />
                        )}

                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700">Card Details</label>
                        <div className="p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus-within:ring focus-within:ring-blue-500 transition">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            color: '#32325d',
                                            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                            fontSmoothing: 'antialiased',
                                            fontSize: '16px',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#fa755a',
                                            iconColor: '#fa755a',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Billing Address</h3>

                    <div className="mb-4">
                        <label htmlFor="line1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
                        <input
                            id="line1"
                            name="line1"
                            placeholder="123 Street Name"
                            value={billingAddress?.line1}
                            onChange={handleBillingAddressChange}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="mb-4">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                id="city"
                                name="city"
                                placeholder="Enter city name"
                                value={billingAddress?.city}
                                onChange={handleBillingAddressChange}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none transition"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                            <input
                                id="state"
                                name="state"
                                placeholder="Enter State name"
                                value={billingAddress?.state}
                                onChange={handleBillingAddressChange} s
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none transition"
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="mb-4">
                            <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Postal Code</label>
                            <input
                                id="postal_code"
                                name="postal_code"
                                placeholder="Enter Pincode numeber"
                                value={billingAddress?.postal_code}
                                onChange={handleBillingAddressChange}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none transition"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country Code</label>
                            <input
                                id="country"
                                name="country"
                                placeholder="(In)"
                                value={billingAddress?.country}
                                onChange={handleBillingAddressChange}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none transition"
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading || !stripe}
                        className={`w-full p-3 text-lg font-semibold text-white rounded-lg shadow-md ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
                    >
                        {loading ? (
                            <PlaneLoader />
                        ) : (
                            `Pay ${personDetails ? personDetails.payPrice : '₹' + totalTicketPrice}`
                        )}
                    </button>

                </form>
            </div>

            <ToastContainer
                position="top-right"
                className="toast-container"
                draggable="true"
            />

        </>
    );
};

const StripePayment = ({ onPaymentSuccess, description, personDetails }) => {

    const [stripePromise, setStripePromise] = useState(null);

    useEffect(() => {
        import('@stripe/stripe-js').then(({ loadStripe }) => {
            setStripePromise(loadStripe('pk_test_51ON98CSEV9soa2c8CWj7i2O7pHm9b1EXoTi1LBhfICMonxhRKNHPPZU1bQ9FCYPwfcb4BzZ3RF8eTLHEt0ENjI3L00VzfQwTB9'));
        });
    }, []);

    return (
        stripePromise && (
            <Elements stripe={stripePromise}>
                <PaymentForm onPaymentSuccess={onPaymentSuccess} description={description} personDetails={personDetails} />
            </Elements>
        )
    );
};

export default StripePayment;