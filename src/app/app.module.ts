import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { WelcomeDialogComponent } from './welcome/welcome-dialog/welcome-dialog.component';
import { HeaderComponent } from './header/header/header.component';
import { SidenavComponent } from './header/sidenav/sidenav.component';

import { ListService } from './list/list.service';
import { UIService } from './shared/ui.service';

import { ListModule } from './list/list.module';
import { NewListModule } from './new-list/new-list.module';
import { SharedModule } from './shared/shared.module';

import { environment } from '../environments/environment';
import { ConfirmDialogComponent } from './header/sidenav/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    WelcomeDialogComponent, 
    HeaderComponent, 
    SidenavComponent, ConfirmDialogComponent
  ],
  imports: [
    AppRoutingModule, 
    BrowserAnimationsModule,
    ListModule, 
    NewListModule, 
    SharedModule, 
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule, 
    AngularFireAuthModule
  ],
  providers: [ListService, UIService],
  bootstrap: [AppComponent], 
  entryComponents: [WelcomeDialogComponent]
})
export class AppModule { }
