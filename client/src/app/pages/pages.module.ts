import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { ProjectsModule } from "../projects/projects.module";
import { HomePageComponent } from './home-page/home-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoryPhrasesComponent } from './category-phrases/category-phrases.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    HttpClientModule,
    ProjectsModule
  ],
  declarations: [
    HomePageComponent,
    CategoriesPageComponent,
    CategoryPhrasesComponent
  ],
  exports: [
    HomePageComponent,
    CategoriesPageComponent
  ]
})
export class PagesModule { }
