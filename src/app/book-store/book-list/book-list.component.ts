import {Component, OnInit} from '@angular/core';
import {Book} from "../book.model";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[] = []


  displayedColumns = ['position', 'name', 'author', 'published year']

  constructor() {
  }

  ngOnInit(): void {
    this.seedBookData();
  }

  seedBookData(){
    const book:Book = {
      name: "4 Hour Work Week",
      author: "James Clear",
      isBestSeller: false,
      publishedYear: new Date(),
    }
    this.books.push(book);
  }

}
