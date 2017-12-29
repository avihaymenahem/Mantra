import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectService } from "./services/project.service";

import { ProjectsListComponent } from './projects-list/projects-list.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectMenuComponent } from './project-menu/project-menu.component';
import { ProjectWrapperComponent } from './project-wrapper/project-wrapper.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { PhrasesListComponent } from './phrases-list/phrases-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProjectsListComponent,
    CreateProjectComponent,
    ProjectMenuComponent,
    ProjectWrapperComponent,
    CategoriesListComponent,
    CreateCategoryComponent,
    PhrasesListComponent
  ],
  providers: [
    ProjectService
  ],
  exports: [
    ProjectsListComponent,
    CategoriesListComponent,
    CreateProjectComponent,
    CreateCategoryComponent
  ]
})
export class ProjectsModule { }

export {
  ProjectService
}
