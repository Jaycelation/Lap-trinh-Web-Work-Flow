import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { posts } from "../../Posts";
export default function Statistics() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/login");
    }
  });

  return (
    <div className="dashboard-container">
      <h2>Statistic Page</h2>
      <p>There are {Object.values(posts).length} posts in Tai's blog</p>
      <Link to="/blog">Go to see blog list</Link>
      <Outlet />
    </div>
  );
}
