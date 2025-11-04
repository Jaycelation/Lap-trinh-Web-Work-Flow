import { Outlet } from "react-router-dom";

export default function Blog() {
  return (
    <div className="blog-container">
      <h2 className="blog-header">Blog Posts</h2>
      <Outlet />
      <p className="blog-footer-text">Check out my posts!</p>
    </div>
  );
}
