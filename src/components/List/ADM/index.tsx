import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Card from "../../Card";
import { CardInt } from "../../../interfaces/Card";

const card = {
    title: "ADM",
    creatable: true, // Define se novos cartões podem ser criados nesta lista
    cards: [
      {
        id: 1,
        content: `Cb PM 141019-9 CANTARIN`,
        grad: "Cb PM",
        equipe: "ADM",
        user: "https://drive.google.com/thumbnail?id=1-MCVstmM0wQIHly9nVz8_fddxHtdhx9v",
        sat: "B",
        vtr: "",
      },
      {
        id: 2,
        content: `Cb PM 123456-8 TESTER`,
        grad: "Cb PM",
        equipe: "ADM",
        user: "https://drive.google.com/thumbnail?id=1-MCVstmM0wQIHly9nVz8_fddxHtdhx9v",
        sat: "B",
        vtr: "",
      },
    ] as CardInt[],
  };
  
  export function ADM() {
    return (
      <TableContainer>
        <h2>ADM</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CMT CIA</TableCell>
              <TableCell>ENCARREGADO ADM</TableCell>
              <TableCell>P1</TableCell>
              <TableCell>P3</TableCell>
              <TableCell>P4</TableCell>
              <TableCell>P5</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {/* Renderiza o conteúdo do cartão */}
              <TableCell>
                {card.cards.map((c) => (
                  <Card key={c.id} data={c} index={c.id} listIndex={0}/>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }