import { Component, OnInit } from "@angular/core"; 
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Position } from "src/app/model/position/position";
import { PositionService } from "src/app/service/position/position.service";
@Component({ 
    templateUrl : './position.component.html',
    styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit{

    posDetail !: FormGroup;
    posObj : Position = new Position();
    posList : Position[] = [];

    constructor(private formBuilder: FormBuilder, private posService: PositionService) { }

    ngOnInit(): void {
        
        this.getAllPosition();

        this.posDetail = this.formBuilder.group({
            id: [''],
            name : [''],
        });
    }

    addPosition() {
        console.log(this.posDetail);
        this.posObj.id = this.posDetail.value.id;
        this.posObj.name = this.posDetail.value.name;

        this.posService.addPosition(this.posObj).subscribe(res=>{
            console.log(res);
            this.getAllPosition();
        }, err=>{
            console.log(err);
        });
    }

    getAllPosition() {
        this.posService.getAllPosition().subscribe(res=>{
            this.posList = res;
        }, err =>{
            console.log("Error occured while fetching data!");
        });
    }

    editPosition(dep : Position) {
        this.posDetail.controls['id'].setValue(dep.id);
        this.posDetail.controls['name'].setValue(dep.name);
    }

    updatePosition() {
        this.posObj.id = this.posDetail.value.id;
        this.posObj.name = this.posDetail.value.name;

        this.posService.updatePosition(this.posObj).subscribe(res=>{
            console.log(res);
            this.getAllPosition();
        }, err=>{
            console.log(err);
        });
    }

    deletePosition(dep : Position) {
        this.posService.deletePosition(dep).subscribe(res=>{
            console.log(res)
            alert("Position Deleted Succesfully!");
            this.getAllPosition();
        }, err=>{
            console.log(err);
        });
    }
}
