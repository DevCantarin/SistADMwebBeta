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
                                    {linha.DATA}
                                </CelulaEstilizada>
                                <CelulaEstilizada>{linha.INICIO?`de ${linha.INICIO} as ${linha.TERMINO}`:""}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.NOME}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.FUNÇÃO}</CelulaEstilizada>
                            </LinhaEstilizada>,
                            <LinhaEstilizada key={`${index}-2`}>
                                <CelulaEstilizada component="th" scope="row">
                                    {linha.DATA2}
                                </CelulaEstilizada>
                                <CelulaEstilizada>{linha.INICIO2?`de ${linha.INICIO2} as ${linha.TERMINO2}`:""}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.NOME2}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.FUNÇÃO2}</CelulaEstilizada>
                            </LinhaEstilizada>,
                            <LinhaEstilizada key={`${index}-3`}>
                                <CelulaEstilizada component="th" scope="row">
                                    {linha.DATA3}
                                </CelulaEstilizada>
                                <CelulaEstilizada>{linha.INICIO3?`de ${linha.INICIO3} as ${linha.TERMINO3}`:""}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.NOME3}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.FUNÇÃO3}</CelulaEstilizada>
                            </LinhaEstilizada>,
                            <LinhaEstilizada key={`${index}-4`}>
                                <CelulaEstilizada component="th" scope="row">
                                    {linha.DATA4}
                                </CelulaEstilizada>
                                <CelulaEstilizada>{linha.INICIO4?`de ${linha.INICIO3} as ${linha.TERMINO4}`:""}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.NOME4}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.FUNÇÃO4}</CelulaEstilizada>
                            </LinhaEstilizada>
                        ]
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tabela;
