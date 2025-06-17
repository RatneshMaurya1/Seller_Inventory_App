import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { validateUser } from "../services";
import toast from "react-hot-toast";

export default function Layout() {
    const [user,setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
     const isUser = async () => {
        if(!localStorage.getItem("token")){
            return navigate("/login")
        }
        try {
            const response = await validateUser()
            setUser(response.user)
        } catch (error) {
            toast.error(error.message)
        }
     }
     isUser()
    },[])
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100">
        <Navbar user={user}/>

        <Outlet /> 
      </main>
    </div>
  );
}
