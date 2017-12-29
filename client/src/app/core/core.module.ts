import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuService } from "./services/menu.service";

@NgModule({
  imports: [
    RouterModule.forChild([])
  ],
  exports: [
    SidebarComponent
  ],
  declarations: [
    SidebarComponent
  ],
  providers: [
    MenuService
  ]
})
export class CoreModule {
  // Prevent re import of core module
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import Core modules in the AppModule only.');
    }
  }
}
