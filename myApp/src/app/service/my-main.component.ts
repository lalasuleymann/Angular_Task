import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class MyMainService{
 a : string[] =localStorage.getItem("access_token").split('"');
 headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'authorization': `Bearer ${this.a[3]}`,
  } 
}