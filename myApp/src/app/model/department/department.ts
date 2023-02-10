import { CustomDatePipe } from "src/app/service/custom.datepipe";

export class Department{
    id? : number = 0;
    name : string = '';
    createdDate: Date | CustomDatePipe;
    modifiedDate: Date | CustomDatePipe;
}