import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ListService } from '../list/list.service';
import { NewListMenuComponent } from './new-list-menu/new-list-menu.component';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  constructor(private newListMenu: MatDialog, 
              private listService: ListService) {}

  ngOnInit(): void {

    const dialogRef = this.newListMenu.open(NewListMenuComponent, { panelClass: 'custom-dialog-container' });

    dialogRef.afterClosed().subscribe(
      (data: {name: string, color: string}) => {
        data ? this.listService.createNewList(data) : 
            this.listService.newListCancel();
      }
    );
  }

}
