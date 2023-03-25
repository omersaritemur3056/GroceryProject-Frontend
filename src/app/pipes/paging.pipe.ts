import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paging'
})
export class PagingPipe implements PipeTransform {

  transform(value: any, pageSize:number): number[] {
    let total = [];
    for (let i = 0; i < Math.floor(value.length/pageSize) + 1; i++) {
      total.push(i);
    }
    return total;
  }

}
