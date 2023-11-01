import { useEffect, useState } from "react"
import {auth,prov,db} from "../config/firebase"
import { getDocs,collection } from "firebase/firestore"
import {createUserWithEmailAndPassword, signInWithPopup,signOut} from "firebase/auth"
export const Auth = ()=>
{
    const [book,setbook] = useState();
    const [email,setemail] = useState();
    const [password,setpassword] = useState();
    const collectionref = collection(db,"book")
    const sign =async()=>
    {
        try{
            await createUserWithEmailAndPassword(auth,email,password)
        }
        catch(err)
        {
            console.log(err);
        }
    }
    useEffect(()=>
    {
        const getbooklist = async()=>
    {
        try{
            const data = await getDocs(collectionref)
            console.log(data)

        }
        catch(err)
        {
            console.log(err)
        }
        
    }
    getbooklist()
    },[])
    const signinwithgoogle = ()=>
    { 
        signInWithPopup(auth,prov)  
    }
    const fb = ()=>
    {
        
        console.log("connect tofb")
    }
    console.log(auth?.currentUser?.email)
    const out = async()=>
    {
        try{
           await signOut(auth)
        }
        catch(err)
        {
            console.log(err)
        }
        
    }
 return(
    <div>
        <input placeholder="email..." type="email" onChange={(e)=> setemail(e.target.value)}/>
        <input placeholder="password...."  type="password" onChange={(e)=>setpassword(e.target.value)}/>
        <button onClick={signinwithgoogle} >singin with google</button>
        <button onClick={sign}>Sign in</button>
        <button onClick={out}>logout</button>
        
    </div>
 )   
}
 