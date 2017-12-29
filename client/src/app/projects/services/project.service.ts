import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { ApiService } from '../../shared/api.service';
import { Project } from '../model/project';

@Injectable()
export class ProjectService {

  private _projects = new BehaviorSubject<Project[]>([]);
  public projects = this._projects.asObservable();

  private _activeProject = new BehaviorSubject<Project>(null);
  public activeProject = this._activeProject.asObservable();

  constructor(private api: ApiService) { }

  fetchProjects(): Observable<Project[]> {
    let request = this.api.request({
      uri: '/projects',
      method: 'GET',
    })
      .map(projects => {
        if (!projects) {
          throw new Error("no projects in response");
        }
        return projects;
      }).share();

    request.subscribe(
      projects => { this._projects.next(projects); }
    );

    return request;
  }

  fetchProject(id: string): Observable<Project> {
    let request = this.api.request({
      uri: `/projects/${id}`,
      method: 'GET',
    })
      .map(project => {
        if (!project) {
          throw new Error("no project in response");
        }
        return project;
      }).share();

    request.subscribe(project => this._activeProject.next(project));

    return request;
  }

  deleteProject(projectId: string): Observable<any> {
    let request = this.api.request({
          uri: `/projects/${projectId}`,
          method: 'DELETE'
        }).share();

    request.subscribe(() => {
        let projects = this._projects.getValue().filter(_project => _project.ID !== parseInt(projectId));
        this._projects.next(projects);
        this._activeProject.next(null);
      });

    return request;
  }

  createProject(project): Observable<Project> {
    let request = this.api.request({
      uri: '/projects',
      method: 'POST',
      body: JSON.stringify(project),
    })
      .map(project => {
        if (!project) {
          throw new Error("no project in response");
        }
        return project;
      }).share();

    request.subscribe(
      project => {
        let projects = this._projects.getValue().concat(project);
        this._projects.next(projects);
      });

    return request;
  }
}
