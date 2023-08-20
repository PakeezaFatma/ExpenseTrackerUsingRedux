


import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import ForgotPwd from './component/ForgotPwd';
import ExpenseTracker from './component/ExpenseTracker';
import { useContext } from 'react';
import { ContextAPI } from './store/ContextAPI';
import Profile from './component/Profile';

function App() {
  const ctx=useContext(ContextAPI);
  return (
   
    <Routes>
      {/* <Route path='/' element={ <Login/>} /> */}
      {
        ctx.isToken ? (
          <Route path='/' element={<ExpenseTracker/>}/>
        )
          :(
            <Route path='/' element={<Login/>}/>
          )
        
      }
      <Route path='forgotpwd' element={<ForgotPwd/>}/>
      <Route path='profile' element={<Profile/>}/>
    </Routes>
   
  );
}

export default App;
