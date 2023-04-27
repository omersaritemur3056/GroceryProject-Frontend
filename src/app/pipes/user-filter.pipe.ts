import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : ""
    return filterText ? value.filter((p:any) => 
    p.username.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
