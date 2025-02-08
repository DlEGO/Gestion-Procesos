import { useEffect, useState } from "react";
import "./App.css";
import SideBar from "./SideBar/SideBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e94560',
    },
    secondary: {
      main: '#ff2e63',
    },
    background: {
      default: '#1a1a2e',
    },
  },
});

function App() {
  const [procesos, setProcesos] = useState([]);
  const [dataProcesada, setDataProcesada] = useState([]);

  const agregarProceso = (nuevoProceso) => {
    setProcesos([...procesos, nuevoProceso]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <div className="sidebar-container">
              <SideBar />
            </div>
            <div className="main-container">
              <div className="left-panel">
                <ProcessForm agregarProceso={agregarProceso} />
                <ProcessStats
                  dataProccesada={dataProcesada}
                  dataInicial={procesos}
                />
              </div>
              <div className="right-panel">
                <div className="process-controls">
                  <ProcessBar procesos={procesos} />
                  <GlobalStas
                    dataProccesada={dataProcesada}
                    dataInicial={procesos}
                  />
                </div>
                <div className="graph-container">
                  <Routes>
                    <Route path="/" />
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
            </div>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;