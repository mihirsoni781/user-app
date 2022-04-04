import { useState } from "react"
import Cookies from 'universal-cookie'
const cookie = new Cookies();
const useGlobalState = ()=>{
    let user = cookie.get('user');
    console.log(user)
    const [state,setState] = useState({user: user})
    const actions = (action)=>{
        const {payload, type } = action;
        switch(type){
            case 'setState':
                return setState(payload)
            default: 
                return state;
        }
    }
    return {state,actions}
}

export default useGlobalState