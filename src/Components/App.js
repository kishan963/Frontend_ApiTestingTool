import "./App.css";
import RouteHandler from "./route";
import Home from "./Home";
import CreateTab from "./createTab";
import ResponseHandler from "./Response";
import DataStorage from "../Context/DataStorage";
import TestResultHandler from "./TestResult";
import HistoryHandler from "./HistoryList";

function App() {
  return (
    <>
      
        
          <HistoryHandler />
        
    </>
  );
}

export default App;
