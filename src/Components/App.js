import './App.css';
import RouteHandler from './route';
import Home from './Home';
import CreateTab from './createTab';
import ResponseHandler from './Response';
import DataStorage from '../Context/DataStorage';
import TestResultHandler from './TestResult';

function App() {
  return (
   <div>
   
    <Home></Home>
     <RouteHandler></RouteHandler>
     <CreateTab></CreateTab>
     <ResponseHandler></ResponseHandler>
     <TestResultHandler></TestResultHandler>
     
   </div> 
  );
}

export default App;
