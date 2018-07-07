import { Component, OnInit } from '@angular/core';
import { CountriesService } from './service/countries.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryElement } from './model/CountryElement';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  loading = false;
  origin: CountryElement[] = [];
  displayedColumns: string[] =
    ['Country or Area', 'Year', 'Area', 'Sex', 'Record Type', 'Reliability', 'Source Year', 'Value', 'Value Footnotes'];
  dataSource: CountryElement[] = [];
  searchText = '';
  filter: CountryElement = new CountryElement();



  constructor(private _countriesService: CountriesService) { }

  ngOnInit() {
    this.loading = true;
    this._countriesService.getCountries()
      .subscribe(
        data => {
          const tmp: CountryElement[] = [];
          const response: any[] = Object.values(data);
          for (const entry of response) {
            tmp.push(new CountryElement(entry));
          }
          this.origin = tmp;
          this.dataSource = tmp;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
  }

  onKeydown(event) {
    console.log(' event', event);
    if (event.key === 'Enter') {
      console.log(event.target.value);
      this.changecountry();
    }
  }

  changecountry() {

    const tmp = this.origin
      .filter(item => {

        if (this.searchText.trim() === '') {
          return item;
        } else {

          if (
            item.country.includes(this.searchText) || String(item.year).includes(this.searchText) ||
            item.area.includes(this.searchText) || item.sex.includes(this.searchText) ||
            item.recordtype.includes(this.searchText) || item.reliability.includes(this.searchText) ||
            String(item.sourceyear).includes(this.searchText) || String(item.value).includes(this.searchText) ||
            String(item.valuefootnotes).includes(this.searchText)
          ) {
            // console.log(' this.searchText', this.searchText);
            // console.log(' String(item.year)',  String(item.year));
            return item;
          }
        }

      })
      .filter(item => {
        if (this.filter.country === '-1') {
          return item;
        } else {
          if (this.filter.country === item.country) {
            return item;
          }
        }
      })
      .filter(item => {
        if (this.filter.year === '-1') {
          return item;
        } else {
          if (this.filter.year === item.year) {
            return item;
          }
        }
      })
      .filter(item => {
        if (this.filter.area === '-1') {
          return item;
        } else {
          if (this.filter.area === item.area) {
            return item;
          }
        }
      })
      .filter(item => {
        if (this.filter.sex === '-1') {
          return item;
        } else {
          if (this.filter.sex === item.sex) {
            return item;
          }
        }
      })
      .filter(item => {
        if (this.filter.recordtype === '-1') {
          return item;
        } else {
          if (this.filter.recordtype === item.recordtype) {
            return item;
          }
        }
      })
      .filter(item => {
        if (this.filter.reliability === '-1') {
          return item;
        } else {
          if (this.filter.reliability === item.reliability) {
            return item;
          }
        }
      })
      .filter(item => {
        if (this.filter.sourceyear === '-1') {
          return item;
        } else {
          if (this.filter.sourceyear === item.sourceyear) {
            return item;
          }
        }
      })
      .filter(item => {
        if (this.filter.value === '-1') {
          return item;
        } else {
          if (this.filter.value === item.value) {
            return item;
          }
        }
      })
      .filter(item => {
        // console.log('this.filter', this.filter);
        if (this.filter.valuefootnotes === '-1') {
          return item;
        } else {
          if (this.filter.valuefootnotes === item.valuefootnotes) {
            return item;
          }
        }
      });

    // console.log('tmp', tmp);
    this.dataSource = tmp;
  }


  resetfilter() {
    this.filter = new CountryElement();
    this.dataSource = this.origin;
  }

}
