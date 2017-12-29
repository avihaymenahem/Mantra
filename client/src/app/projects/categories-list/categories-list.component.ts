import { Component, Input } from '@angular/core';

import { Category } from '../model/category';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {

  @Input()
  public categories: Category[];

  @Input()
  private loading: boolean;

  @Input()
  public projectId: string;

}
