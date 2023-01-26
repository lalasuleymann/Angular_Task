import { Component, OnInit } from "@angular/core";
import { Employee } from "src/app/model/employee/employee";
import { DependentService } from "src/app/service/manage/dependent/dependent.service";

@Component({ 
    templateUrl : './dependent.component.html',
    styleUrls: ['./dependent.component.css']
})

export class DependentComponent implements OnInit{

    employees : Employee[] = [];
    currentEmployeeId: number;
    constructor(private dependentService: DependentService){}
    ngOnInit(): void {
    }

}