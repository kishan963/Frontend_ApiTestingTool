import "./App.css";
import RouteHandler from "./route";
import Home from "./Home";
import CreateTab from "./createTab";
import ResponseHandler from "./Response";
import DataStorage from "../Context/DataStorage";
import TestResultHandler from "./TestResult";
import HistoryHandler from "./HistoryList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      
       
          <HistoryHandler />
          <Toaster/>
          
        
    </>
  );
}

export default App;
