import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ListService } from './list/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'tasks-app';

  listSub: Subscription;
  spinnerSub: Subscription;

  isLoading: boolean = true;

  constructor(
    private listService: ListService
  ) {}

  ngOnInit() {
    this.listService.autoLogin();

    this.listSub = this.listService.showLists.subscribe(result => {
      if (result.length > 0) {
        this.isLoading = false;
        this.listService.initListDisplays();
      } else {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
  }


  // WEBSITE URL
  // https://ng-tasks-39558.web.app

}