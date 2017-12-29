import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

import { ProjectService } from '../services/project.service';
import { Project } from '../model/project';

@Component({
  providers: [
    ProjectService
  ],
  selector: 'app-project-wrapper',
  templateUrl: './project-wrapper.component.html',
  styleUrls: ['./project-wrapper.component.css']
})
export class ProjectWrapperComponent implements OnInit {

  private loading: boolean;
  public project: Project;
  private menuActive: boolean;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .map(params => params['projectId'])
      .subscribe(projectId => this.fetchProject(projectId));

    this.projectService.activeProject
      .subscribe(project => this.project = project);
  }

  fetchProject(projectId) {
    this.loading = true;
    this.projectService.fetchProject(projectId)
      .subscribe(
        () => { },
        err => console.log(err),
        () => this.loading = false
      );
  }

}
