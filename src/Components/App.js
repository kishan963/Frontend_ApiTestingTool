import './App.css';
import RouteHandler from './route';
import Home from './Home';
import CreateTab from './createTab';
import ResponseHandler from './Response';
import DataStorage from '../Context/DataStorage';

function App() {
  return (
   <div>
   
    <Home></Home>
     <RouteHandler></RouteHandler>
     <CreateTab></CreateTab>
     <ResponseHandler></ResponseHandler>
     
   </div> 
  );
}

export default App;
