import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <nav className="w-full bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-gray-800">Inventory</div>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
            >
              Login
            </Link>
          </>
        ) : (
          <span className="text-lg font-medium text-gray-700">
            Welcome, {user.name.split(" ")[0]}
          </span>
        )}
      </div>
    </nav>
  );
}
