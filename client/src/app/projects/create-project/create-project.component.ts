import { Component, OnInit } from '@angular/core';

import { Project } from '../model/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  public project: Project;
  public modalOpen: boolean;
  public loading: boolean;

  constructor(private projectService: ProjectService) {
    this.resetProject();
    this.createProject = this.createProject.bind(this);
  }

  ngOnInit() {
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.resetProject();
  }

  resetProject() {
    this.project = {
      Title: '',
      Description: ''
    };
  };

  createProject() {
    this.loading = true;
    this.projectService.createProject(this.project).subscribe(
      res => { },
      err => { console.log(err); },
      () => {
        this.loading = false;
        this.closeModal();
      }
    );
  }

}
