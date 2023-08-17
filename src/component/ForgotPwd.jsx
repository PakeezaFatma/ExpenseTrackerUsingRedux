import React, { useState } from 'react'
import { json } from 'react-router-dom';

const ForgotPwd = () => {
    const [confirmEmail,setConfirmEmail]=useState("");
    const ConfEmailHandler=(e)=>{
        setConfirmEmail(e.target.value)
    }
    let url;
    const auth=async()=>{
      url="https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDs-VSDlngvQJKL0oshYK5r4pM_rSD7zqE"
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
    <div class="container p-3 my-5 d-flex flex-column w-50">
       <h5>Enter with the email which you have registered</h5> 
       
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={confirmEmail}
            onChange={ConfEmailHandler}
          />
          <button onClick={submitHandler}>Send Link</button>
    </div>
  )
}

export default ForgotPwd