import React, { createContext, useContext, useState } from 'react';

const FlightTicketsDetailsContext = createContext();

export const FlightTicketsDetailsProvider = ({ children }) => {
    const [selectedMealData, setSelectedMealData] = useState([]);
    const [passengerPersonalDetails, setPassengerPersonalDetails] = useState();
    const [flightSeatData, setFlightSeatData] = useState([]);

    
    return (
        <FlightTicketsDetailsContext.Provider value={{ 
            selectedMealData, 
            setSelectedMealData, 
            passengerPersonalDetails, 
            setPassengerPersonalDetails,
            flightSeatData,
            setFlightSeatData,
             
        }}>
            {children}
        </FlightTicketsDetailsContext.Provider>
    );
}

export const useFlightTicketsDetailsContext = () => {
    return useContext(FlightTicketsDetailsContext);
}
