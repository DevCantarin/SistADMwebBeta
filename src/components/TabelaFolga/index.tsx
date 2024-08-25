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
import { apiOwnKeys } from 'mobx/dist/internal';

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


function getAprovacaoColor(aprovacao: string) {
    if (aprovacao != null){
        if (aprovacao.toLowerCase() === 'sim') {
            return 'green';
        } else if (aprovacao.toLowerCase() === 'não' || aprovacao.toLowerCase() === 'nao') {
            return 'red';
        }
        return 'inherit'; // cor padrão
    }
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
                        <LinhaEstilizada key={index}>
                            <CelulaEstilizada>{linha.GRAD}</CelulaEstilizada>
                            <CelulaEstilizada>{linha.RE}</CelulaEstilizada>
                            <CelulaEstilizada>{linha.NOME}</CelulaEstilizada>
                            <CelulaEstilizada>{linha.DATA}</CelulaEstilizada>
                            <CelulaEstilizada>{linha.QUANTIDADE}</CelulaEstilizada>
                            <CelulaEstilizada>{linha.MOTIVO}</CelulaEstilizada>
                            <CelulaEstilizada style={{ color: getAprovacaoColor(linha.APROVA) }}>
                                {linha.APROVA}
                            </CelulaEstilizada>
                        </LinhaEstilizada>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TabelaFolga;
