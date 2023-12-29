import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import DataStorage from './Context/DataStorage';
import {Toaster} from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataStorage >
    <App />
    </DataStorage>
  </React.StrictMode>
);


