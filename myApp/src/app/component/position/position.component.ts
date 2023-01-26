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

    constructor(private router: Router,private toast:ToastrService,public permissionService: PermissionService, private formBuilder: FormBuilder, private positionService: PositionService) { 
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

        // this.permissionService.checkPermission(this.userPermission).subscribe(res=>{
        //     if(true){
                this.getAllPositions();
        //     }else{
        //         this.toast.error("You have no Permission for this action!");
        //     }
        // });
        
    }

    getAllPositions() {
        this.positionService.getAllPositions().subscribe(res => {
            this.positions = res.positions;
        });
    }

    // isDisable(){
    //     this.permissionService.checkPermission(this.userPermission).subscribe(res=>{
    //         if(true){
                
    //         }else{
    //             this.toast.error("You have no Permission for this action!");
    //         }
    //     })
    // }
    
    addPosition() {
        let position : addPosition = {
            name : this.Name.value,
        }
      
        this.positionService.addPosition(position).subscribe((res)=>{
            this.getAllPositions();
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
                }
            });
        }
        this.getAllPositions();
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
        alert('Sure to Delete?');
        this.collection.pop();
        this.positionService.deletePosition(pos).subscribe((result)=>{
            this.getAllPositions();
        });
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
