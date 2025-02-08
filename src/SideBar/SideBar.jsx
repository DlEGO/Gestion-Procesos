import { Link, useLocation } from "react-router-dom";
import "./sideBar.css";
import { optionsAlgorithms } from "./OptionsAlgorithmsSideBar";

function SideBar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Tipos de Gestión</h2>
      </div>
      <div className="sidebar-options">
        {optionsAlgorithms.map((option) => (
          <Link
            key={option.key}
            to={option.route}
            className={`sidebar-option ${location.pathname === option.route ? 'active' : ''}`}
          >
            {option.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar