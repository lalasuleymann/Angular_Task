import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Position } from "../../model/position/position";

@Injectable({
    providedIn : 'root'
})
export class PositionService{

    addPosURL : string;
    getPosURL : string;
    updatePosURL : string;
    deletePosURL : string;

    constructor(private http: HttpClient) { 
        this.addPosURL = 'http://localhost:9091/pos/addPosition';
        this.getPosURL = 'http://localhost:9091/pos/getAll';
        this.updatePosURL = 'http://localhost:9091/pos/updatePosition'; 
        this.deletePosURL = 'http://localhost:9091/pos/deletePositionById'; 
    }

    addPosition(pos : Position) : Observable<Position>{
        return this.http.post<Position>(this.addPosURL, pos)
    }

    getAllPosition() : Observable<Position[]>{
        return this.http.get<Position[]>(this.getPosURL);
    }

    updatePosition(pos : Position) : Observable<Position>{
        return this.http.put<Position>(this.updatePosURL, pos);
    }

    deletePosition(pos: Position) : Observable<Position>{
        return this.http.delete<Position>(this.deletePosURL + "/" + pos.id);
    }
}