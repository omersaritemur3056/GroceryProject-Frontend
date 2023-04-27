import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullNameFilter'
})
export class FullNameFilterPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : ""
    return filterText ? value.filter((p:any) => 
    p.fullName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
