import { Department } from "../department/department";
import { Position } from "../position/position";

export class Employee{
    id? : number = 0;
    name : string = '';
    surname : string = '';
    birthdate: Date = null;
    createdDate: Date;
    modifiedDate: Date;
    positionId : Position[] = [{id : 0 ,name : ''}];
    departmentIds: Department[] = [{ id : 0 , name :''}];
}