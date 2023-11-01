import { useState } from "react"
import {auth} from "../config/firebase"
import {createUserWithEmailAndPassword} from "firebase/auth"
export const Auth = ()=>
{
    const [email,setemail] = useState();
    const [password,setpassword] = useState();
    const sign = ()=>
    {

    }
 return(
    <div>
        <input placeholder="email..."/>
        <input placeholder="password...."/>
        <button onClick={sign}>Sign in</button>
    </div>
 )   
}