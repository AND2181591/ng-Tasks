import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from 'angularfire2/firestore';

import { WelcomeDialogComponent } from '../welcome-dialog/welcome-dialog.component';
import { UIService } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private dialog: MatDialog, 
              private db: AngularFirestore, 
              private ui: UIService) { }

  ngOnInit(): void {

    this.db.collection('taskList').valueChanges().subscribe(result => {
      if (result.length === 0 && this.ui.getFirstTimeUse() === true) {
        this.dialog.open(WelcomeDialogComponent);
        this.ui.setFirstTimeUse();
      }
    });
  }

}
