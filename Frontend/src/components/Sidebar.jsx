import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { TbBrandProducthunt } from "react-icons/tb";
import { IoPeople } from "react-icons/io5";
import { FaCartFlatbed } from "react-icons/fa6";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <MdHome /> },
  { to: "/products", label: "Products", icon: <TbBrandProducthunt /> },
  { to: "/buyers", label: "Buyers", icon: <IoPeople /> },
  { to: "/orders", label: "Orders", icon: <FaCartFlatbed /> },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col items-center w-64 min-h-screen bg-gray-800 text-white p-5">
      <h2 className="mt-10 text-2xl font-bold mb-6">Seller Panel</h2>
      <ul className="space-y-4 w-full">
        {links.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-x-2 px-3 py-2 rounded text-lg font-bold transition-colors duration-200
                ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-300 hover:text-black"}`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
