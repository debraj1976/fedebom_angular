
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Part } from '../services/models/part';
import { PartHistory } from '../services/models/parthistory';
import { PartService } from '../services/part-service.service';
import { ExcelService } from '../services/excel.service';
import { DropdownService } from '../services/dropdown-service.service';
import { Router } from "@angular/router";
import { Dropdown } from '../services/models/dropdown';
import * as XLSX from 'xlsx';
//import { debug } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  title = 'PartHistory';
  parts: Part[];
  categories: Dropdown[];
  prefixes: Dropdown[];
  suffixes: Dropdown[];
  usageIds: Dropdown[];
  bases: Dropdown[];
  showModal = false;
  partHistories: PartHistory[];
  id: number;
  toDate: string;
  fromDate: string;
  prefix: string;
  suffix: string;
  base: string;
  usageId: string;

  constructor(private router: Router, private partService: PartService, 
    private dropdownService: DropdownService, private excelService:ExcelService) {
  }

  getParts() {
    this.partService.getParts().subscribe(data => {
      this.parts = data;
    });
  }

  getPartHistories(id: any) {
    this.id = id;

    this.partService.getPartHistory(id).subscribe(data => {
      this.partHistories = data;
      //alert(JSON.stringify(this.part));
    });
  }

  getCategoryDropdown() {
    this.dropdownService.getDropdownValuesByCategory('Category').subscribe(data => {
      this.categories = data;
    });
  }

  getUsageIdsDropdown() {
    this.dropdownService.getDropdownValuesByCategory('USAGEID').subscribe(data => {
      this.usageIds = data;
    });
  }

  getPrefixesDropdown() {
    this.dropdownService.getDropdownValuesByCategory('PREFIX').subscribe(data => {
      this.prefixes = data;
    });
  }

  getSuffixesDropdown() {
    this.dropdownService.getDropdownValuesByCategory('SUFFIX').subscribe(data => {
      this.suffixes = data;
    });
  }

  getBasesDropdown() {
    this.dropdownService.getDropdownValuesByCategory('BASE').subscribe(data => {
      this.bases = data;
    });
  }
  addPart(): void {
    this.router.navigate(['add-part'])
      .then((e) => {
        if (e) {
          //console.log("Navigation is successful!");
        } else {
          //console.log("Navigation has failed!");
        }
      });
  };

  onSearch(event: any){
    this.partService.getPartHistoryByDates(this.id,this.fromDate, this.toDate).subscribe(data => {
      this.partHistories = data;
    });
    
  }

  onBaseChange(item: any, event: any){
    this.base = item;
  }

  onUsageIdChange(item: any, event: any){
    this.usageId = item;
  }

  onPrefixChange(item: any, event: any){
    //alert(item);
    this.prefix = item;
  }

  onSuffixChange(item: any, event: any){
    this.suffix = item;
  }

  onClick(item: any, event: any) {
    this.prefix = item.prefix;
    this.suffix = item.suffix;
    this.base = item.base;
    this.usageId = item.usageId;
    //alert(this.prefixes);
    //alert(this.usageId);
    if(event.target.checked){
        this.showModal = true; // Show-Hide Modal Check
        this.getPartHistories(item.id);
    }
  }

  hide() {
    this.id=0;
    this.toDate='';
    this.fromDate='';
    this.prefix='';
    this.suffix='';
    this.base='';
    this.usageId='';
    this.showModal = false;
  }

  exportAsXLSXx() {
    /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, "parthistory.xlsx");
 }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.partHistories, 'partHistories');
  }

  ngOnInit(): void {
    this.router.events.subscribe(value => {
      this.getParts();
      this.getCategoryDropdown();
      this.getPrefixesDropdown();
      this.getSuffixesDropdown();
      this.getUsageIdsDropdown();
      this.getBasesDropdown();
    });
  }
}

