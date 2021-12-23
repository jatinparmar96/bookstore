import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Book} from "../book.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Book>;

  @ViewChild(MatPaginator) private paginator!:MatPaginator;
  storeName = 'bookStore'
  books: Book[] = []

  displayedColumns = ['position', 'name', 'author', 'published year', 'bestseller', 'actions']

  constructor(
    private router:Router
  ) {
    this.dataSource = new MatTableDataSource<Book>([]);
  }

  ngOnInit(): void {
    this.seedBookData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  seedBookData() {
    const book: Book = {
      name: "4 Hour Work Week",
      author: "James Clear",
      isBestSeller: false,
      publishedYear: new Date(),
    }
    this.books.push(book);
    const books = JSON.parse(localStorage.getItem(this.storeName) || '[]');
    this.books = [...this.books, ...books];
    this.dataSource.data = this.books
   // this.dataSource = new MatTableDataSource<Book>(this.books)
  }

  edit(idx:number){
    this.router.navigate([idx]);
  }
  delete(idx:number){
    this.books.splice(idx,1);
    localStorage.setItem(this.storeName,JSON.stringify(this.books));
    this.dataSource.data = this.books;
  }

}
