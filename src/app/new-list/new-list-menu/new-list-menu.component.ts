import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-new-list-menu',
  templateUrl: './new-list-menu.component.html',
  styleUrls: ['./new-list-menu.component.css']
})
export class NewListMenuComponent implements OnInit {

  color: string;

  constructor(public dialogRef: MatDialogRef<NewListMenuComponent>) {}

  ngOnInit(): void {
  }

  onSubmit(form: NgForm, color: string) {
    if (!color) {
      color = '#ffffff';
    }
    const data = {
      name: form.value.listname,
      color: color
    }
    this.dialogRef.close(data);
  }

  onClose() {
    this.dialogRef.close();
  }

}
