import { useReducer, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/user_side/Home";
import Login from "./pages/user_side/Login";
import SignUp from "./pages/user_side/Signup";
import Profile from "./pages/user_side/Profile";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import Loggined from "./components/Loggined";
import AdminLogginedRoutes from "./components/AdminLogginedRoutes";
import Dashboard from "./pages/admin_side/Dashboard";
import AdminPrivateRoutes from "./components/AdminPrivateRoutes";
import AdminLogin from "./pages/admin_side/AdminLogin";

function App() {
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={ <AdminPrivateRoutes />}>
            <Route path='/admin/' element={<Dashboard />} />
          </Route>
          <Route element={ <AdminLogginedRoutes/>}>
            <Route path='/admin/login' element={<AdminLogin />} />
          </Route>
          <Route element={<Loggined />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
