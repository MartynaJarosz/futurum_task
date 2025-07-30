import './ViewCampaign.css';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewCampaign(){
    const {campaignid} = useParams();
    const [campaignes,setCampaignes]=useState({});
    useEffect(()=>{
        fetch("http://localhost:8000/campaign/"+campaignid)
        .then((res)=>res.json())
        .then((data)=>setCampaignes(data))
        .catch((err)=>console.log(err.message))
    },[]);
    return(
        <div className="container">
            <h1>Campaign Details</h1>
            { campaignes && <div className="details">
                <p><strong>Name:</strong> {campaignes.name}</p>
                <p><strong>Keywords:</strong> {campaignes.keywords && campaignes.keywords.join(', ')}</p>
                <p><strong>Bid Amount:</strong> {campaignes.bid} zł</p>
                <p><strong>Campaign Fund:</strong> {campaignes.fund} zł</p>
                <p><strong>Status:</strong> {campaignes.status ? 'ON' : 'OFF'}</p>
                <p><strong>Town:</strong> {campaignes.town}</p>
                <p><strong>Radius:</strong> {campaignes.radius} km</p>
            </div>}
            <div>
                <Link to={`/campaign/form/${campaignes.id}`} className="btn btn-edit">Edit</Link>
                <Link to="/" className="btn btn-back">Back</Link>
            </div>
        </div>
    )
}