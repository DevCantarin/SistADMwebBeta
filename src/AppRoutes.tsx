import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PaginaBase from "./pages/PaginaBase";
import PaginaInicial from "./pages/PaginaInicial";
import PaginaBaseFormulario from "./pages/PaginaBaseFormulario";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import RotaPrivada from "./utils/RotaPrivada";
import RSO from "./pages/RSO";
import RSOEquipe from "./pages/RSO/Paginas/Equipe.txs";
import RSOViatura from "./pages/RSO/Paginas/Viatura";
import RSOInfomacoes from "./pages/RSO/Paginas/Iformacoes.txs";
import RSOPessoas from "./pages/RSO/Paginas/Pessoas";
import RSOVeiculos from "./pages/RSO/Paginas/Pessoas copy";
import RSOOcorrencias from "./pages/RSO/Paginas/Ocorrencias";
import EscalaDeServiço from "./pages/EscalaDeServico";


function AppRoutes() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<PaginaBase />}>
            <Route index element={<PaginaInicial />} />
            <Route element={<RotaPrivada />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rso" element={<RSO />} />
            <Route path="/rso/equipe" element={<RSOEquipe />} />
            <Route path="/rso/viatura" element={<RSOViatura />} />
            <Route path="/rso/informacoes" element={<RSOInfomacoes />} />
            <Route path="/rso/pessoas" element={<RSOPessoas />} />
            <Route path="/rso/veiculos" element={<RSOVeiculos />} />
            <Route path="/rso/ocorrencias" element={<RSOOcorrencias />} />
            <Route path="/escala" element={<EscalaDeServiço />} />
            </Route>
            </Route>
            <Route path="/" element={<PaginaBaseFormulario />}>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;