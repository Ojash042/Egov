import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/js/bootstrap.bundle.js"
import {SignUpPage} from "./Components/SignUpPage";
import {LoginPage} from "./Components/LoginPage";
import {CreateJobPage} from "./Components/CreateJobPage";
import {JobListingPage} from "./Components/JobListingPage";
import {IndexPage} from "./Components/IndexPage";
import {JobDetails} from "./Components/JobDetails";

function App() {
  return(
      <BrowserRouter>
        <Routes>
            <Route path="/" Component={IndexPage}></Route>
            <Route path="/JobListings" Component={JobListingPage}></Route>
            <Route path="/SignUp" Component={SignUpPage}></Route>
            <Route path="/Login" Component={LoginPage}></Route>
            <Route path="/CreateAJob" Component={CreateJobPage}></Route>
            <Route path="/JobDetails/:job_id" Component={JobDetails}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
