import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { FormsModule } from '@angular/forms'; 
import {HttpClientModule} from "@angular/common/http";
import {AddPartComponent} from "./parts/add-part/add-part.component";
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ExcelService } from '../services/excel.service';
import { DropdownService } from 'src/services/dropdown-service.service';
import { PartService } from 'src/services/part-service.service';

@NgModule({
  declarations: [
    AppComponent,
    AddPartComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    ExcelService,
    DropdownService,
    PartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
