import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "./services/auth";
import Context from './store/context'
function SignUpPage() {
    const {state, actions} = useContext(Context)
    const [userData, setData] = useState({})
    const nav = useNavigate()
    const handleChange = (event)=>{
        setData(val=>({...val, [event.target.name]: event.target.value}))
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(userData)
        auth.signup(userData).then(data=>{
            console.log(data)
            auth.setUserSession(data.data)
            actions({
                type: 'setState',
                payload: { ...state, 'user': data.data}
            })
            nav('/account/details')
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="landing-page w-100 p-4 d-flex flex-column justify-content-center align-items-center" style={{ "minHeight": "80vh" }}>
            <div>
                <h2>Create an account</h2>
                <p className="text-muted">Please give following details to continue.</p>
            </div>
            <form onSubmit={handleSubmit} style={{maxWidth:500}}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input required name="firstname" type="text" value={userData.firstname || ''} onChange={handleChange} className="form-control" placeholder="Elon" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input name="lastname" type="text"  value={userData.lastname || ''} onChange={handleChange} className="form-control" placeholder="Musk" />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mb-3">
                            <label  className="form-label">Email address</label>
                            <input required name="email" type="email"  value={userData.email || ''} onChange={handleChange} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mb-3">
                            <label className="form-label">Create Password</label>
                            <input required name="password" type="password"  value={userData.password || ''} onChange={handleChange} className="form-control" id="exampleFormControlInput2" placeholder="*****" />
                        </div>
                    </div>
                </div>

                <input type="submit" value="Sign In" className="btn btn-primary w-100 mb-2" />
                <p>Didn't have an account? <Link to="/signup">Register</Link> </p>
            </form>
        </div>
    );
}

export default SignUpPage;
