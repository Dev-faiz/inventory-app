import {BrowserRouter  , Routes , Route } from "react-router-dom"
import Sidebar from "./components/sidebar/Sidebar";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home/Home"
import Layout from './components/layout/Layout'
import axios from "axios"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true ; 

function App() {
  return (
   <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="dashboard" element={ 
          <Sidebar>
            <Layout>
              <Dashboard />
            </Layout>
          </Sidebar>
         } />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
