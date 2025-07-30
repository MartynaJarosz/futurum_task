import './CampaignForm.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateCampaign(){
    const {campaignid} = useParams();
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

    useEffect(() => {
        if (campaignid) {
            fetch(`http://localhost:8000/campaign/${campaignid}`)
            .then(res => res.json())
            .then(data => setFormData(data))
            .catch(err => console.error("Fetch error:", err));
        }
    }, [campaignid]);

    const EMERALD_BALANCE = 1000;
    const fundValue = parseFloat(formData.fund) || 0;
    const newBalance = EMERALD_BALANCE - fundValue;
    const fundError = parseFloat(formData.fund) > EMERALD_BALANCE;

    const handleChange=(e)=>{
        const {name, value, type, checked}=e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData(prev=>({...prev, [name]: val}));
    };

    const handleSubmit=(e)=>{

        e.preventDefault();
        const campaignData= formData;
        const method = campaignid ? "PUT" : "POST";

        if (fundValue > EMERALD_BALANCE) {
            alert("Not enough funds.");
            return;
        }

        fetch(`http://localhost:8000/campaign${campaignid ? `/${campaignid}` : ''}`, {
            method,
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(campaignData)
        })
        .then((res)=>{
            alert(campaignid ? "Campaign updated successfully!" : "Campaign created successfully!");
            navigate("/");
        })
        .catch((err)=>console.log(err.message))
        setTimeout(() => {
            window.location.reload();
        }, 100);
  }
    return(
        <div className="container">
            <h1>{campaignid ? "Edit Campaign" : "Create Campaign"}</h1>
            <form onSubmit={(arg) => handleSubmit(arg)}>
                <label>Name:</label>
                <input type="text" id="name" name="name" value={formData.name} required onChange={handleChange}/><br></br>
                {formData.name.length===0 && validation && <p className="errorMsg">Enter campaign name</p>}
                
                <label>Keywords:</label>
                <input type="text" id="keywords" name="keywords" value={formData.keywords} required onChange={handleChange}/><br></br>
                {formData.keywords.length===0 && validation && <p className="errorMsg">Enter keywords</p>}

                <label>Bid Amount (zł):</label>
                <input type="number" id="bid" name="bid" step="0.01" min="0.01" value={formData.bid} required onChange={handleChange}/><br></br>
                {formData.bid.length===0 && validation && <p className="errorMsg">Enter bid amount</p>}

                <label>Campaign Fund (zł):</label>
                <input type="number" id="fund" name="fund" step="0.01" min="0.01" value={formData.fund} required onChange={handleChange}/>
                <p className="balance-info">Current Emerald balance: <strong>{newBalance.toFixed(2)} zł</strong></p>
                {formData.fund.length===0 && validation && <p className="errorMsg">Enter campaign fund</p>}
                {fundError && <p className="errorMsg">Not enough funds.</p>}<br></br>

                <label>Status:</label>
                <div className="status-toggle">
                <input type="checkbox" id="status" name="status" value={formData.status} onChange={handleChange} checked={formData.status}/>
                <span>{formData.status ? 'ON' : 'OFF'}</span><br></br>
                </div>
                <label>Town:</label>
                <select id="town" name="town" value={formData.town} required onChange={handleChange}>
                    <option value="select">Select town</option>
                    <option value="Krakow">Krakow</option>
                    <option value="Warsaw">Warsaw</option>
                    <option value="Wroclaw">Wroclaw</option>
                    <option value="Gdansk">Gdansk</option>
                    <option value="Poznan">Poznan</option>
                </select><br></br>
                {formData.town.length===0 && validation && <p className="errorMsg">Choose town from the list</p>}

                <label>Radius (km):</label>
                <input type="number" id="radius" name="radius" step="0.1" min="0" value={formData.radius} required onChange={handleChange}/><br></br>
                {formData.radius.length===0 && validation && <p className="errorMsg">Enter campaign radius</p>}

                <div>
                    <button className="btn btn-save" onMouseDown={()=>setValidation(true)}>Save</button>
                    <button className="btn btn-back" type="button" onClick={() => navigate(-1)}>Back</button>
                </div>
                
            </form>
        </div>
    )
}