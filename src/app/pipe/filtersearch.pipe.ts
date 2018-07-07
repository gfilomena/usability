import { Pipe, PipeTransform } from '@angular/core';
import { CountryElement } from '../model/CountryElement';

@Pipe({
    name: 'filters',
    pure: false
})


export class FilterSearchPipe implements PipeTransform {

    transform(items: CountryElement[], filter: CountryElement): CountryElement[] {
        return items.filter(item => {
           if (filter.area === item.area) {
                return item;
           }
        }
        );
    }
}
