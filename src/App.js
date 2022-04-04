
import './App.css';
import { Route, Routes, useNavigate } from 'react-router';
import LandingPage from './landing';
import { Link } from 'react-router-dom';
import SignInPage from './signin';
import SignUpPage from './signup';
import { useContext } from 'react';
import Context from './store/context';
import auth from './services/auth';
import AccountLayoutPage from './account-layout';
import UsersPage from './users';
import AccountPage from './account';
import AddUser from './user-add';
function App(props) {
  const { state, actions } = useContext(Context);
  const navigate = useNavigate()
  const logout = () => {
    console.log('logout')
    actions({
      type: 'setState',
      payload: { ...state, user: null }
    })
    navigate('/')
    auth.logout();
  }
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">UserApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item ml-auto">
                <Link className="nav-link" to={state?.user ? "/account" : "/signin"}>{state?.user ? 'Account' : 'Sign In'}</Link>
              </li>
              {state?.user ? (<li className="nav-item ml-auto">
                <a onClick={logout} className="nav-link">Logout</a>
              </li>) : (<></>)}
            </ul>
          </div>
        </div>  
      </nav>

        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/signin" element={<SignInPage />}></Route>
          <Route exact path="/signup" element={<SignUpPage />}></Route>
          <Route exact path="/account" element={<AccountLayoutPage />}>
            <Route path="details" element={<AccountPage />}/>
            <Route path="users" element={<UsersPage />}/>
            <Route path="add-user" element={<AddUser />}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
