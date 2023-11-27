import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutApi } from "../services/api-services";
import { useAuthContext } from "../contexts/auth-context";

const Navbar = () => {
  const { user, onLogout } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();

  function handleSearchSubmit(event) {
    event.preventDefault();
    navigate(`/search?term=${searchTerm}`);
    setIsSearchVisible(false);
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function toggleSearchVisibility() {
    setIsSearchVisible((prev) => !prev);
  }

  function logout() {
    logoutApi().then(() => {
      onLogout();
    });
  }

  return (
    <nav className="bg-black">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/logoetiqueta.png"
            alt="Logo de la página"
            className="w-28 ml-10 py-1"
          />
          <ul className="flex space-x-4">
            <li>
              <a
                href="/"
                className="text-white ml-10 hover:underline"
                style={{ fontSize: "13px" }}
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="/drop"
                className="text-white ml-3 hover:underline"
                style={{ fontSize: "13px" }}
              >
                DROP
              </a>
            </li>
            {user && user.role === "admin" && (
              <>
                <li>
                  <a
                    href="/products"
                    className="text-white ml-3 hover:underline"
                    style={{ fontSize: "13px" }}
                  >
                    CREAR PRODUCTO
                  </a>
                </li>
                <li>
                  <a
                    href="/orders"
                    className="text-white ml-3 hover:underline"
                    style={{ fontSize: "13px" }}
                  >
                    ORDENES
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          {isSearchVisible && (
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="border border-gray-400 rounded-md h-10 p-2"
              />
            </form>
          )}

          <span className="text-white" onClick={toggleSearchVisibility}>
            <i className="fas fa-search" style={{ fontSize: "22px" }}></i>
          </span>

          <span className="text-white">
            <Link
              to={`/wishlist/${user ? user._id : ""}`}
              className="flex items-center"
            >
              <i className="fas fa-heart" style={{ fontSize: "22px" }}></i>
            </Link>
          </span>

          <span className="text-white">
            <Link
              to={`/carts/${user ? user._id : ""}`}
              className="flex items-center"
            >
              <i
                className="fas fa-shopping-bag"
                style={{ fontSize: "22px" }}
              ></i>
            </Link>
          </span>

          {user && (
            <span className="text-white">
              <Link to="/profile" className="flex items-center">
                <i className="fas fa-user" style={{ fontSize: "22px" }}></i>
              </Link>
            </span>
          )}

          {user ? (
            <span className="text-white">
              <Link to="/logout" onClick={logout} className="flex items-center">
                <i
                  className="fas fa-power-off mr-10"
                  style={{ fontSize: "22px" }}
                ></i>
              </Link>
            </span>
          ) : (
            <span className="text-white">
              <Link to="/login" className="flex items-center">
                <i
                  className="fas fa-user mr-10"
                  style={{ fontSize: "22px" }}
                ></i>
              </Link>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
