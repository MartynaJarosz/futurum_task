import './ViewCampaign.css';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewCampaign(){
    const {campaignId} = useParams();
    const [campaigns,setCampaigns]=useState({});

    useEffect(()=>{
        fetch("http://localhost:8000/campaign/"+campaignId)
        .then((res)=>res.json())
        .then((data)=>setCampaigns(data))
        .catch((err)=>console.log(err.message))
    },[]);

    return(
        <div className="container">
            <h1>Campaign Details</h1>

            {campaigns && <div className="details">
                <p><strong>Name:</strong> {campaigns.name}</p>
                <p><strong>Keywords:</strong> {campaigns.keywords && campaigns.keywords.join(', ')}</p>
                <p><strong>Bid Amount:</strong> {campaigns.bid} zł</p>
                <p><strong>Campaign Fund:</strong> {campaigns.fund} zł</p>
                <p><strong>Status:</strong> {campaigns.status ? 'ON' : 'OFF'}</p>
                <p><strong>Town:</strong> {campaigns.town}</p>
                <p><strong>Radius:</strong> {campaigns.radius} km</p>
            </div>}

            <div>
                <Link to={`/campaign/form/${campaigns.id}`} className="btn btn-edit">Edit</Link>
                <Link to="/" className="btn btn-back">Back</Link>
            </div>
        </div>
    )
}