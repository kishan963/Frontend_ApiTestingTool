import React, { useState, createContext } from 'react';

export const DataContext = createContext(null);

const DataStorage = ({ children }) => {
    
    const [formData, setFormData] = useState({ url: '', type: 'POST' })
    const [jsonText, setJsonText] = useState('');
    const [expectedResponse, setExpectedResponse] = useState('');
    const [validationText, setValidationText] = useState('');
    const [backendData, setBackendData] = useState([]);
    const [responseStatus, setResponseStatus] = useState('500');
    const [responseData, setResponseData] = useState();
    const [paramData, setParamData] = useState([]);
    const [headerData, setHeaderData] = useState([]);
    const [rows, addRows]= useState([0]);
    const [paramRows, addParamRows]= useState([0]);
    const [historyData, setHistoryData] = useState([]);

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
                setHeaderData,
                rows,
                addRows,
                responseData,
                setResponseData,
                responseStatus,
                setResponseStatus,
                validationText,
                setValidationText,
                backendData,
                setBackendData,
                paramRows,
                addParamRows,
                expectedResponse,
                setExpectedResponse,
                historyData, 
                setHistoryData
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataStorage;