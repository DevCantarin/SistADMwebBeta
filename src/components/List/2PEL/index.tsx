import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
    ] as CardInt[],
  };

  const PEL = {
    title: "ADM",
    creatable: true, // Define se novos cartões podem ser criados nesta lista
    CGP1: 
        {encarregado : 
        {
          id: 1,
          content: `Cb PM 141019-9 CANTARIN`,
          grad: "Cb PM",
          equipe: "ADM",
          user: "https://drive.google.com/thumbnail?id=1-MCVstmM0wQIHly9nVz8_fddxHtdhx9v",
          sat: "B",
          vtr: "M-14122",
        } as CardInt,
        motorista : 
        {
          id: 1,
          content: `Cb PM 141019-9 CANTARIN`,
          grad: "Cb PM",
          equipe: "ADM",
          user: "https://drive.google.com/thumbnail?id=1-MCVstmM0wQIHly9nVz8_fddxHtdhx9v",
          sat: "B",
          vtr: "",
        } as CardInt,
        auxiliar1 : 
        {
          id: 1,
          content: `Cb PM 141019-9 CANTARIN`,
          grad: "Cb PM",
          equipe: "ADM",
          user: "https://drive.google.com/thumbnail?id=1-MCVstmM0wQIHly9nVz8_fddxHtdhx9v",
          sat: "B",
          vtr: "",
        } as CardInt,
        auxiliar2 : 
        {
          id: 1,
          content: `Cb PM 141019-9 CANTARIN`,
          grad: "Cb PM",
          equipe: "ADM",
          user: "https://drive.google.com/thumbnail?id=1-MCVstmM0wQIHly9nVz8_fddxHtdhx9v",
          sat: "B",
          vtr: "",
        } as CardInt,}
     
  };
  
  export function PEL2() {
    return (
      <TableContainer component={Paper} variant="outlined">
        <h2>2º PEL</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CGP 1</TableCell>
              <TableCell>EQUIPE 1</TableCell>
              <TableCell>EQUIPE 2</TableCell>
              <TableCell>EQUIPE 3</TableCell>
              <TableCell>EQUIPE 4</TableCell>
              <TableCell>EQUIPE 5</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            <TableRow>
                {/* CGP */}
                <TableCell> 
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>VIATURA</TableCell>
                                <TableCell>POLICIAL</TableCell>
                                <TableCell>FUNÇÃO</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{PEL.CGP1.encarregado.vtr}</TableCell>
                                <TableCell>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.motorista} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.auxiliar1} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.auxiliar2} index={0} listIndex={0}/>}</TableRow>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableCell>
                
                {/* EQUIPE1 */}
                <TableCell>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>VIATURA</TableCell>
                                <TableCell>POLICIAL</TableCell>
                                <TableCell>FUNÇÃO</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{PEL.CGP1.encarregado.vtr}</TableCell>
                                <TableCell>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableCell>

                      {/* EQUIPE2 */}
                <TableCell>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>VIATURA</TableCell>
                                <TableCell>POLICIAL</TableCell>
                                <TableCell>FUNÇÃO</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{PEL.CGP1.encarregado.vtr}</TableCell>
                                <TableCell>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableCell>

                               {/* EQUIPE3 */}
                <TableCell>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>VIATURA</TableCell>
                                <TableCell>POLICIAL</TableCell>
                                <TableCell>FUNÇÃO</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{PEL.CGP1.encarregado.vtr}</TableCell>
                                <TableCell>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableCell>

                               {/* EQUIPE4 */}
                <TableCell>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>VIATURA</TableCell>
                                <TableCell>POLICIAL</TableCell>
                                <TableCell>FUNÇÃO</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{PEL.CGP1.encarregado.vtr}</TableCell>
                                <TableCell>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableCell>

                               {/* EQUIPE5 */}
                <TableCell>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>VIATURA</TableCell>
                                <TableCell>POLICIAL</TableCell>
                                <TableCell>FUNÇÃO</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{PEL.CGP1.encarregado.vtr}</TableCell>
                                <TableCell>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                    <TableRow>{<Card data={PEL.CGP1.encarregado} index={0} listIndex={0}/>}</TableRow>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }