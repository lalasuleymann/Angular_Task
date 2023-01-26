import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Position } from "../../model/position/position";
import { MyMainService } from "../my-main.component";
import { addPosition } from "src/app/model/position/addPosition";

@Injectable({
    providedIn : 'root'
})
export class PositionService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/position/';

    constructor(private main: MyMainService ,private http: HttpClient) {}

    addPosition(position : addPosition) : Observable<positionResponse>{
        return this.http.post<positionResponse>(`${this.baseApiUrl}`, position, {headers: new HttpHeaders(this.main.headerDict)})
    }

    getAllPositions() : Observable<positionResponses>{
        return this.http.get<positionResponses>(`${this.baseApiUrl}`, {headers: new HttpHeaders(this.main.headerDict)});
    }

    updatePosition(pos: number, position : Position) : Observable<Position>{
        return this.http.put<Position>(`${this.baseApiUrl}${pos}`, position, {headers: new HttpHeaders(this.main.headerDict)});
    }

    deletePosition(pos: number) : Observable<Position>{
        return this.http.delete<Position>(`${this.baseApiUrl}${pos}`, {headers: new HttpHeaders(this.main.headerDict)});
    }
}

export class positionResponses{
    positions : Position[];
}

export class positionResponse{
    positions : addPosition;
}