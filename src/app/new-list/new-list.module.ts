import { NgModule } from '@angular/core';

import { NewListComponent } from './new-list.component';
import { NewListMenuComponent } from './new-list-menu/new-list-menu.component';
import { SharedModule } from '../shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
    declarations: [
        NewListComponent,
        NewListMenuComponent
    ], 
    imports: [
        SharedModule, 
        ColorPickerModule
    ], 
    entryComponents: [NewListMenuComponent]
})
export class NewListModule {}