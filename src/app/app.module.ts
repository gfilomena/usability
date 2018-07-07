import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CountriesService } from 'src/app/service/countries.service';
import { FormsModule } from '@angular/forms';
import {
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatToolbarModule,
  MatSelectModule,
  MatSortModule,
  MatBadgeModule,
  MatButtonModule,
  MatProgressBarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DistinctPipe } from './pipe/distinct.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DistinctPipe
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatToolbarModule,
    MatSortModule,
    MatSelectModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [CountriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
