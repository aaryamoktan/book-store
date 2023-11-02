import { useEffect, useState } from "react"
import {auth,prov,db} from "../config/firebase"
import { getDocs,collection,addDoc,deleteDoc,doc } from "firebase/firestore"
import {createUserWithEmailAndPassword, signInWithPopup,signOut,} from "firebase/auth"
export const Auth = ()=>
{
    const [book,setbook] = useState();
    const [booktitle,setbooktitle] =useState()
    const [releasedate,setreleasedate] =useState()
    const [bestseller,setbestseller] =useState(false)
    const [email,setemail] = useState();
    const [password,setpassword] = useState();
    const collectionref = collection(db,"bookstore")
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
    const getbooklist = async()=>
    {
        try{
            const data = await getDocs(collectionref)
            const filterdata = data.docs.map((e)=>({...e.data(),id:e.id}))
            setbook(filterdata)
        }
        catch(err)
        {
            console.log(err)
        }
        
    }
    const deletebook = async(id)=>
    {
        try{
             await deleteDoc(doc(db,"bookstore",id))
             
             getbooklist()
        }
        catch(err)
        {
            console.log(err)
        }
    }
    
        useEffect(()=>
    {
      
    getbooklist()
    },[])
    const submit = async()=>
    {
        try{
            await addDoc(collectionref,{title:booktitle,date:releasedate,Best_Seller:bestseller});
            getbooklist()
        }
        catch(err)
        {
            console.log(err)
        }
    }
    const signinwithgoogle = ()=>
    { 
        signInWithPopup(auth,prov)  
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
        <div className="bopk">
        <br></br>
            <input type="text" onChange={ (e)=> setbooktitle(e.target.value)} placeholder="booktitle"/>
            <input type="date" onChange={(e)=> setreleasedate(e.target.value)} placeholder="release date"/>
            <input type="checkbox" checked={bestseller} onChange={(e)=>setbestseller(e.target.checked)}/>Best Seller
            <button onClick={submit}>Submit</button>
            <br/>
        </div>
        <table>
                            <tr>
                                <th>title</th>
                                <th>date</th>
                                
                            </tr>
                            {
            book && book.map((e)=>
            {
                const {title,date,id} = e
                return(
                    <>
                        
                            <tr>
                                <td>{title}</td>
                                <td>{date}</td>
                                <td><button onClick={()=>deletebook(id)}> delete</button></td>
                                
                            </tr>

                        
                        
                    </>
                )
            })
        }</table>
    </div>
  
 )   
}
 