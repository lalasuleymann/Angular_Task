import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Position } from "../../model/position/position";

@Injectable({
    providedIn : 'root'
})
export class PositionService{

    baseApiUrl: string = 'https://localhost:44305/api/v1/';

    constructor(private http: HttpClient) {}

    addPosition(pos : Position) : Observable<Position>{
        return this.http.post<Position>(this.baseApiUrl + 'position', pos)
    }

    getAllPosition() : Observable<Position[]>{
        return this.http.get<Position[]>(this.baseApiUrl + 'position');
    }

    updatePosition(pos : Position) : Observable<Position>{
        return this.http.put<Position>(this.baseApiUrl + 'position/{positionId}', pos);
    }

    deletePosition(pos: Position) : Observable<Position>{
        return this.http.delete<Position>(this.baseApiUrl + 'position/{positionId}' + "/" + pos.id);
    }
}