import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { UIService } from 'src/app/shared/ui.service';
import { ListService } from 'src/app/list/list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  fontColorSub: Subscription;
  fontColor: string = 'white';

  backgrdColorSub: Subscription;
  backgrdColor: string = '#673ab7';

  listSub: Subscription;
  iconAnimate = true;

  @Output() sidenav = new EventEmitter<void>();

  constructor(private listService: ListService,
              private uiService: UIService) { }

  ngOnInit(): void {

    this.fontColorSub = this.uiService.showTextContrast.subscribe(fontChange => {
      this.fontColor = fontChange;
    });

    this.backgrdColorSub = this.uiService.showCurrentColor.subscribe(colorChange => {
      this.backgrdColor = colorChange;
    });

    this.listSub = this.listService.showLists.subscribe(result => {
      if (result.length > 0) {
        this.iconAnimate = false;
      }
    });
  }

  getColorStyles() {
    return {
      backgroundColor: this.backgrdColor,
      color: this.fontColor
    }
  }

  onSidenavToggle() {
    this.sidenav.emit();
    this.iconAnimate = false;
  }

  ngOnDestroy() {
    this.fontColorSub.unsubscribe();
    this.backgrdColorSub.unsubscribe();
  }
}
