import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Clear local storage or perform any other logout logic
    localStorage.removeItem("Authorization");
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <ul className="flex justify-end space-x-4">
        <li>
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Home
          </a>
        </li>
        {localStorage.getItem("Authorization") && (
          <li>
            <a
              href="/notes"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              See My Notes
            </a>
          </li>
        )}
        {localStorage.getItem("Authorization") && (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Logout
            </button>
          </li>
        )}
        {!localStorage.getItem("Authorization") && (
          <li>
            <a href="/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
                Login
              </button>
            </a>
          </li>
        )}
        {/* You can add more nav items here */}
      </ul>
    </nav>
  );
}

export default Navbar;
