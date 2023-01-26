import { Permission } from "../permission/permission";
import { User } from "../user/user";

export class UserPermission{
    id: number;
    userId: number;
    userSurname:string;
    userName:string;
    userEmail:string;
    permissionName: string;
    permissionId: number;
}