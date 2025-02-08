import { Link } from "react-router-dom";

// Funcion para exportar una opcion de la barra cuando no tiene submenus
export const OptionSideBarNonSubMenu = ({ option, closeForm, restart }) => {
  return (
    <Link
      to={option.route}
      className="sidebar-option"
      onClick={() => {
        closeForm();
        restart(); // Reemplaza "otraFuncion" con el nombre de tu otra función
      }}
    >
      {option.name}
    </Link>
  );
};

// Funcion para exportar una opcion de la barra cuando tiene submenus
export const OptionSideBarSubMenu = ({ option, toggleMenu }) => {
  return (
    <p
      key={option.key}
      className="sidebar-option"
      onClick={() => toggleMenu(option)}
    >
      {option.name}
    </p>
  );
};

