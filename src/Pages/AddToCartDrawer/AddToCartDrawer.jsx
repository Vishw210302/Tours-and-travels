import { ArrowRight, ShoppingBag, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useAllApiContext } from '../../Context/allApiContext';
import PlaneLoader from '../PlaneLoader';

const AddToCartDrawer = ({ toggleDrawer, isOpen }) => {

    const { addToCart, setaddToCart } = useAllApiContext();
    const imageUrl = `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/itenary-package/`;
    const [processingItems, setProcessingItems] = useState(new Set());
    const isProcessing = (itemId) => processingItems.has(itemId);
    const cartItems = Array.isArray(addToCart) ? addToCart : [];

    const handleRemoveItem = (itemId) => {
        setaddToCart(prev => {
            const updatedCart = prev.filter(item => item._id !== itemId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const handleCheckout = async (item) => {
        try {
            setProcessingItems(prev => new Set(prev).add(item._id));
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Checkout failed:', error);
        } finally {
            setProcessingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(item._id);
                return newSet;
            });
        }
    };

    return (
        <div
            className={`fixed inset-y-0 right-0 z-50 w-96 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="p-4 border-b dark:border-gray-700">
                <div className="flex items-center justify-between">

                    <div className="flex items-center space-x-2">
                        <ShoppingBag className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Cart</h2>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                            ({cartItems.length} items)
                        </span>
                    </div>

                    <button
                        onClick={toggleDrawer}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </button>

                </div>
            </div>

            <div className="flex-1 overflow-y-auto h-[calc(100vh-96px)]">
                {cartItems.length > 0 ? (
                    <div className="divide-y dark:divide-gray-700">

                        {cartItems && cartItems.map((item, index) => {
                            return (
                                <div
                                    key={item?._id || index + "Saprate_Key"}
                                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <div className="flex space-x-4">

                                        <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                                            <img
                                                src={`${imageUrl}${item?.bannerImage}`}
                                                alt={item?.packageTitle}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">

                                            <div className="flex justify-between">
                                                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                                    {item?.packageTitle}
                                                </h3>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveItem(item?._id)
                                                    }
                                                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                                    disabled={isProcessing(item?._id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </button>
                                            </div>

                                            <div className="mt-1 space-y-2">

                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Duration: {item?.days?.length} Days
                                                </p>

                                                <div className="flex items-center justify-between">

                                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        ₹{item?.perPersonCost.toLocaleString()}
                                                    </p>

                                                    <button
                                                        onClick={() => handleCheckout(item)}
                                                        disabled={isProcessing(item?._id)}
                                                        className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[140px]
                                                        ${isProcessing(item?._id)
                                                                ? 'bg-blue-600 text-white cursor-not-allowed'
                                                                : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
                                                            }`}
                                                    >
                                                        {isProcessing(item?._id) ? (
                                                            <PlaneLoader />
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <span>Checkout</span>
                                                                <ArrowRight className="h-4 w-4" />
                                                            </div>
                                                        )}
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddToCartDrawer;