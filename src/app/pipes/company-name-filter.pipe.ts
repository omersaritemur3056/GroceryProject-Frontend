import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyNameFilter'
})
export class CompanyNameFilterPipe implements PipeTransform {

  transform(value: any[], filterText: string): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : ""
    return filterText ? value.filter((p:any) => 
    p.companyName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
