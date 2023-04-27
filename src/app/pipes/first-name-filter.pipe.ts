import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstNameFilter'
})
export class FirstNameFilterPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : ""
    return filterText ? value.filter((p:any) => 
    p.firstName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
