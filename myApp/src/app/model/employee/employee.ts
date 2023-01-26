import { Department } from "../department/department";
import { Position } from "../position/position";

export class Employee{
    id? : number = 0;
    name : string = '';
    surname : string = '';
    birthDate: Date ;
    employeeParentId: number;
    employeeParentName: string;
    createdDate: Date;
    modifiedDate: Date;
    positionId : number;
    positionName: string;
    departmentId: number;
    departmentName: string;
}