import React, { useState, createContext } from 'react';

export const DataContext = createContext(null);

const DataStorage = ({ children }) => {
    
    const [formData, setFormData] = useState({ url: 'fsfs', type: 'POST' })
    const [jsonText, setJsonText] = useState('');
    const [paramData, setParamData] = useState([]);
    const [headerData, setHeaderData] = useState([]);

    return (
        <DataContext.Provider
            value={{
                formData,
                setFormData,
                jsonText,
                setJsonText,
                paramData,
                setParamData,
                headerData,
                setHeaderData
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataStorage;