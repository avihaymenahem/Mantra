import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

import { ApiService } from "./shared/api.service";
import { ErrorsService } from "./shared/errors.service";

import { AuthGuard } from "./auth/guard/auth.guard";
import { UnauthGuard } from "./auth/guard/unauth.guard";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Core
    BrowserModule,
    CoreModule,
    FormsModule,

    // Routing
    AppRoutingModule,
    HttpClientModule,

    // App Level modules
    AuthModule,
    PagesModule
  ],
  providers: [
    ApiService,
    ErrorsService,
    AuthGuard,
    UnauthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
