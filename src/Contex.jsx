import React, { useState } from "react";

/**
 * Este context sirve para manejar los dos arreglos, el de programas y programas seleccionado de una manera global, asi a trevs del useContext, cualquier elemento puede acceder a estos
 */
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [ProcessesToPlotted, setProcessesToPlotted] = useState([]);// Almacenar lo procesos
    const[Quantum, setQuantumDataG] = useState(0);
    return (
        <Context.Provider value={{ProcessesToPlotted,setProcessesToPlotted, Quantum, setQuantumDataG}}>
            {children}
        </Context.Provider>
    );
};