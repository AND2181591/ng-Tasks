import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { ListService } from 'src/app/list/list.service';
import { List } from 'src/app/list/list.model';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  listsSubscription: Subscription;
  createdLists: List[];

  checked = false;

  @Output() close = new EventEmitter<void>();

  constructor(private listService: ListService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listsSubscription = this.listService.showLists.subscribe(lists => {
      this.createdLists = lists;
    });

    this.listService.fetchAvailableLists();
  }


  onSidenavClose() {
    this.close.emit();
  }

  onListSelect(id: number) {
    this.close.emit();
    this.listService.viewSelectedList(id);
  }

  onDelete(index: number, title: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      list: title
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.listService.deleteLists(index);
      }
    });
  }

  // onDarkModeToggle(event) {
  //   this.checked = event.checked;
  // }

  ngOnDestroy() {
    this.listsSubscription.unsubscribe();
  }

}
