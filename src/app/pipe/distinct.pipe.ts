import { Pipe, PipeTransform } from '@angular/core';
import { CountryElement } from '../model/CountryElement';

@Pipe({
  name: 'distinct'
})
export class DistinctPipe implements PipeTransform {
  transform(items: CountryElement[], param: string): any[] {

    if (!items) {
      return [];
    }

// items.forEach(item => {console.log('->', param); });

    return items
      .map(item => item[param])
      .filter((value, index, self) => self.indexOf(value) === index).sort();
  }

}
