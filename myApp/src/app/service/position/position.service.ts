import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Position } from "../../model/position/position";

@Injectable({
    providedIn : 'root'
})
export class PositionService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/position/';

    constructor(private http: HttpClient) {}

    addPosition(position : Position) : Observable<positionResponse>{
        return this.http.post<positionResponse>(`${this.baseApiUrl}`, position)
    }

    getAllPositions() : Observable<positionResponses>{
        return this.http.get<positionResponses>(`${this.baseApiUrl}`);
    }

    updatePosition(pos: number, position : Position) : Observable<Position>{
        return this.http.put<Position>(`${this.baseApiUrl}${pos}`, position);
    }

    deletePosition(pos: number) : Observable<Position>{
        return this.http.delete<Position>(`${this.baseApiUrl}${pos}`);
    }
    
}
export class positionResponses{
    positions : Position[];
}

export class positionResponse{
    positions : Position;
}