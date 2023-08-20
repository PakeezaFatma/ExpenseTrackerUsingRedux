import React, { useContext } from 'react'
import { ContextAPI } from '../store/ContextAPI'
import { Link } from 'react-router-dom'

const ExpenseTracker = () => {
  const ctx=useContext(ContextAPI)
  const logoutHandler=()=>{
    localStorage.clear()
    ctx.setisToken(false)
  }
  let url;
  const verifyEmail= async()=>{
    url="https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDs-VSDlngvQJKL0oshYK5r4pM_rSD7zqE"
    try{
      
      const res=await fetch(url,{
        method:"POST",
        body:JSON.stringify({
          requestType:"VERIFY_EMAIL",
          idToken:localStorage.getItem("token")
        }),
        headers:{
          "Content-type":"application/json"
        }

      })
      const data=await res.json();
      console.log(data);
      if(data.error)
      {
        alert(data.error.message);
      }
      else{
        alert("Check your inbox")
      }
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <div>Welcome to ExpenseTracker
      <button class="btn btn-primary" onClick={logoutHandler}>Log out</button>
      <Link  to="/Profile">Complete your account</Link>
      <button onClick={verifyEmail}>Verify your E-mail</button>
    </div>
    
  )
}

export default ExpenseTracker