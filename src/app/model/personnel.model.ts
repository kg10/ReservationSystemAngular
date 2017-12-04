import { TimeTable } from "./timeTable.model";

export interface Personnel {
    id: number;
    firstName: string;
    lastName: string;
    descriptionPerson: string;
    active: boolean;
    timeTable : TimeTable[]; 
}