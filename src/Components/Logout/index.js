import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("isAdmin");
    navigate("/");
  }
  return (
    <div className="dashboard-container">
      <h2>Logout</h2>
      <button type="button" onClick={handleLogout}>
        Click here to logout
      </button>
    </div>
  );
}
