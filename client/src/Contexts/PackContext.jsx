import { createContext, useState } from "react";

export const PackContext = createContext(null);

export const PackProvider = ({children}) => {
    const [selectedPack, setSelectedPack] = useState(null)

    return (
        <PackContext.Provider value={{ selectedPack, setSelectedPack}}>
            {children}
        </PackContext.Provider>
    )
}

