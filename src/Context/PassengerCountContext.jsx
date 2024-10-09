
import React, { createContext, useContext, useEffect, useState } from 'react';

const PassengerCountContext = createContext();

export const PassengerCountProvider = ({ children }) => {

    const [passengerCount, setPassengerCount] = useState(() => {
        const storedCount = localStorage.getItem('passengerCount');
        return storedCount
            ? JSON.parse(storedCount)
            : { adult: 0, children: 0, infant: 0 };  
    });

    useEffect(() => {
        localStorage.setItem('passengerCount', JSON.stringify(passengerCount));
    }, [passengerCount]);

    return (
        <PassengerCountContext.Provider value={{ passengerCount, setPassengerCount }}>
            {children}
        </PassengerCountContext.Provider>
    );
};

export const usePassenger = () => {
    return useContext(PassengerCountContext);
};
