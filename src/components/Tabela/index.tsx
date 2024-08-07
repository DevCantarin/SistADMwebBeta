import React from 'react';
import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Escala } from "../../interfaces/Escala";

const CelulaEstilizada = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        color: "var(--azul-escuro)",
        fontSize: 18,
        fontWeight: 700,
        fontFamily: "var(--fonte-principal)"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        fontFamily: "var(--fonte-principal)"
    }
}));

const LinhaEstilizada = styled(TableRow)(() => ({
    [`&:nth-of-type(odd)`]: {
        backgroundColor: "var(--cinza-claro)"
    }
}));

function isValidDate(date: any) {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
}

function formatDate(date: any) {
    return isValidDate(date) ? new Date(date).toLocaleDateString() : '';
}

function Tabela({ escala }: { escala: Escala[] | null }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="tabela-customizada">
                <TableHead>
                    <TableRow>
                        <CelulaEstilizada>Data</CelulaEstilizada>
                        <CelulaEstilizada>Horário</CelulaEstilizada>
                        <CelulaEstilizada>Policial</CelulaEstilizada>
                        <CelulaEstilizada>Função</CelulaEstilizada>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {escala?.flatMap((linha, index) => (
                        [
                            <LinhaEstilizada key={`${index}-1`}>
                                <CelulaEstilizada component="th" scope="row">
                                    {formatDate(linha.Data)}
                                </CelulaEstilizada>
                                <CelulaEstilizada>{linha.Inicio!==""?`de ${linha.Inicio} as ${linha.Termino}`:""}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.Nome}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.Funcao}</CelulaEstilizada>
                            </LinhaEstilizada>,
                            <LinhaEstilizada key={`${index}-2`}>
                                <CelulaEstilizada component="th" scope="row">
                                    {formatDate(linha.Data2)}
                                </CelulaEstilizada>
                                <CelulaEstilizada>{linha.Inicio2!==""?`de ${linha.Inicio2} as ${linha.Termino2}`:""}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.Nome2}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.Funcao2}</CelulaEstilizada>
                            </LinhaEstilizada>,
                            <LinhaEstilizada key={`${index}-3`}>
                                <CelulaEstilizada component="th" scope="row">
                                    {formatDate(linha.Data3)}
                                </CelulaEstilizada>
                                <CelulaEstilizada>{linha.Inicio3!==""?`de ${linha.Inicio3} as ${linha.Termino3}`:""}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.Nome3}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.Funcao3}</CelulaEstilizada>
                            </LinhaEstilizada>,
                            <LinhaEstilizada key={`${index}-4`}>
                                <CelulaEstilizada component="th" scope="row">
                                    {formatDate(linha.Data4)}
                                </CelulaEstilizada>
                                <CelulaEstilizada>{linha.Inicio4!==""?`de ${linha.Inicio3} as ${linha.Termino4}`:""}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.Nome4}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.Funcao4}</CelulaEstilizada>
                            </LinhaEstilizada>
                        ]
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tabela;
