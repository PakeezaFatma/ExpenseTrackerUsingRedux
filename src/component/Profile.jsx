import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Profile = () => {
  const [fullName,setFullName]=useState("");
  const [photoUrl,setPhotoUrl]=useState("");

  const navigate=useNavigate();
  const backHandler=()=>{
    navigate("/")
  }

  let url;
  const auth=async()=>{
    url="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDs-VSDlngvQJKL0oshYK5r4pM_rSD7zqE";
    try{
      const res=await fetch (url,{
        method:"POST",
        body:JSON.stringify({
          idToken:localStorage.getItem("token"),
          displayName:fullName,
          photoUrl:photoUrl,
          deleteAttribute:null,
          returnSecureToken:true
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
      else{
        alert("Profile Updated")
      }
    }
    catch(e){
      console.log(e.message)
    }
  }
  const toGetData=async()=>{
    url="https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDs-VSDlngvQJKL0oshYK5r4pM_rSD7zqE"
    {
      try{
        const res=await fetch(url,{
          method:"POST",
          body:JSON.stringify({
          idToken:localStorage.getItem("token")

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
        else{
          console.log(data.users,"<--------------------------------------------------------")
          setFullName(data.users[0].displayName);
          setPhotoUrl(data.users[0].photoUrl);
        }
      }
      catch(e){
        console.log(e);
      }
    }
  }
  useEffect(()=>{
    toGetData();
  },[])
  return (
    <div class="container p-3 my-5 d-flex flex-column w-50 border border-2-solid border-primary ">
      <h2>Complete your account</h2>
      <h6>Contact Details</h6>
      <div>
        <button class="btn btn-outline-danger" onClick={backHandler}>Cancel</button>
      </div>
      <div className='row'>
        <div className='col-6'>
        <label for="exampleInputEmail1" class="form-label">
            Full Name
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
          />
        </div>
        <div className='col-6'>
        <label for="exampleInputEmail1" class="form-label">
            Profile photo user Url
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={photoUrl}
            onChange={(e)=>setPhotoUrl(e.target.value)}
          />
          </div>
          <div><button class="btn btn-primary mt-3" onClick={auth}>Update</button></div>
      </div>


    </div>
  )
}

export default Profile