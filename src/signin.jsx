import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "./services/auth";
import Context from './store/context'

function SignInPage() {
    const {state, actions} = useContext(Context)
    const [userData, setData] = useState({})
    const nav = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault();
        auth.login(userData).then(data=>{
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

    const handleChange = (event)=>{
        setData(val=>({...val, [event.target.name]: event.target.value}))
    }
    
    return (
        <div className="landing-page w-100 p-4 d-flex flex-column justify-content-center align-items-center" style={{ "minHeight": "80vh" }}>
            <div>
                <h2>Sign in</h2>
                <p className="text-muted">Please enter credentials to continue.</p>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input value={userData.email || ''} onChange={handleChange} name="email" type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input value={userData.password || ''} onChange={handleChange} name="password" type="password" className="form-control" id="exampleFormControlInput2" placeholder="*****"/>
                </div>
                <input type="submit" value="Sign In" className="btn btn-primary w-100 mb-2"/>
                <p>Didn't have an account? <Link to="/signup">Register</Link> </p>
            </form>
        </div>
    );
}

export default SignInPage;
