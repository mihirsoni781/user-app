import { useEffect, useState } from "react";
import auth from "./services/auth";

function AccountPage() {
    let [userData, setData] = useState(null)
    useEffect(() => {
        if (userData) {
            return
        }
        let data = auth.getUserDetails();
        data.then(v => {
            setData(v.data)
        })
    });

    const handleChange = (event) => {
        setData(val => ({ ...val, [event.target.name]: event.target.value }))
    }

    let [message,setMessage] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData)
        auth.updateUserDetails(userData).then(d=>{
            setMessage({error:false, detail: 'Profile updated successfully !'})
        }).catch(err=>{
            if(err.status === 400){
                setMessage({error:true,detail: err.error.detail})
            }
        })
    }
    return (
        <div className="landing-page w-100 p-5 " style={{ "minHeight": "80vh" }}>
            <div className="row w-100">
                <div className="col-md-12 d-flex ">
                    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
                        <h2>Account Details</h2>
                        <hr />
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input required name="firstname" type="text" value={userData?.firstname || ''} onChange={handleChange} className="form-control" placeholder="Elon" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input name="lastname" type="text" value={userData?.lastname || ''} onChange={handleChange} className="form-control" placeholder="Musk" />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input required name="email" type="email" value={userData?.email || ''} onChange={handleChange} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <textarea required name="address"  value={userData?.address || ''} onChange={handleChange} className="form-control" placeholder="Add address .."></textarea>  
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label className="form-label">Age</label>
                                    <input  name="age"  value={userData?.age || ''} onChange={handleChange} className="form-control" type="number" />  
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label className="form-label">Gender</label>
                                      <select className="form-select" onChange={handleChange} name="gender" value={userData?.gender || ''} >
                                        <option value="">Not selected</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                      </select>                               
                                </div>
                            </div>
                            <div className="col-md-12">
                                <span className={message?.error?"text-danger":"text-primary"}>{message?.detail}</span>
                                <input type="submit" value="Save" className="float-end btn btn-primary" />
                            </div>
                        </div>

                    </form>
                </div>
                <div className="col-md-6">

                </div>

            </div>
        </div>
    );
}

export default AccountPage;
