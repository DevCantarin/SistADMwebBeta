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
import { Abordado, RSO, Veiculo } from '../../interfaces/RSO';

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

function TabelaVeiculos({ veiculo }: { veiculo: Veiculo[] | null }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="tabela-customizada">
                <TableHead>
                    <TableRow>
                        <CelulaEstilizada>Marca/Modelo</CelulaEstilizada>
                        <CelulaEstilizada>Cor</CelulaEstilizada>
                        <CelulaEstilizada>Placa</CelulaEstilizada>
                        <CelulaEstilizada>Numeração AIT</CelulaEstilizada>
                        <CelulaEstilizada>Numeração CRR</CelulaEstilizada>
                        <CelulaEstilizada>Observação</CelulaEstilizada>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {veiculo?.flatMap((linha, index) => (
                        [
                            <LinhaEstilizada key={`${index}-1`}>
                                <CelulaEstilizada component="th" scope="row">
                                    {linha.marcaModelo}
                                </CelulaEstilizada>
                                <CelulaEstilizada>{linha.cor}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.placa}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.numeracaoAIT}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.numeracaoCRR}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.observacao}</CelulaEstilizada>
                            </LinhaEstilizada>
                        ]
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TabelaVeiculos;
