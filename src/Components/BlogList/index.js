import { posts } from "../../Posts";
import { Link } from "react-router-dom";

export default function BlogList() {
  return (
    <div className="blog-posts-list">
      {posts &&
        Object.values(posts).map((post) => {
          const id = post.id;
          return (
            <div key={post.id} className="blog-post-card">
              <Link to={`/blog/${id}`} className="blog-post-title">
                <h3>{post.title}</h3>
              </Link>
              <p className="blog-post-description">{post.description}</p>
              <div className="blog-post-meta">
                <span>{post.date}</span>
                <Link to={`/blog/${id}`} className="read-more-link">
                  Read More
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
}
