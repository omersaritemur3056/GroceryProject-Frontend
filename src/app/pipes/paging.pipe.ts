import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paging'
})
export class PagingPipe implements PipeTransform {

  transform(value: number, pageSize:number): number {
    return Math.floor(value/pageSize) + 1;
  }

}
