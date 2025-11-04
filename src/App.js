import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppLayout from "./Components/AppLayout";
import Home from "./Components/Home";
import About from "./Components/About";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import NoMatch from "./Components/NoMatch";
import Flag from "./Components/Flag";
import Blog from "./Components/Blog";
import BlogList from "./Components/BlogList";
import BlogPost from "./Components/BlogPost";
import DashBoard from "./Components/DashBoard";
import Statistics from "./Components/Statistics";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route cha chứa layout chung (header/nav) */}
        <Route path="/" element={<AppLayout />}>
          {/* Các trang con sẽ được render bên trong <Outlet> */}
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />}>
            <Route index element={<BlogList />} />
            <Route path=":id" element={<BlogPost />} />
          </Route>
          {/* Login/Logout Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* Admin DashBoard */}
          <Route path="/dashboard/" element={<DashBoard />} />
          <Route path="/statistics/" element={<Statistics />} />
          {/* Flag Route */}
          <Route path="/flag" element={<Flag />}></Route>
          {/* Route bắt lỗi 404 */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  );
}
