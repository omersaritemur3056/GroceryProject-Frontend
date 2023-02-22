import { GetAllProductResponse } from 'src/app/models/product/get-all-product-response';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: GetAllProductResponse[], filterText: string): GetAllProductResponse[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : ""
    return filterText ? value.filter((p:GetAllProductResponse) => 
    p.name.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
