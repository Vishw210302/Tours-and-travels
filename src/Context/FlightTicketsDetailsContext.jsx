import React, { createContext, useContext, useState } from 'react';

const FlightTicketsDetailsContext = createContext();

export const FlightTicketsDetailsProvider = ({ children }) => {

    const [totalTicketPrice, setotalTicketPrice] = useState(0);

    return (
        <FlightTicketsDetailsContext.Provider value={{
            totalTicketPrice,
            setotalTicketPrice
        }}>
            {children}
        </FlightTicketsDetailsContext.Provider>
    );
}

export const useFlightTicketsDetailsContext = () => {
    return useContext(FlightTicketsDetailsContext);
}
