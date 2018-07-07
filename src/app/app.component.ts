import { Component, OnInit } from '@angular/core';
import { CountriesService } from './service/countries.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryElement } from './model/CountryElement';
import 'rxjs/add/operator/map';
import { PageEvent } from '@angular/material';

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

  // MatPaginator Inputs
  length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;


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
          this.length = tmp.length;
          // this.dataSource = tmp;
          this.dataSource = tmp.slice(0, this.pageSize);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
  }

  onKeydown(event) {
    /*
    console.log(' event', event);
    if (event.key === 'Enter') {
      console.log(event.target.value);
    } */
    this.changecountry();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
     console.log('e:', e);
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    const tmp = this.filters();
    this.dataSource = tmp.slice(firstCut, secondCut);
  }

  changecountry() {
    const tmp = this.filters();
    this.length = tmp.length;
    this.dataSource = tmp.slice(0, this.pageSize);
    // console.log('tmp', tmp);
  }

  filters() {
    return this.origin
      .filter(item => {

        if (this.searchText.trim() === '') {
          return item;
        } else {

          if (
            item.country.toLowerCase().includes(this.searchText.toLowerCase()) || String(item.year).includes(this.searchText) ||
            item.area.toLowerCase().includes(this.searchText) || item.sex.toLowerCase().includes(this.searchText.toLowerCase()) ||
            item.recordtype.toLowerCase().includes(this.searchText.toLowerCase()) ||
            item.reliability.toLowerCase().includes(this.searchText.toLowerCase()) ||
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
  }


  resetfilter() {
    this.filter = new CountryElement();
    this.dataSource = this.origin.slice(0, this.pageSize);
    this.length = this.origin.length;
    this.searchText = '';
  }

}
