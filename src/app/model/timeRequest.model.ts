import { TimeTable } from "./timeTable.model";

export class TimeRequest {
    idPerson: number;
    timeTable: TimeTable[];
    constructor(idPerson: number, timeTable: TimeTable[]) {
        this.idPerson = idPerson;
        this.timeTable = timeTable;
    }
}