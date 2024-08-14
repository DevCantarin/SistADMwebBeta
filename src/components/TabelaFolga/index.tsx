import React from 'react';
import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Folga } from '../../interfaces/Folga';

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

function formatDate(date: any) {
    return isValidDate(date) ? new Date(date).toLocaleDateString() : '';
}

function isValidDate(date: any) {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
}


function TabelaFolga({ folga }: { folga: Folga[] | null }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="tabela-customizada">
                <TableHead>
                    <TableRow>
                        <CelulaEstilizada>Grad</CelulaEstilizada>
                        <CelulaEstilizada>RE</CelulaEstilizada>
                        <CelulaEstilizada>Policial</CelulaEstilizada>
                        <CelulaEstilizada>Data</CelulaEstilizada>
                        <CelulaEstilizada>Quantidade</CelulaEstilizada>
                        <CelulaEstilizada>Motivo</CelulaEstilizada>
                        <CelulaEstilizada>Aprovação</CelulaEstilizada>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {folga?.flatMap((linha, index) => (
                        [
                            <LinhaEstilizada key={`${index}-1`}>
                                <CelulaEstilizada>{linha.GRAD}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.RE}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.NOME}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.DATA}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.QUANTIDADE}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.MOTIVO}</CelulaEstilizada>
                                <CelulaEstilizada>{linha.APROVA}</CelulaEstilizada>
                            </LinhaEstilizada>
                        ]
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TabelaFolga;
