import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Book} from "../book.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  bookForm:FormGroup;
  storeName = 'bookStore';
  constructor(
    fb: FormBuilder,
    private router: Router,
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
    if (!localStorage.getItem(this.storeName)){
      localStorage.removeItem(this.storeName);
    }
    const bookStore =  JSON.parse(localStorage.getItem(this.storeName) || '[]');
    const book:Book = {
      name:this.bookForm.value.name,
      author:this.bookForm.value.author,
      publishedYear:this.bookForm.value.publishedDate,
      isBestSeller:this.bookForm.value.bestseller,
    }
    bookStore.push(book);
    localStorage.setItem(this.storeName,JSON.stringify(bookStore));
    this.router.navigate(['/'])
  }

}
