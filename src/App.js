


import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import ForgotPwd from './component/ForgotPwd';

function App() {
  return (
   
    <Routes>
      <Route path='/' element={ <Login/>} />
      <Route path='forgotpwd' element={<ForgotPwd/>}/>
    </Routes>
   
  );
}

export default App;
