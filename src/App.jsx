import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams, useNavigate, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import BlogPosts from './Blogs.js';
import Users from './Users.js';

function Login({ onLogin, checkLogin }) {
  const [creds, setCreds] = useState({});
  const navigate = useNavigate();

  function handleLogin() {
    const userLogin = checkLogin(creds.username, creds.password);
    if (userLogin) {
      onLogin && onLogin(userLogin);
      navigate('/stats');
    } else {
      alert('Invalid username or password');
    }
  }

  return (
    <div style={{ padding: 10 }}>
      <h2>Login</h2>
      <span>Username:</span><br />
      <input type="text" onChange={(e) => setCreds({ ...creds, username: e.target.value })} /><br />
      <span>Password:</span><br />
      <input type="password" onChange={(e) => setCreds({ ...creds, password: e.target.value })} /><br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

function ChangePassword({ user, changePassword }) {
  const [password, setPassword] = useState({ old: '', new: '', confirm: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setMessage('');

    if (password.new !== password.confirm) {
      setMessage('New passwords do not match!');
      return;
    }

    if (!password.new) {
      setMessage('New password cannot be empty.');
      return;
    }

    const result = changePassword(user.username, password.old, password.new);

    if (result.success) {
      setMessage(result.message + ' Redirecting to home...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Change Password for {user.username}</h2>
      <span>Old Password:</span><br />
      <input type="password" name="old" value={password.old} onChange={handleChange} /><br />
      <span>New Password:</span><br />
      <input type="password" name="new" value={password.new} onChange={handleChange} /><br />
      <span>Confirm New Password:</span><br />
      <input type="password" name="confirm" value={password.confirm} onChange={handleChange} /><br /><br />
      <button onClick={handleSubmit}>Change Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}

function AppLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(Users);

  function logout() {
    setUser(null);
    navigate('/');
  }

  function checkLogin(username, password) {
    const curUser = userData[username];
    if (curUser && curUser.password === password) {
      return { username: username };
    }
    return null;
  }

  function changePassword(username, oldPassword, newPassword) {
    const curUser = userData[username];
    if (!curUser) {
      return { success: false, message: 'User not found' };
    }
    if (curUser.password !== oldPassword) {
      return { success: false, message: 'Incorrect old password' };
    }

    const updatedData = {
      ...userData,
      [username]: {
        ...curUser,
        password: newPassword,
      },
    };
    setUserData(updatedData);
    return { success: true, message: 'Password changed successfully.' };
  }

  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>Home</Link>
        <Link to="/posts" style={{ padding: 5 }}>Posts</Link>
        <Link to="/about" style={{ padding: 5 }}>About</Link>
        <span> | </span>
        {user && <Link to="/stats" style={{ padding: 5 }}>Stats</Link>}
        {!user && <Link to="/login" style={{ padding: 5 }}>Login</Link>}
        {/* {user && <Link to="/change-password" style={{ padding: 5 }}>Change Password</Link>} */}
        {user && <span onClick={logout} style={{ padding: 5, cursor: 'pointer' }}>Logout</span>}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />}>
          <Route index element={<PostLists />} />
          <Route path=":slug" element={<Post />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={setUser} checkLogin={checkLogin} />} />
        <Route path="/stats" element={<Stats user={user} />} />
        {/* <Route path="/change-password" element={<ChangePassword user={user} changePassword={changePassword} />} /> */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Home View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function Posts() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Blog</h2>
      <Outlet />
    </div>
  );
}

function PostLists() {
  return (
    <ul>
      {Object.entries(BlogPosts).map(([slug, { title }]) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}><h3>{title}</h3></Link>
        </li>
      ))}
    </ul>
  );
}

function Post() {
  const { slug } = useParams();
  const post = BlogPosts[slug];
  if (!post) {
    return <span>The blog post you've requested doesn't exist.</span>;
  }
  const { title, description } = post;
  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Stats({ user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div style={{ padding: 20 }}>
      <h2>Stats View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

export default App;
