import React, { useState } from "react";
import "./sideBar.css";
import Menu from "./Menu.jsx";
import { optionsAlgorithms } from "./OptionsAlgorithmsSideBar.jsx";
import {
  OptionSideBarSubMenu,
  OptionSideBarNonSubMenu,
} from "./OptionSideBar.jsx";

function SideBar({ isSideBarOpen, closeForm, restart }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleMenu = (option) => {
    if (selectedOption === option.key) {
      // Si el mismo elemento está seleccionado, cierra el submenu
      setSelectedOption(null);
    } else {
      // Si se selecciona un nuevo elemento, abre su submenu
      setSelectedOption(option.key);
    }
  };

  return (
    <>
      <div className={`sidebar_${isSideBarOpen ? "Open" : "Close"}`}>
        {isSideBarOpen && (
          <div className="sidebar-content">
            {optionsAlgorithms.map((option) => (
              <div key={option.key} className="row">
                {option.hasMenu ? (
                  <OptionSideBarSubMenu
                    option={option}
                    toggleMenu={toggleMenu}
                  />
                ) : (
                  <OptionSideBarNonSubMenu
                    option={option}
                    closeForm={closeForm}
                    restart={restart}
                  />
                )}
                <div className="menuContent">
                  {option.hasMenu && selectedOption === option.key && (
                    <Menu
                      options={option.subOptions}
                      closeForm={closeForm}
                      restart={restart}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SideBar;
