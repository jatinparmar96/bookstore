import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Book} from "../book.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  bookForm:FormGroup;
  storeName = 'bookStore';
  isEditMode = false;
  bookStore:Book[] = [];
  bookIdx:number =-1;

  maxDate = Date.now();
  constructor(
    fb: FormBuilder,
    private router: Router,
    private route:ActivatedRoute
  ) {
    this.bookForm = fb.group({
      'name':['',Validators.required],
      'author':['',Validators.required],
      'publishedDate':['',Validators.required],
      'bestseller':[false,Validators.required],
    })
  }

  ngOnInit(): void {
    if (!localStorage.getItem(this.storeName)){
      localStorage.removeItem(this.storeName);
    }
    this.bookStore =  JSON.parse(localStorage.getItem(this.storeName) || '[]');
    this.route.params.subscribe(value => {
      if (value['id'] !=='add'){
        this.isEditMode = true
        this.bookIdx = value['id']
        this.loadFormFields(value['id']);
      }
    })
  }
  loadFormFields(id:number){
    const book = this.bookStore[id];
    this.bookForm.patchValue({
      name:book.name,
      author: book.author,
      publishedDate: book.publishedDate,
      bestseller: book.isBestSeller
    });
  }
  submit(){
    if (this.bookForm.invalid) return;

    const book:Book = {
      name:this.bookForm.value.name,
      author:this.bookForm.value.author,
      publishedDate:this.bookForm.value.publishedDate,
      isBestSeller:this.bookForm.value.bestseller,
    }
    if (this.isEditMode){
      this.bookStore.splice(this.bookIdx,1,book)
    }
    else {
      this.bookStore.push(book);
    }

    localStorage.setItem(this.storeName,JSON.stringify(this.bookStore));
    this.router.navigate(['/'])
  }

  filterFutureDates = (d:Date | null)=>{
   const currentDate = new Date();
   if (d){
     return d<=currentDate;
   }
    return true;
  }

}
