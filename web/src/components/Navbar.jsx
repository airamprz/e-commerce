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
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img
            src="/logoetiqueta.png"
            alt="Logo de la página"
            className="w-20"
          />
          <ul className="hidden md:flex space-x-4 ml-12">
            <li>
              <Link
                to="/"
                className="text-white hover:underline mr-4"
                style={{ fontSize: "13px" }}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/drop"
                className="text-white hover:underline"
                style={{ fontSize: "13px" }}
              >
                DROP
              </Link>
            </li>
            {user && user.role === "admin" && (
              <>
                <li>
                  <Link
                    to="/products"
                    className="text-white hover:underline"
                    style={{ fontSize: "13px" }}
                  >
                    CREAR PRODUCTO
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="text-white hover:underline"
                    style={{ fontSize: "13px" }}
                  >
                    ORDENES
                  </Link>
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
            <Link to={`/wishlist/${user ? user._id : ""}`}>
              <i className="fas fa-heart" style={{ fontSize: "22px" }}></i>
            </Link>
          </span>

          <span className="text-white">
            <Link to={`/carts/${user ? user._id : ""}`}>
              <i
                className="fas fa-shopping-bag"
                style={{ fontSize: "22px" }}
              ></i>
            </Link>
          </span>

          {user && (
            <span className="text-white">
              <Link to="/profile">
                <i className="fas fa-user" style={{ fontSize: "22px" }}></i>
              </Link>
            </span>
          )}

          {user ? (
            <span className="text-white">
              <Link to="/logout" onClick={logout}>
                <i
                  className="fas fa-power-off"
                  style={{ fontSize: "22px" }}
                ></i>
              </Link>
            </span>
          ) : (
            <span className="text-white">
              <Link to="/login">
                <i
                  className="fas fa-user"
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
