import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ListService } from './list.service';
import { List } from './list.model';
import { UIService } from '../shared/ui.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  fontColorSub: Subscription;
  fontColor: string = '';

  listSubscription: Subscription;
  currentList: List = { date: new Date, title: '', color: '', list: [{ task: '', completed: false }] };

  constructor(private listService: ListService,
              private uiService: UIService) {}

  ngOnInit() {
    this.currentList = this.listService.getCurrentList();
    this.listSubscription = this.listService.showCurrentList.subscribe(
      (list: List) => {
        this.currentList = list;
      }
    );  

    this.fontColor = this.uiService.getTextColor();
    this.fontColorSub = this.uiService.showTextContrast.subscribe(
      (fontChange: string) => {
        this.fontColor = fontChange;
      }
    );
  }

  onNewTask(data: string) {
    this.listService.addTasksToLists(data);
  }

  onTaskChecked(data: {item: number, selected: boolean}) {
    this.listService.checkedUncheckedTask(data);
  }

  onDeleteRequest(index: number) {
    this.listService.deleteTasks(index);
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
    this.fontColorSub.unsubscribe();
  }
}