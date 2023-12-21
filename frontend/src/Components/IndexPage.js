import React from 'react'
import "bootstrap/dist/js/bootstrap.min"

export function IndexPage(){
    return (
        <div className="container-fluid m-0 p-0">
        <div className="row">
            <div className="min-vw-100" style={{height:"18rem", backgroundColor:"#175a93"}}>
                <div className="row">
                    <h1 className="my-3 pt-5 ps-5 text-white fw-bolder" style={{fontFamily:"GDS Transport"}}>Welcome to Rojgar</h1>
                    <p className="lead mx-3 px-5 text-white fs-5" style={{fontFamily:"GDS Transport"}}>A Platform for Providing Job Opportunities to the citizens of Nepal</p>
                    <h4 className="mx-3 px-5 text-white fw-semibold" style={{fontFamily:"GDS Transport"}}>Simple. Clear and Accessible</h4>
                </div>
            </div>
        </div>
        <div className="row py-5  align-items-center my-2 text-white">
            <h2 className="text-center fw-bolder">About Us</h2>
            <p className="lead fw-light text-center fs-4 w-50 m-auto py-3">We provide a space where the unemployed citizens of Nepal have a better oppurtunity for accessing employment opportunities through the means of e-governmental sector.
                Rojgar helps people access the job opportunities provided by different governmental infrastructure including health, education and many other services 
            </p>
        </div>
            <div className="row align-items-center py-3 my-2 text-white">
                    <a className="btn btn-primary text-center m-auto w-25 fs-5 h5" href="/JobListings">Apply For a Job Now</a>
            </div>
    </div>
    )
}