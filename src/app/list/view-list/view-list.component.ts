import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { List } from '../list.model';


@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {


  @Input() list: List;
  @Input() fntColor: string;
  @Output() task = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  getColorStyles() {
    return {
      backgroundColor: this.list.color,
      color: this.fntColor
    }
  }

  onSubmit(form: NgForm) {
    this.task.emit(form.value.task);
    form.resetForm();
  }

}
