import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { TbBrandProducthunt } from "react-icons/tb";
import { IoPeople } from "react-icons/io5";
import { FaCartFlatbed } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <MdHome /> },
  { to: "/products", label: "Products", icon: <TbBrandProducthunt /> },
  { to: "/buyers", label: "Buyers", icon: <IoPeople /> },
  { to: "/orders", label: "Orders", icon: <FaCartFlatbed /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-2 left-2 z-50 bg-gray-800 text-white p-2 rounded">
        <button className=" cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu size={24} />
        </button>
      </div>

      <div className="hidden md:flex flex-col w-64 min-h-screen bg-gray-800 text-white p-5">
        <h2 className="mt-10 text-2xl font-bold mb-6">Seller Panel</h2>
        <SidebarLinks />
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#000000aa]" onClick={() => setIsOpen(false)}>
          <div className="w-64 h-full bg-gray-800 text-white p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Seller Panel</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-2xl"
              >
                &times;
              </button>
            </div>
            <SidebarLinks close={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function SidebarLinks({ close }) {
  return (
    <ul className="space-y-4 w-full">
      {links.map(({ to, label, icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-x-2 px-3 py-2 rounded text-lg font-bold transition-colors duration-200
              ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-300 hover:text-black"
              }`
            }
            onClick={close} 
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
