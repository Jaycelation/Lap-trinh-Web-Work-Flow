import { Link, useParams } from "react-router-dom";
import { posts } from "../../Posts";

export default function BlogPost() {
  const { id } = useParams();
  const post = posts[id];

  if (!post) {
    return (
      <div>
        <h2> Post not found. Check again!</h2>
        <Link to="/blog">Back to Blog</Link>
      </div>
    );
  }

  const { title, date, content } = post;

  return (
    <div>
      <Link to="/blog">Back to Blog</Link>
      <h3>{title}</h3>
      <p style={{ color: "gray", fontStyle: "italic" }}>Posted on {date}</p>
      <p>{content}</p>
    </div>
  );
}
