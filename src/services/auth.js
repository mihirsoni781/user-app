import { useCookies } from 'react-cookie';
import {environment} from '../environment'
import Cookies from 'universal-cookie'
import useGlobalState from '../store/useGlobalState';
const cookies = new Cookies();
const axios = require('axios').default;
class Auth{
    constructor(){
        if(cookies.get('user')){
            this.active_user = cookies.get('user')
            console.log(this.active_user)
        }
    }

    login(payload){
        return axios.post(`${environment.apiEndPoint}/api/auth/signin`,payload);
    }
    signup(payload){
        return axios.post(`${environment.apiEndPoint}/api/auth/signup`,payload);
    }
    isUserLoggedIn(){
        return this.isLoggedIn;
    }
    setUserSession(data){
        this.active_user = data;
        cookies.set('user',JSON.stringify(this.active_user),{
            path:'/',
            expires: new Date(Date.now()+604800000)
        })
    }

    logout(){
        cookies.remove('user')
        this.active_user = null
    }

    getUserDetails(){
        return axios.get(`${environment.apiEndPoint}/api/user/me`,{
            headers:{
                Authorization: `Bearer `+this.active_user?.access_token
            }
        })
    }

    updateUserDetails(data){
        return axios.patch(`${environment.apiEndPoint}/api/user/me`,data,{
            headers:{
                Authorization: `Bearer `+this.active_user?.access_token
            }
        })
    }

    getUsers(){
        return axios.get(`${environment.apiEndPoint}/api/user`,{
            headers:{
                Authorization: `Bearer `+this.active_user?.access_token
            }
        })
    }
    addUser(data){
        return axios.post(`${environment.apiEndPoint}/api/user`,data,{
            headers:{
                Authorization: `Bearer `+this.active_user?.access_token
            }
        })
    }
    updateUser(data){
        return axios.patch(`${environment.apiEndPoint}/api/user/${data._id}`,data,{
            headers:{
                Authorization: `Bearer `+this.active_user?.access_token
            }
        })
    }

    deleteUser(id){
        return axios.delete(`${environment.apiEndPoint}/api/user/${id}`,{
            headers:{
                Authorization: `Bearer `+this.active_user?.access_token
            }
        })
    }
}

export default new Auth()