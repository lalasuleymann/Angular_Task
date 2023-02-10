import { CustomDatePipe } from "src/app/service/custom.datepipe";
import { Department } from "../department/department";
import { Position } from "../position/position";

export class Employee{
    id? : number = 0;
    name : string = '';
    surname : string = '';
    birthDate: Date | CustomDatePipe;
    employeeParentId: number;
    employeeParentName: string;
    createdDate: Date | CustomDatePipe;
    modifiedDate?: Date | CustomDatePipe;
    positionId : number;
    positionName: string;
    departmentIds: number[];
    departmentName: string;
}