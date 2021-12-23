import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  bookForm;
  constructor(
    fb: FormBuilder
  ) {
    this.bookForm = fb.group({
      'name':['',Validators.required],
      'author':['',Validators.required],
      'publishedDate':['',Validators.required],
      'bestseller':[false,Validators.required],
    })
  }

  ngOnInit(): void {
  }
  submit(){
    console.log(this.bookForm.value)
  }

}
