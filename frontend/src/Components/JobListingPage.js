import {useEffect, useState} from "react"
import axios from "axios";
import "bootstrap/dist/js/bootstrap.min"
import "bootstrap/dist/js/bootstrap.bundle"
import {forEach} from "react-bootstrap/ElementChildren";

export function JobListingPage(){
    const [jobPostings, setJobPostings] = useState([])
    const provinces = ["Pradesh 1","Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudur Paschim"]
    const initialState = provinces.reduce((acc,province)=>{
        return {...acc,[province]:[]}
    },[])
    const [jobPostingsByProvince, setJobPostingsByProvince] = useState(initialState)
    const [jobProvince,setJobProvince] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/JobList`)
            .then((response)=>{
                setJobPostings(response.data)
            })
    }, []);
    useEffect(() => {
        const  updatedState = {...initialState}
        jobPostings.forEach(job=>{
            updatedState[job["employer"]["employerProvince"]].push(job)
        })
        setJobPostingsByProvince(updatedState)
    }, [jobPostingsByProvince]);
    return(
        <div className=" bg-dark text-white my-3 p-5 mb-4 align-items-center">
            <h2 className="text-center text-decoration-underline"> Job Listings</h2>
            {Object.keys(jobPostingsByProvince).map((province)=> (
                <div className="bg-dark py-2">
                    <h3>{province}</h3>
                    <div>
                        {jobPostingsByProvince[province].length<1 && (<h5 className="text-white py-3 m-3">Sorry, Nothing Right Now</h5>)}
                    </div>
                    {jobPostingsByProvince[province].map((jobPosting)=> (
                        <div className="card text-white bg-dark border-1 border-white py-3 m-3" style={{width:"18rem"}}>
                                <div className="card-body text-white bg-dark">
                                <h4 className="card-title text-white">{jobPosting["jobPostName"]}</h4>
                                <hr/>
                                <h5 className="card-subtitle mb-2 text-white-50">{jobPosting["employer"]["employerName"]}</h5>
                                <p className="card-text">Salary: {jobPosting["salaryRange"]}</p>
                                <a href={`/JobPost/${jobPosting["jobId"]}`}>Details</a>
                           </div>
                        </div>
                        ))
                    }
                </div> 
            ))}
        </div>
    )
}