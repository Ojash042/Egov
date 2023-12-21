import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export function JobDetails(){
    const job_id = useParams()["job_id"]
    const [jobDetailsData, setJobDetailsData] = useState([]);
    const [jobEmployer, setJobEmployer] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/JobDetails/${job_id}`)
        .then((response)=>{
            setJobDetailsData(response.data)
            setJobEmployer(response.data.employer)
        })
    }, []);
    
    return(
        <div className="bg-dark text-white my-3 p-5 mb-4 align-items-center">
            <div className="card bg-dark text-white border-0">
                <div className="row d-flex border-0 shadow-none justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card border-top bg-dark border-bottom border-3 border-white" style={{borderColor: "#f37a27 !important;"}}>
                        <div className="card-body text-white p-5">
                            <h3 className="fw-bolder mb-5" style={{color:"#f37a27 !important;"}}>Looking For: {jobDetailsData["jobPostName"]}</h3>
                            <div className="row">
                                <div className="col mb-3">
                                    <p className="fw-semibold text-white-50 mb-1">{jobEmployer["employerName"]}</p>
                                    <p className="small text-white-50 mb-1">{jobEmployer["employerProvince"]}, {jobEmployer["employerLocation"]}</p>
                                </div>
                                <div className="col mb-3">
                                    <p className="fw-semibold text-white mb-1">Salary Range</p>
                                    <p className="fw-bold text-white mb-1">{jobDetailsData["salaryRange"]}</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="px-5 py-4  w-100">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="fw-bold text-white">Job Details:</h6>    
                                    </div>
                                    <div className="col-lg-9">
                                        <p className="text-white">{jobDetailsData["jobDetails"]}</p>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="px-5 py-4  w-100">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="fw-bold text-white">Employer Details:</h6>    
                                    </div>
                                    <div className="col-lg-9">
                                        <p className="text-white">{jobEmployer["employerDetails"]}</p>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <a className="btn btn-secondary w-25 align-items-center ms-5">Apply Now</a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}