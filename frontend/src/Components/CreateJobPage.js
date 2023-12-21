import {useState} from "react";
import axios from "axios";
import {getCookie} from "../Services";
import {useNavigate} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min"
import "bootstrap/dist/js/bootstrap.bundle"

export function CreateJobPage(){
    const csrftoken = getCookie("csrftoken")
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        jobName:'',
        minimumSalary:"",
        maximumSalary:"",
        jobDetails:"",
    })
    const [errorMessages, setErrorMessages] = useState([])
    
    function handleChange(event){
        const target = event.currentTarget
        setFormData({
            ...formData,[target.name]: target.value
        })
        setErrorMessages([])
    }
    const validateForm = {
        jobName: !!formData.jobName && formData.jobName.match(/^ *$/) === null,
        minimumSalary: !!formData.minimumSalary && (Number(formData.minimumSalary) < Number(formData.maximumSalary)),
        maximumSalary: !!formData.maximumSalary && (Number(formData.maximumSalary) > Number(formData.minimumSalary)),
        jobDetails: !!formData.jobDetails && formData.jobDetails.match(/^ *$/) === null
    }
    function handleSubmit(event){
        event.preventDefault()
        setErrorMessages([])
        
        if(!validateForm.jobName)
            setErrorMessages((prevError)=>[...prevError,"Invalid Post Title"])
        if(!validateForm.minimumSalary)
            setErrorMessages((prevError)=>[...prevError, "Min Salary must be smaller than max salary"])
        if(!validateForm.maximumSalary)
            setErrorMessages((prevError)=>[...prevError,"Max Salary must be greater than min salary"])
        if(!validateForm.jobDetails)
            setErrorMessages((prevError)=>[...prevError,"Invalid Details"])
        
        let config = {
            headers:{
                "X-CSRFToken":csrftoken
        }
        }
        if(Object.values(validateForm).every(key=>key)){
            axios.post("/CreateJobPost/",formData,config).then((response)=>{
                window.location.href = "/"
            }).catch((error)=>{
                if(error.response && error.response.data && error.response.data.error){
                    setErrorMessages((prevError)=> [...prevError,error.response.data.error])
                }
            })
        }
    }
    
    return(
        <div className="align-items-center m-auto shadow-4-secondary my-3 p-5 col-xs-12 col-md-8 bg-dark">
            <form onSubmit={handleSubmit}>
                <h2 className="text-white mb-5">Create A Job Posting</h2>
                <div id="error-div" className="text-warning">
                    {errorMessages.map((message)=>(
                        <li>{message}</li>
                    ))}
                </div>
                <div className="row mb-4 justify-content-sm-between align-items-center">
                    <div className="form-outline row my-3">
                        <label htmlFor="JobName" className="form-label text-center text-white">Job Post Title</label>
                        <input type="text" id="JobName" name="jobName" value={formData.jobName} onChange={handleChange}
                               className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 border-white text-center" required/>
                    </div>
                    <h4 className="fw-bolder my-3">Salary Range</h4>
                    <div className="form-outline my-3 row">
                        <div className="col">
                            <label htmlFor="MinSalary" className="form-label text-center text-white">Min Salary</label>
                            <input type="text" id="MinSalary" name="minimumSalary" value={formData.minimumSalary} onChange={handleChange}
                                   className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 border-white text-center" required/>
                        </div>
                        <div className="col">
                            <label htmlFor="MaxSalary" className="form-label text-center text-white">Max Salary</label>
                            <input type="text" id="MaxSalary" name="maximumSalary" value={formData.maximumSalary} onChange={handleChange}
                                   className="d-inline-flex text-white bg-dark form-control border-0 border-bottom rounded-0 border-white text-center" required/>
                        </div>
                    </div>
                    <div className="form-outline row my-3">
                        <label htmlFor="JobDetails" className="form-label text-center text-white">Details on Job Posting</label>
                        <textarea id="JobDetails" name="jobDetails" rows="2" value={formData.jobDetails} onChange={handleChange}
                                      className="d-inline-flex text-white bg-dark form-control border-1 rounded-0 border-white" required/>
                    </div>
                </div>
                <div className="row">
                    <button type="submit" className="w-responsive bg-dark p-2 text-white rounded-botttom-pill">Submit</button>
                </div>
            </form>
        </div>
        
    )
}