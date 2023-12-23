import { Component, Inject } from '@angular/core';
import { Item } from '../../../../../models/getPostResponse.model';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

interface InputData {
  post: Item;
}

interface OutputData {
  rta: boolean;
}

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrl: './post-dialog.component.scss'
})
export class PostDialogComponent {

  post!: Item;

  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
  ) {
    this.post = data.post;
  }

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }
}
