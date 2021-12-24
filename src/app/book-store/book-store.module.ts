import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookStoreRoutingModule} from './book-store-routing.module';
import {BookListComponent} from './book-list/book-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BookCreateComponent} from './book-create/book-create.component';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    BookListComponent,
    BookCreateComponent
  ],
  imports: [
    CommonModule,
    BookStoreRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class BookStoreModule {
}
