import { useEffect, useState } from "react";
import "./App.css";
import SideBar from "./SideBar/SideBar";
import NavBar from "./NavBar/NavBar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Graph from "./Graph/Graph";
import ProcessForm from "./forms/processForm/ProcessForm";
import ProcessBar from "./ProcessBar/ProcessBar";
import ProcessStats from "./ProcessBar/ProcessStats";
import GlobalStas from "./ProcessBar/GlobalStas";
import {
  organizarColaPorDuracion,
  organizarColaPorProcesos,
  organizarColaPorDuracionRestante,
} from "./Algorithms/Election";
import GraphRR from "./Graph/GraphRR";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [procesos, setProcesos] = useState([]);
  const [dataProcesada, setDataProcesada] = useState([]);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const agregarProceso = (nuevoProceso) => {
    setProcesos([...procesos, nuevoProceso]);
  };

  useEffect(() => {
    console.log(dataProcesada);
  }, [dataProcesada]);

  return (
    <BrowserRouter>
      <div>
        <NavBar toggleSideBar={toggleSideBar} />
        <SideBar
          isSideBarOpen={isSideBarOpen}
          closeForm={null}
          restart={null}
        />
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "10px",
              width: "100%",
            }}
          >
            <ProcessForm agregarProceso={agregarProceso} />
            <ProcessBar procesos={procesos} />
          </div>
          <ProcessStats dataProccesada={dataProcesada} dataInicial={procesos} />
          <GlobalStas dataProccesada={dataProcesada} dataInicial={procesos} />
          <Routes>
            <Route path="/" element={<Navigate to="/FCFS" />} />
            <Route
              path="/FCFS"
              element={
                <Graph
                  organizarCola={organizarColaPorProcesos}
                  setDataProcesada={setDataProcesada}
                />
              }
            />
            <Route
              path="/SJF"
              element={
                <Graph
                  organizarCola={organizarColaPorDuracion}
                  setDataProcesada={setDataProcesada}
                />
              }
            />
            <Route
              path="/SRTF"
              element={
                <Graph
                  organizarCola={organizarColaPorDuracionRestante}
                  setDataProcesada={setDataProcesada}
                />
              }
            />
            <Route
              path="/RR"
              element={<GraphRR setDataProcesada={setDataProcesada} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
