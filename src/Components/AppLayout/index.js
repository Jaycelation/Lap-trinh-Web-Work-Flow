import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AppLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isAdmin") !== null
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isAdmin") !== null);
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, [location]);

  return (
    <>
      <header>
        <div>
          <h1>Dang Duc Tai's Blog</h1>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Blog
                </NavLink>
              </li>

              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <>
                      <li>
                        <NavLink
                          to="/dashboard"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/statistics"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Statistics
                        </NavLink>
                      </li>
                    </>
                  )}
                  <li>
                    <NavLink
                      to="/change-password"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Change Password
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/logout"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
