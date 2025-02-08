import { useEffect, useContext, useState } from "react";
import ElementGraph from "./ElementGraph.jsx";
import { Context } from "../Contex.jsx";
import { RR } from "../Algorithms/RR.js";
import "./GraphStyles.css";

function GraphRR({ setDataProcesada }) {
  const { ProcessesToPlotted } = useContext(Context);
  const [processedData, setProcessedData] = useState([]);
  const [quantunData, setQuantumData] = useState([]);
  const [indexDivs, setIndexDivs] = useState([]);
  const { Quantum } = useContext(Context);

  useEffect(() => {
    if (ProcessesToPlotted !== undefined && ProcessesToPlotted.length !== 0) {
      let q = Number(Quantum);
      const result = RR(ProcessesToPlotted,q);
      console.log("quatum",result[0])
      setQuantumData(result[0]);
      setProcessedData(result[1]);
      setDataProcesada(result);
    }
  }, [ProcessesToPlotted, Quantum]);

  useEffect(() => {
    if (processedData.length !== 0) {
      let maxIndex = 0;
      processedData.forEach((process) => {
        if (process.grafica && process.grafica.length > maxIndex) {
          maxIndex = process.grafica.length;
        }
      });
      let indexDivsArray = [];
      for (let i = 0; i <= maxIndex; i++) indexDivsArray.push(i);
      setIndexDivs(indexDivsArray);
    }
  }, [processedData]);

  const getColorRR = (element) => {
    switch (element) {
      case "Q":
        return "#ADD8E6"; // Gris
      case "-":
        return "rgb(27, 26, 85)"; // Gris oscuro
      default:
        return null;
    }
  };

  return (
    processedData.length !== 0 && (
      <>
        <div className="graph_container">
          {processedData
            .slice()
            .reverse()
            .map((processes, index) => (
              <ElementGraph key={index} name={processes.nombre} elements={processes.grafica} />
            ))}
          <div className="q_container" style={{ display: "flex" }}>
          <div style={{width:"100px"}}></div>
            {quantunData.map((q, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: getColorRR(q),
                  width: "30px",
                  height: "50px",
                  borderTop: q !== "-" ? "2px solid black" : "none",
                  borderBottom: q !== "-" ? "2px solid black" : "none",
                  borderLeft:
                    q !== "-" ? "0.5px solid black" : "1px solid transparent",
                  borderRight:
                    q !== "-" ? "0.5px solid black" : "1px solid transparent",
                }}
              ></div>
            ))}
          </div>
          <div className="indexes">
          <div style={{width:"50px"}}></div>
            {indexDivs.map((index) => (
              <div key={index} className="index">
                {index}
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
}

export default GraphRR;
