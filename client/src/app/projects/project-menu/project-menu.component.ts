import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../model/project';
import { MenuService } from '../../core/services/menu.service';

@Component({
  selector: 'app-project-menu',
  templateUrl: './project-menu.component.html',
  styleUrls: ['./project-menu.component.css']
})
export class ProjectMenuComponent implements OnInit {
  @Input()
  public project: Project;

  public menuActive: boolean;

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.menuService.menuActive
      .subscribe(active => this.menuActive = active);
  }

  closeMenu() {
    this.menuService.setInactive();
  }
}
