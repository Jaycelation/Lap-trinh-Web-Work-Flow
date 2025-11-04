import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>Welcome to My Blog</h2>
      <p>This blog is about sharing how to play CTF</p>
      <p>
        Check out my blogs <Link to="/blog">HERE</Link>!
      </p>
    </div>
  );
}
