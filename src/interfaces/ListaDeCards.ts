import { CardInt } from "./Card";


export interface ListaDeCards{
    title: string;
    creatable: boolean;
    done?: boolean;
    cards: CardInt[];

}
