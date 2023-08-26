import React, { useContext } from 'react'
import { ContextAPI } from '../store/ContextAPI'
import { Link } from 'react-router-dom'
import AddExpenseForm from './AddExpenseForm'
import { useDispatch } from 'react-redux'
import { authAction } from '../reduxStore/AuthSlice'

const ExpenseTracker = () => {
  // const dispatch=useDispatch()

  const dispatch=useDispatch();
  const ctx=useContext(ContextAPI)
  const logoutHandler=()=>{
    localStorage.clear()
    // ctx.setisToken(false)


    dispatch(authAction.logout())
    // dispatch(authAction.logout())
  }
  let url;
  const verifyEmail= async()=>{
    url="https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvLRWgwVfsZvKpvNKNx7N3K8VdxIKoDfM"
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
    <div >
      <div>
        <div className='row container p-3 m-5  border border-2-solid border-primary'>
        <div className='col-4'>
        <button class="btn btn-primary" onClick={logoutHandler}>Log out</button>
        </div>
        <div className='col-4'>
        <Link  to="/Profile">Complete your account</Link>
        </div>
        <div className='col-4'>
        <button className='btn btn-primary' onClick={verifyEmail}>Verify your E-mail</button>
        </div>
        </div>
      </div>
     <div className='p-3 m-5' > Welcome to ExpenseTracker</div>
    
      
      
      <AddExpenseForm/>
    </div>
    
  )
}

export default ExpenseTracker