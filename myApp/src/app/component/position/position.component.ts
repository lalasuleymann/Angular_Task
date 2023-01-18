import { Component, EventEmitter, OnInit } from "@angular/core"; 
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { PositionService } from "src/app/service/position/position.service";
import { Position } from "src/app/model/position/position";
@Component({ 
    templateUrl : './position.component.html',
    styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit{

    positionForm : FormGroup;
    position : Position;
    positions : Position[] = [];
    currentPositionId: number;

    constructor(private formBuilder: FormBuilder, private positionService: PositionService) { 
        this.position ={
            name : ''
        };
        this.positionForm = formBuilder.group({});
    }

    ngOnInit(): void {
        this.positionForm = this.formBuilder.group({
            id: [''],
            name: [''],
        });

        this.getAllPositions();
    }

    getAllPositions() {
        this.positionService.getAllPositions().subscribe(res => {
            this.positions = res.positions;
        });
    }

    addPosition() {
        let position : Position = {
            name : this.Name.value
        }

        this.positionService.addPosition(position).subscribe((res)=>{
            this.getAllPositions();
        });
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
    }

    editPosition(posId: number) {
        this.currentPositionId = posId;
        let currentPosition = this.positions.find((d)=>{return d.id === posId});
        this.positionForm.setValue({
            id: currentPosition.id,
            name: currentPosition.name
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
}
