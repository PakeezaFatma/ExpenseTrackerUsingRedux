import React, {  useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ContextAPI } from "../store/ContextAPI";

const Login = () => {
  const ctx=useContext(ContextAPI);
  const [email, setEmail]=useState("");
  const [psw,setPsw]=useState("");
  const [CPsw,CsetPsw]=useState("")
  const [login,setLogin]=useState(false);

  const setEmailHandler=(e)=>{
    setEmail(e.target.value);
   
  }
  const setPswHandler =(e)=>{
    setPsw(e.target.value);
  }
  const setLoginHandler=(e)=>{
    setLogin(!login);
  }
  const CsetPswHandler =(e)=>{
    CsetPsw(e.target.value);
  }
  let url;
  const auth =async ()=>{
    if(login){
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDs-VSDlngvQJKL0oshYK5r4pM_rSD7zqE";
    }else{
      url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDs-VSDlngvQJKL0oshYK5r4pM_rSD7zqE";
    }
    
   try{
    const res= await fetch(url,{
      method:"POST",
      body:JSON.stringify({
        email:email,
        password:psw,
        returnSecureToken:true,
      }),
      headers:{
        "Content-Type" : "application/json"
      }
    })
    const data =await res.json();
    console.log(data);
    localStorage.setItem("token",data.idToken);
    ctx.setisToken(true);
    if(data.error)
    {
      alert(data.error.message);
    }
    else{
      alert("login Sucessfull")
    }
   }
   catch(err){
    alert(err.message)
   }
   
  }
  const submit=(e)=>{
    e.preventDefault();
    console.log(email,psw);
    if(email.trim()===""){

      return 
    }
    else{
      auth()
    }
   
  }

  return (
    <div class="container p-3 my-5 d-flex flex-column w-50 border border-2-solid border-primary ">
      <form onSubmit={submit} className="m-3">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={setEmailHandler}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={psw}
            onChange={setPswHandler}
          />
          {
            !login && 
            <div className="mb-3">
              <label for="exampleInputPassword" class="form-label1">
            Confirm Password
          </label>
            <input
            type="password"
            class="form-control"
            id="exampleInputPassword2"
            value={CPsw}
            onChange={CsetPswHandler}
          />
            </div>
          }
        </div>
        
        <div className="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary" >
          {login ? "Sign in": "Sign Up"}
        </button>
        <h5><Link to="/forgotpwd">Forgot Password</Link></h5>
        <button class="btn btn-primary" type="button" onClick={setLoginHandler}>
          {
            login ? "Sign Up" :"All ready You have an account Login"

          }
        </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
