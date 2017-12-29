import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../projects/services/project.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [ProjectService]
})
export class HomePageComponent implements OnInit {
  private projects;
  public loading = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.projects
      .subscribe(projects => this.projects = projects);
    this.fetchProjects();
  }

  fetchProjects() {
    this.loading = true;
    this.projectService.fetchProjects()
      .subscribe(
        () => { },
        err => console.log(err),
        () => this.loading = false
      );
  }

}
