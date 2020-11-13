import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ListService } from 'src/app/list/list.service';
import { List } from 'src/app/list/list.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  listsSubscription: Subscription;
  createdLists: List[];

  @Output() close = new EventEmitter<void>();

  constructor(private listService: ListService) { }

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

  onDelete(index: number) {
    this.listService.deleteLists(index);
  }

  ngOnDestroy() {
    this.listsSubscription.unsubscribe();
  }

}
