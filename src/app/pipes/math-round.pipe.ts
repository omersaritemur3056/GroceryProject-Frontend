import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mathRound'
})
export class MathRoundPipe implements PipeTransform {

  transform(value: any, divider: number): number {
    let roundedNumber: number;
    for (let i = 0; i <= Math.floor(value.length/divider) + 1; i++) {
      roundedNumber = i
    }
    return roundedNumber;
  }

}
