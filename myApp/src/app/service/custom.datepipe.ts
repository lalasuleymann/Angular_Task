import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateTime, Settings } from 'luxon';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends 
             DatePipe implements PipeTransform {
  override transform(DateValue:any):any  {

    var datetime = DateTime.DateValue;
    return super.transform(datetime.format('dd-MM-yyyy'))
    // var a = DateValue.toString.Date.parse(formatDate,'dd-MM-yyyy');
    
    // return super.transform(DateValue);
    
  //   if (DateValue.val() != "") {      
  //     var d1 = Date.parse(DateValue.val());
  //     if (d1 == null) {
  //         alert('Date Invalid.');
  //         DateValue.val("");
  //     }
  //         var array = d1.toString('dd-MM-yyyy');
  //         DateValue.val(array);
  // }


      // const DateString:string = DateValue.toString();
      // const Year:number  = parseInt(DateString.substr(0, 4), 10);
      // const Month:number = parseInt(DateString.substr(4, 2), 10) - 1;
      // const Day:number   = parseInt(DateString.substr(6, 2), 10);
      // const DateObject:Date = new Date(Year, Month, Day);
  
      // var d1 = Date.parse(DateValue, "dd/MM/yyyy");
      // return super.transform(DateObject);
  }
}