import { Component, EventEmitter, OnInit } from "@angular/core"; 
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { PositionService } from "src/app/service/position/position.service";
import { Position } from "src/app/model/position/position";
import { PermissionService } from "src/app/service/permission/permission.service";
import { Permission } from "src/app/model/permission/permission";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { UserPermission } from "src/app/model/userPermission/userpermission";
import { addPosition } from "src/app/model/position/addPosition";
import { ConfigService } from "src/app/initializer/config.service";
import { NgConfirmService } from "ng-confirm-box";
import { HttpStatusCode } from "@angular/common/http";
@Component({ 
    templateUrl : './position.component.html',
    styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit{

    positionForm : FormGroup;
    position : Position;
    positions : Position[] = [];
    currentPositionId: number;
    userPermission: UserPermission

    constructor(private confirmService: NgConfirmService,private config: ConfigService,private router: Router, 
        private toastr:ToastrService,public permissionService: PermissionService, 
        private formBuilder: FormBuilder, private positionService: PositionService) { 
        this.position ={
            name : '',
            createdDate : Date= null,
            modifiedDate : Date= null,
        };
        this.positionForm = formBuilder.group({});
    }

    ngOnInit(): void {
        this.positionForm = this.formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            createdDate : [''],
            modifiedDate : [''],
        });
        this.getAllPositions();
        
    }

    hasPositionCreatePermission(){
        this.config.settings?.permissions?.grantedPermissions.includes("Position.Create");
    }

    hasPositionUpdatePermission(){
        this.config.settings?.permissions?.grantedPermissions.includes("Position.Update");
    }
    
    hasPositionDeletePermission(){
        this.config.settings?.permissions?.grantedPermissions.includes("Position.Delete");
    }

    getAllPositions() {
        this.positionService.getAllPositions().subscribe(res => {
            this.positions = res.positions;
        });
    }
    
    addPosition() {
        let position : addPosition = {
            name : this.Name.value,
        }

        this.positionService.addPosition(position).subscribe((res)=>{
            this.getAllPositions();
            this.toastr.success("Position Added!");
        }); 
        this.positionForm.reset();
    }

    updatePosition() {
        if(this.positionForm.valid){
            this.positionService.updatePosition(this.currentPositionId, this.positionForm.value)
            .subscribe({
                next:(res)=>{
                    this.positionForm.reset();
                    this.getAllPositions();
                    this.toastr.success("Position Updated!");
                }
            });
        }
    }

    editPosition(posId: number) {
        this.currentPositionId = posId;
        let currentPosition = this.positions.find((d)=>{return d.id === posId});
        this.positionForm.setValue({
            id: currentPosition.id,
            name: currentPosition.name,
            createdDate: currentPosition.createdDate,
            modifiedDate: currentPosition.modifiedDate
        })
    }

    public collection : any = [];
    deletePosition(pos: number) {
        this.confirmService.showConfirm("Sure to Delete?",
        ()=>{
            this.collection.pop();
            this.positionService.deletePosition(pos).subscribe((result)=>{
                this.getAllPositions();
                    this.toastr.success("Position Deleted!");
            });
        },
        ()=>[
            this.toastr.error("Position is not Deleted!")
        ]);
    }
    
    get Name(): FormControl{
        return this.positionForm.get('name') as FormControl;
    }
    get CreatedDate(): FormControl{
        return this.positionForm.get('createdDate') as FormControl;
    }
    get ModifiedDate(): FormControl{
        return this.positionForm.get('modifiedDate') as FormControl;
    }
}
