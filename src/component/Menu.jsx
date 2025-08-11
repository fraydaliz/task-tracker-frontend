// Menu.jsx
import { useNavigate } from "react-router-dom";

export const Menu = ({ auth }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    auth(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">Employee System</span>
        <div className="d-flex">
          <button className="btn btn-outline-danger" onClick={logoutHandler}>
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};
