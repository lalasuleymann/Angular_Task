import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Position } from "../../model/position/position";
import { addPosition } from "src/app/model/position/addPosition";
import { BaseService } from "../baseUrl.component";

@Injectable({
    providedIn : 'root'
})
export class PositionService{


    constructor(private base: BaseService,private http: HttpClient) {}

    baseApiUrlForPosition = this.base.BaseApiUrl + 'position/';
    
    addPosition(position : addPosition) : Observable<positionResponse>{
        return this.http.post<positionResponse>(`${this.baseApiUrlForPosition}`, position)
    }

    getAllPositions() : Observable<positionResponses>{
        return this.http.get<positionResponses>(`${this.baseApiUrlForPosition}`);
    }

    updatePosition(pos: number, position : Position) : Observable<Position>{
        return this.http.put<Position>(`${this.baseApiUrlForPosition}${pos}`, position);
    }

    deletePosition(pos: number) : Observable<Position>{
        return this.http.delete<Position>(`${this.baseApiUrlForPosition}${pos}`);
    }
}

export class positionResponses{
    positions : Position[];
}

export class positionResponse{
    positions : addPosition;
}