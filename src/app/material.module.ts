import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
    imports: [
        MatDialogModule, 
        MatButtonModule, 
        MatIconModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule,  
        MatNativeDateModule, 
        MatCheckboxModule,
        MatSidenavModule, 
        MatToolbarModule, 
        MatListModule, 
        MatCardModule, 
        DragDropModule, 
        MatMenuModule, 
        MatProgressSpinnerModule, 
        MatSlideToggleModule
    ], 
    exports: [
        MatDialogModule, 
        MatButtonModule, 
        MatIconModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule, 
        MatNativeDateModule, 
        MatCheckboxModule, 
        MatSidenavModule, 
        MatToolbarModule, 
        MatListModule, 
        MatCardModule, 
        DragDropModule, 
        MatMenuModule, 
        MatProgressSpinnerModule, 
        MatSlideToggleModule
    ], 
    providers: []
})
export class MaterialModule {}