import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';

const routes: Routes = [
  { path: '', component: ContactsComponent },
  { path: ':id/edit', component: ContactEditComponent },
  { path: ':id', component: ContactDetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContactsComponent
  ]
})
export class ContactsModule { }