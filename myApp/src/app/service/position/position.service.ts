import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Position } from "../../model/position/position";

@Injectable({
    providedIn : 'root'
})
export class PositionService{

    baseApiUrl: string = 'https://localhost:44305';

    constructor(private http: HttpClient) {}

    addPosition(pos : Position) : Observable<Position>{
        return this.http.post<Position>(this.baseApiUrl + '/api/v1/position', pos)
    }

    getAllPosition() : Observable<Position[]>{
        return this.http.get<Position[]>(this.baseApiUrl + '/api/v1/position');
    }

    updatePosition(pos : Position) : Observable<Position>{
        return this.http.put<Position>(this.baseApiUrl + '/api/v1/position/{positionId}', pos);
    }

    deletePosition(pos: Position) : Observable<Position>{
        return this.http.delete<Position>(this.baseApiUrl + '/api/v1/position/{positionId}' + "/" + pos.id);
    }
}