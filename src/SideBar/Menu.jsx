import { OptionSideBarNonSubMenu } from "./OptionSideBar";
import "./sideBar.css";

// Devuelve arreglo de componentes tipo OptionSideBar
function Menu({options, closeForm, restart }) {
  const optionItems = options.map((option) => (
    <OptionSideBarNonSubMenu option={option} closeForm={closeForm} restart={restart}/>
  ));

  return [optionItems];
}

export default Menu;
