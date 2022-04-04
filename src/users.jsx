import { useEffect, useState } from "react";
import auth from "./services/auth";
import AddUser from "./user-add";

function UsersPage() {
    let [users, setUserData] = useState(undefined);
    let [editUser,setEdit] = useState(null)
    useEffect(()=>{
        if(users){
            return
        }
        auth.getUsers().then(d => {
            setUserData(d.data);
        }).catch(err => {
            console.log(err)
        })
    })

    const handleAddUpdate = ()=>{
        setEdit(null)
        auth.getUsers().then(d => {
            setUserData(d.data);
        }).catch(err => {
            console.log(err)
        })
    }

    const deleteUser = (user)=>{
        auth.deleteUser(user?._id)
            .then(u=>{
                handleAddUpdate();
            }).catch(err=>{
                console.log(err)
            })
    }
    return (

        <>
        
        <div className="modal fade" id="modelId" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{editUser?'Update': 'Add'} User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <AddUser onUpdate={handleAddUpdate} userData={editUser} />
                    
                </div>
            </div>
        </div>

        <div className="landing-page w-100 p-5 " style={{ "minHeight": "80vh" }}>
            <div className="row w-100">
                <div className="col-md-12 d-flex ">
                    <form style={{ width: '100%' }}>
                        <h2>Users
                            <button type="button" data-bs-toggle="modal" data-bs-target="#modelId" onClick={()=>{setEdit(null)}} className="btn btn-primary float-end">Add user</button>
                        </h2>
                        <hr />

                    </form>
                </div>
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Is admin?</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map(u => {
                                    return <tr>
                                        <td>{u._id}</td>
                                        <td>{u.firstname} {u.lastname}</td>
                                        <td>{u.email}</td>
                                        <td className={u.is_admin?'text-success':'text-muted'} >{u.is_admin?'Yes':'No'}</td>
                                        <td>
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#modelId" onClick={()=>{setEdit(u)}} className="btn btn-sm btn-primary me-2 mb-1">Edit</button>
                                            <button type="button" onClick={()=>{deleteUser(u)}} className="btn btn-sm btn-danger me-2 mb-1">Delete</button>
                                        </td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>

                </div>

            </div>
        </div>
        </>
    );
}

export default UsersPage;
