import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Context from './store/context'
function AccountLayoutPage() {
    const {state,actions} = useContext(Context)
    return (
        <div className="w-100 p-4">
            <div className="row">
                <div className="col-sm-4">
                    <div style={{minWidth:200}} className="p-3 bg-light">
                        <NavLink className="nav-item" activeclassname="active" to="/account/details">Details</NavLink>
                        {state?.user?.user?.is_admin?(<NavLink className="nav-item" activeclassname="active" to="/account/users">Users</NavLink>):''}
                    </div>
                </div>
                <div className="col-sm-8">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default AccountLayoutPage;
