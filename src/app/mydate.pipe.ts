import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class MydatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log(value, args);
    return value.substring(0, 16);
  }
}
