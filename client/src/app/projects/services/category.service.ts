import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { ApiService } from '../../shared/api.service';
import { Category } from '../model/category';

@Injectable()
export class CategoryService {

  private _categories = new BehaviorSubject<Category[]>([]);
  public categories = this._categories.asObservable();

  private _activeCategory = new BehaviorSubject<Category>(null);
  public activeCategory = this._activeCategory.asObservable();

  constructor(private api: ApiService) { }

  fetchCategories(projectID: string): Observable<Category[]> {
    let request = this.api.request({
      uri: `/projects/${projectID}/categories`,
      method: 'GET',
    })
      .map(categories => {
        if (!categories) {
          throw new Error("no categories in response");
        }
        return categories;
      }).share();

    request.subscribe(
      categories => { this._categories.next(categories); }
    );

    return request;
  }

  fetchCategory(id: string): Observable<Category> {
    let request = this.api.request({
      uri: `/categories/${id}`,
      method: 'GET',
    })
      .map(category => {
        if (!category) {
          throw new Error("no category in response");
        }
        return category;
      }).share();

    request.subscribe(category => this._activeCategory.next(category));

    return request;
  }

  deleteCategory(categoryID: string): Observable<any> {
    let request = this.api.request({
      uri: `/categories/${categoryID}`,
      method: 'DELETE'
    }).share();

    request.subscribe(() => {
      let categories = this._categories.getValue().filter(_category => _category.ID !== parseInt(categoryID));
      this._categories.next(categories);
      this._activeCategory.next(null);
    });

    return request;
  }

  createCategory(category): Observable<Category> {
    let request = this.api.request({
      uri: '/categories',
      method: 'POST',
      body: JSON.stringify(category),
    })
      .map(category => {
        if (!category) {
          throw new Error("no category in response");
        }
        return category;
      }).share();

    request.subscribe(
      category => {
        let categories = this._categories.getValue().concat(category);
        this._categories.next(categories);
      });

    return request;
  }
}
