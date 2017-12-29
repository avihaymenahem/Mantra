import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../model/project';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  @Input()
  public projectID: string;

  public project: Project;
  public category: Category;
  public modalOpen: boolean;
  public loading: boolean;

  constructor(private categoryService: CategoryService) {
    this.resetCategory();
    this.createCategory = this.createCategory.bind(this);
  }

  ngOnInit() {
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.resetCategory();
  }

  resetCategory() {
    this.category = {
      Title: '',
      Description: '',
      ProjectID: 0
    };
  };

  createCategory() {
    this.loading = true;
    this.category.ProjectID = parseInt(this.projectID);
    this.categoryService.createCategory(this.category).subscribe(
      res => { },
      err => { console.log(err); },
      () => {
        this.loading = false;
        this.closeModal();
      }
    );
  }

}
