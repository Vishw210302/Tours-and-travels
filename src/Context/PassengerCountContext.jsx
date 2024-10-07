
import React, { createContext, useContext, useState } from 'react';

const PassengerCountContext = createContext();

export const PassengerCountProvider = ({ children }) => {
    const [passengerCount, setPassengerCount] = useState(0);

    return (
        <PassengerCountContext.Provider value={{ passengerCount, setPassengerCount }}>
            {children}
        </PassengerCountContext.Provider>
    );
};

export const usePassenger = () => {
    return useContext(PassengerCountContext);
};
