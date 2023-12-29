import React, { useState, createContext } from 'react';

export const DataContext = createContext(null);

const DataStorage = ({ children }) => {
    
    const [formData, setFormData] = useState({ url: '', type: 'POST' })
    const [jsonText, setJsonText] = useState('');
    const [testScript, setTestScript] = useState('');
    const [validationText, setValidationText] = useState('');
    const [backendData, setBackendData] = useState([]);
    const [responseStatus, setResponseStatus] = useState('500');
    const [responseData, setResponseData] = useState();
    const [paramData, setParamData] = useState([]);
    const [headerData, setHeaderData] = useState([]);
    const [rows, addRows]= useState([0]);
    const [paramRows, addParamRows]= useState([0]);
    const [historyData, setHistoryData] = useState([]);
    const [updateApi, setUpdateApi] = useState({ id: '', check: false});
    const [ apiTestResult, setApiTestResult] = useState({ testRes: false, description: 'Test 1'});
    const [apiDuration, setApiDuration] = useState(0);
    const [responseLength,setResponseLength] = useState(0);

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
                testScript,
                setTestScript,
                historyData, 
                setHistoryData,
                updateApi,
                setUpdateApi,
                apiTestResult, 
                setApiTestResult,
                apiDuration,
                setApiDuration,
                responseLength,
                setResponseLength
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataStorage;