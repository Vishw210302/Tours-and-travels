import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { useCreatePaymentIntentMutation } from '../../Api/Api';
import { useFlightTicketsDetailsContext } from '../../Context/FlightTicketsDetailsContext';

const stripePromise = loadStripe('pk_test_51ON98CSEV9soa2c8CWj7i2O7pHm9b1EXoTi1LBhfICMonxhRKNHPPZU1bQ9FCYPwfcb4BzZ3RF8eTLHEt0ENjI3L00VzfQwTB9');

const PaymentForm = ({ onPaymentSuccess }) => {

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
                amount: totalTicketPrice * 100,
                currency: 'inr',
                description: 'Payment for flight ticket booking',
                billing_details: {
                    name: cardholderName,
                    address: billingAddress,
                },
            }

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
                    setError(result.error.message);
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
                console.error('Invalid response from createPaymentIntent:', response);
                alert('Something went wrong while creating the payment intent.');
                return;
            }


        } catch (err) {
            setError(err.message || 'An error occurred during payment processing.');
        } finally {
            setLoading(false);
        }
    };

    const formattedPrice = (totalTicketPrice / 100).toFixed(2);

    return (

        <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Payment Details</h2>
            {error && (
                <div className="mb-6 p-4 text-red-700 bg-red-100 border border-red-300 rounded-lg">
                    <strong>Payment Error:</strong> {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Cardholder Name</label>
                    <input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none transition"
                    />
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
                        value={billingAddress.line1}
                        onChange={handleBillingAddressChange}
                        required
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
                            value={billingAddress.city}
                            onChange={handleBillingAddressChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <input
                            id="state"
                            name="state"
                            placeholder="Enter State name"
                            value={billingAddress.state}
                            onChange={handleBillingAddressChange} s
                            required
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
                            value={billingAddress.postal_code}
                            onChange={handleBillingAddressChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country Code</label>
                        <input
                            id="country"
                            name="country"
                            placeholder="(In)"
                            value={billingAddress.country}
                            onChange={handleBillingAddressChange}
                            required
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
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.75v14.5M19.25 12H4.75" />
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        `Pay ₹${totalTicketPrice}`
                    )}
                </button>
            </form>
        </div>

    );
};

const StripePayment = ({ onPaymentSuccess }) => (
    <Elements stripe={stripePromise}>
        <PaymentForm onPaymentSuccess={onPaymentSuccess} />
    </Elements>
);

export default StripePayment;