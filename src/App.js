import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Login";
import ForgotPwd from "./component/ForgotPwd";
import ExpenseTracker from "./component/ExpenseTracker";

import Profile from "./component/Profile";
import { useSelector } from "react-redux";

function App() {
  const authRedux = useSelector((state) => state.AuthReducer.isAuthenticate);

  return (
    <Routes>
      {authRedux ? (
        <Route path="/" element={<ExpenseTracker />} />
      ) : (
        <Route path="/" element={<Login />} />
      )}
      <Route path="forgotpwd" element={<ForgotPwd />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
