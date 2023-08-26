import React, { useState } from 'react'
import { Link, json } from 'react-router-dom';

const ForgotPwd = () => {
    const [confirmEmail,setConfirmEmail]=useState("");
    const ConfEmailHandler=(e)=>{
        setConfirmEmail(e.target.value)
    }
    let url;
    const auth=async()=>{
      url="https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvLRWgwVfsZvKpvNKNx7N3K8VdxIKoDfM"
      try{

        const res=await fetch(url,{
          method:"POST",
          body:JSON.stringify({
            requestType:"PASSWORD_RESET",
            email:confirmEmail
          }),
          headers:{
            "Content-type":"application/json"
          }
        })
        const data=await res.json();
        console.log(data);
        if(data.error){
          alert(data.error.message);
        }
      }
      catch(e){
        console.log(e)
      }
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        auth();
    }
  return (
    <div class="container p-3 my-5 d-flex flex-column w-50 border border-2-solid border-primary ">
       <h5 >Enter with the email which you have registered</h5> 
       
          <input
            type="email"
            class="form-control mb-2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={confirmEmail}
            onChange={ConfEmailHandler}
          />
          <div className='d-flex justify-content-between'>
          <button  class="btn btn-primary mt-3" onClick={submitHandler}>Send Link</button>
          <Link to="/">All ready a User ? Login</Link>
          </div>
    </div>
  )
}

export default ForgotPwd