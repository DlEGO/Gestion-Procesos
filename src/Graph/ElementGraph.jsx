import "./GraphStyles.css";

function ElementGraph({ name, elements }) {
  // Define una función para obtener el color según el elemento
  const getColor = (element) => {
    switch (element) {
      case "A":
        return "#00913f"; // Verde
      case "B":
        return "#FF0000"; // Rojo
      case "*":
        return "#808080"; // Gris
      case "-":
        return "rgb(27, 26, 85)"; // Gris oscuro
      default:
        return null;
    }
  };

  const elementsDivs = elements.map((element, index) => (
    <div className="element-container" key={index}>
      <div
        style={{
          backgroundColor: getColor(element),
          width: "30px",
          height: "50px",
          borderTop: element !== "-" ? "2px solid black" : "none",
          borderBottom: element !== "-" ? "2px solid black" : "none",
          borderLeft:
            element !== "-" ? "1px solid black" : "1px solid #242424",
          borderRight:
            element !== "-" ? "1px solid black" : "1px solid #242424",
        }}
      />
    </div>
  ));

  return (
    <div style={{display:"flex"}}>
      <span className="element-name">{name}</span>
      <div className="bar">{elementsDivs}</div>
    </div>
  );
}

export default ElementGraph;
