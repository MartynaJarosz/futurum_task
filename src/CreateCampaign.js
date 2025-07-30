import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateCampaign(){
    const [formData, setFormData] = useState({
        name: '',
        keywords: '',
        bid: '',
        fund: '',
        status: true,
        town: '',
        radius: ''
    });
    const [validation, setValidation] = useState(false);
    const navigate = useNavigate();
    const handleChange=(e)=>{
        const {name, value, type, checked}=e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData(prev=>({...prev, [name]: val}));
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    const campaignData= formData;
    console.log(campaignData);

    fetch("http://localhost:8000/campaign", {
        method:'POST',
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(campaignData)
    })
    .then((res)=>{
        alert("New Campaign added successfully")
    })
    .catch((err)=>console.log(err.message))
    navigate("/");
  }
    return(
        <div className="container">
            <h1>Add New Campaign</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" id="name" name="name" required onChange={handleChange}/><br></br>
                {formData.name.length===0 && validation && <p className="errorMsg">Enter campaign name</p>}
                
                <label>Keywords:</label>
                <input type="text" id="keywords" name="keywords" required onChange={handleChange}/><br></br>
                {formData.keywords.length===0 && validation && <p className="errorMsg">Enter keywords</p>}

                <label>Bid Amount (zł):</label>
                <input type="number" id="bid" name="bid" step="0.01" min="0.01" required onChange={handleChange}/><br></br>
                {formData.bid.length===0 && validation && <p className="errorMsg">Enter bid amount</p>}

                <label>Campaign Fund (zł):</label>
                <input type="number" id="fund" name="fund" min="1" required onChange={handleChange}/><br></br>
                {formData.fund.length===0 && validation && <p className="errorMsg">Enter campaign fund</p>}

                <label>Status:</label>
                <input type="checkbox" id="status" name="status" onChange={handleChange} checked={formData.status}/>{formData.status ? 'ON' : 'OFF'}<br></br>

                <label>Town:</label>
                <select id="town" name="town" required onChange={handleChange}>
                    <option value="select">Select town</option>
                    <option value="Krakow">Krakow</option>
                    <option value="Warsaw">Warsaw</option>
                    <option value="Wroclaw">Wroclaw</option>
                    <option value="Gdansk">Gdansk</option>
                </select><br></br>
                {formData.town.length===0 && validation && <p className="errorMsg">Choose town from the list</p>}

                <label>Radius (km):</label>
                <input type="number" id="radius" name="radius" step="0.1" min="0" required onChange={handleChange}/><br></br>
                {formData.radius.length===0 && validation && <p className="errorMsg">Enter campaign radius</p>}

                <div>
                    <button className="btn btn-save" onMouseDown={()=>setValidation(true)}>Save</button>
                    <Link to="/" className="btn btn-back">Back</Link>
                </div>
                
            </form>
        </div>
    )
}