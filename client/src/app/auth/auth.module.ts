import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HashComponent } from './hash/hash.component';
import {AuthService} from "./services/auth.service";
import {TokenService} from "./services/token.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    HashComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    HashComponent
  ],
  providers: [
    AuthService,
    TokenService
  ]
})
export class AuthModule { }
