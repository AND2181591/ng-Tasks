import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { List } from 'src/app/list/list.model';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() list: List;
  @Output() taskChecked = new EventEmitter<{item: number, selected: boolean}>();
  @Output() deleteRequest = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list.list, event.previousIndex, event.currentIndex);
  }

  onTaskChecked(item: number, selected: boolean) {
    const itemChecked = {
      item: item,
      selected: selected
    };
    this.taskChecked.emit(itemChecked);
  }

  onDelete(index: number) {
    this.deleteRequest.emit(index);
  }

}
