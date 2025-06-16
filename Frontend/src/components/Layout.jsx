// components/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100">
        <Navbar/>

        <Outlet /> {/* This renders the child route component */}
      </main>
    </div>
  );
}
