import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoryService } from '../../projects/services/category.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
  providers: [CategoryService]
})
export class CategoriesPageComponent implements OnInit {
  private categories;
  public projectId: string;
  public loading = false;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryService.categories
      .subscribe(categories => this.categories = categories);

    this.route.params
      .map(params => params['projectId'])
      .subscribe(projectId => {
        this.projectId = projectId;
        this.fetchCategories(projectId);
      });
  }

  fetchCategories(categoryID: string) {
    this.loading = true;
    this.categoryService.fetchCategories(categoryID)
      .subscribe(
        () => { },
        err => console.log(err),
        () => this.loading = false
      );
  }


}
