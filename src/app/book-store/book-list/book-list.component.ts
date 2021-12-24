import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Book} from "../book.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<Book>;

  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  storeName = 'bookStore'
  books: Book[] = []

  filterForm: FormGroup;


  displayedColumns = ['position', 'name', 'author', 'published date', 'bestseller', 'actions']

  constructor(
    private router: Router,
    fb: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource<Book>([]);
    this.filterForm = fb.group({
      'name': [''],
      'author': [''],
      'publishedDate': fb.group({
        startDate: [],
        endDate: []
      }),
      'bestseller': ['']
    })
  }


  ngOnInit(): void {
    if (!localStorage.getItem(this.storeName)) {
      this.seedBookData();
    }
    this.loadBookData()

    this.filterForm.valueChanges.subscribe(v => {
        this.dataSource.filter = this.searchTerms();
      }
    )
    this.dataSource.filterPredicate = this.getFilterPredicate()
  }

  searchTerms() {
    return JSON.stringify(this.filterForm.value);
  }

  getFilterPredicate() {
    return (row: Book, filterString: string) => {
      const filter = JSON.parse(filterString);
      const matchFilter = [];

      //Get data from row
      const rowName = row.name;
      const rowAuthor = row.author;
      const rowDate = new Date(row.publishedDate);

      let dateFilter;
      const nameFilter = rowName.toLowerCase().includes(filter.name.toLowerCase());
      const authorFilter = rowAuthor.toLowerCase().includes(filter.author.toLowerCase());
      if (filter.publishedDate.endDate) {
        dateFilter = rowDate >= new Date(filter.publishedDate.startDate) && rowDate <= new Date(filter.publishedDate.endDate);
      } else {
        dateFilter = rowDate >= new Date(filter.publishedDate.startDate)
      }

      if (filter.bestseller) {
        matchFilter.push(row.isBestSeller)
      }
      matchFilter.push(nameFilter);
      matchFilter.push(authorFilter)
      matchFilter.push(dateFilter);
      return matchFilter.every(Boolean);
    };
  }

  applyNameFilter(event: any) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  seedBookData() {
    const book: Book = {
      name: "4 Hour Work Week",
      author: "James Clear",
      isBestSeller: false,
      publishedDate: new Date(),
    }
    this.books.push(book);
    const books = JSON.parse(localStorage.getItem(this.storeName) || '[]');
    this.books = [...this.books, ...books];
    this.dataSource.data = this.books
    // this.dataSource = new MatTableDataSource<Book>(this.books)
  }

  loadBookData() {
    this.books = JSON.parse(localStorage.getItem(this.storeName) || '[]');
    this.dataSource.data = this.books
  }

  edit(idx: number) {
    this.router.navigate([idx]);
  }

  delete(idx: number) {
    this.books.splice(idx, 1);
    localStorage.setItem(this.storeName, JSON.stringify(this.books));
    this.dataSource.data = this.books;
  }

}
