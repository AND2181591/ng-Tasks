import { NgModule } from '@angular/core';

import { ListComponent } from './list.component';
import { ViewListComponent } from './view-list/view-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ListComponent,
        ViewListComponent,
        TaskListComponent
    ], 
    imports: [
        SharedModule
    ]
})
export class ListModule {}