import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guard/auth.guard';
import { UnauthGuard } from './auth/guard/unauth.guard';

import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ProjectWrapperComponent} from "./projects/project-wrapper/project-wrapper.component";

import {HomePageComponent} from "./pages/home-page/home-page.component";
import {CategoriesPageComponent} from "./pages/categories-page/categories-page.component";
import {CategoryPhrasesComponent} from "./pages/category-phrases/category-phrases.component";

const appRoutes: Routes = [
  { path: 'login',    component: LoginComponent,    canActivate: [UnauthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UnauthGuard] },
  { path: 'projects', component: HomePageComponent, canActivate: [AuthGuard]   },
  {
    path: 'projects/:projectId', component: ProjectWrapperComponent, canActivate: [AuthGuard], children: [
      { path: '', component: CategoriesPageComponent, canActivate: [AuthGuard] },
      { path: 'category/:categoryId', component: CategoryPhrasesComponent, canActivate: [AuthGuard] },
      // { path: 'settings', component: ProjectSettingsPage, canActivate: [CanActivateProjectSettings] },
      // { path: 'team', component: ProjectTeamPage, canActivate: [CanActivateTeam] },
      // { path: 'api', component: APIAccessPage, canActivate: [CanActivateAPI] },
      // { path: 'api/:clientId', component: APIAppPage, canActivate: [CanActivateAPI] },
      // { path: 'locales', redirectTo: '', pathMatch: 'full' },
      // { path: 'locales/:localeIdent', component: LocalePage, canActivate: [CanActivateLocale] },
    ]
  },
  { path: '', redirectTo: '/projects', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
