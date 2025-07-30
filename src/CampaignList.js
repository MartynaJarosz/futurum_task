import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CampaignList(){
    const [campaignes,setCampaignes]=useState("");


    useEffect(()=>{
        fetch('http://localhost:8000/campaign')
        .then((res)=>res.json())
        .then((data)=>
            setCampaignes(data)).catch((err)=>
            console.log(err.message))
    },[])

    return(
        <div className="container">
            <h1>Campaign List</h1>

            <div className="list-container">
                <Link to="/campaign/create" className="btn-add">Add new Campaign</Link>
            
            {campaignes && campaignes.map((c)=> (
                <div className="campaign-card" key={c.id}>
                    <p><strong>Name:</strong> {c.name}</p>
                    <p><strong>Keywords:</strong> {c.keywords}</p>
                    <p><strong>Status:</strong> {c.status ? 'ON' : 'OFF'}</p>
                    <p><strong>Town:</strong> {c.town}</p>

                    <div>
                        <a href="#" className="btn btn-edit">Edit</a>
                        <a href="#" className="btn btn-delete">Delete</a>
                    </div>
                </div>
                ))
            }
            </div>
        </div>
    )
}