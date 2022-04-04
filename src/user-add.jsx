import { useEffect, useState } from "react";
import auth from "./services/auth";

function AddUser(props) {

    let [userData, setData] = useState(props.userData)
    useEffect(()=>{
        if(props.userData?._id != userData?._id){
            setData(props.userData);
        }
    })
    const handleChange = (event) => {
        setData(val => ({ ...val, [event.target.name]: event.target.value }))
    }

    let [message, setMessage] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData)
        if (props?.userData) {
            auth.updateUser(userData).then(d => {
                props.onUpdate();
                // setMessage({ error: false, detail: 'Profile updated successfully !' })
            }).catch(err => {
                if (err.status === 400) {
                    setMessage({ error: true, detail: err.error.detail })
                }
            })
        }
        else {
            auth.addUser(userData).then(d => {
                // setMessage({ error: false, detail: 'User added successfully !' });
                setData({});
                props.onUpdate();
            }).catch(err => {
                if (err.status === 400) {
                    setMessage({ error: true, detail: err.error.detail })
                }
            })
        }
    }
    return (
        <div className="landing-page w-100 p-5 " style={{ "minHeight": "80vh" }}>
            <div className="row w-100">
                <div className="col-md-12 d-flex ">
                    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
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
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input required name="email" type="email" value={userData?.email || ''} onChange={handleChange} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input value={userData?.is_admin?false:true} onChange={handleChange} type="checkbox" className="form-check-input" name="is_admin" checked={userData?.is_admin} />
                                    <label className="form-check-label" >
                                        Admin
                                    </label>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <textarea required name="address" value={userData?.address || ''} onChange={handleChange} className="form-control" placeholder="Add address .."></textarea>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label className="form-label">Age</label>
                                    <input name="age" value={userData?.age || ''} onChange={handleChange} className="form-control" type="number" />
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
                            <div className="col-sm-12">
                                <div className="mb-3">
                                    <label className="form-label">{props?.userData?'Reset':'Create'} Password</label>
                                    <input name="password" type="password" value={userData?.password || ''} onChange={handleChange} className="form-control" id="exampleFormControlInput2" placeholder="*****" />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <span className={message?.error ? "text-danger" : "text-primary"}>{message?.detail}</span>
                                <input data-bs-dismiss="modal" type="submit" value={props?.userData ? 'Update' : 'Add user'} className="float-end btn btn-primary" />
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default AddUser;
