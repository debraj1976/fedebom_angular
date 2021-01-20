import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PartService} from "../../../services/part-service.service";

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.less']
})
export class AddPartComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private partService: PartService) {
  }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      author: ['', Validators.required]
    });

  }

  onSubmit() {
    this.partService.addPart(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['list-parts']);
      });
  }

}