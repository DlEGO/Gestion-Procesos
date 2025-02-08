import { useEffect, useContext, useState } from "react";
import ElementGraph from "./ElementGraph.jsx";
import { Context } from "../Contex.jsx";
import { algoritmo} from "../Algorithms/Algorithm";
import "./GraphStyles.css";

function Graph({ organizarCola,setDataProcesada }) {
  const { ProcessesToPlotted } = useContext(Context);
  const [processedData, setProcessedData] = useState([]);
  const[indexDivs, setIndexDivs] = useState([]);

  useEffect(() => {
    
    if (ProcessesToPlotted !== undefined && ProcessesToPlotted.length !== 0) {
      const result = algoritmo(ProcessesToPlotted, organizarCola);
      setProcessedData(result);
      setDataProcesada(result);
    }
  }, [ProcessesToPlotted, organizarCola]);

  useEffect(() => {
    if (processedData.length !== 0) {
      let maxIndex = 0;
      processedData.forEach((process) => {
        if (process.grafica && process.grafica.length > maxIndex) {
          maxIndex = process.grafica.length;
        }
      });
      let indexDivsArray = [];
      for (let i = 0; i < maxIndex; i++) indexDivsArray.push(i);
      setIndexDivs(indexDivsArray);
    }
  }, [processedData]);

  return (
    processedData.length !== 0 && (
      <>
        <div className="graph_container">
          {processedData
            .slice()
            .reverse()
            .map((processes, index) => (
              <ElementGraph
                key={index}
                name={processes.nombre}
                elements={processes.grafica}
              />
            ))}
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

export default Graph;
