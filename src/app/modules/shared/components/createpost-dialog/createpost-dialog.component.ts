import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../../../../services/post.service';
import { CreatePostDTO, Post } from '../../../../../models/post.model';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../../models/user.model';
import { finalize } from 'rxjs';
import { UserDetails } from '../../../../../models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../snack/snack.component';

@Component({
  selector: 'app-createpost-dialog',
  templateUrl: './createpost-dialog.component.html',
  styleUrl: './createpost-dialog.component.scss'
})
export class CreatepostDialogComponent {

  date = new Date();

  private formBuilder = inject(FormBuilder);
  private postSvc = inject(PostService);
  private authSvc = inject(AuthService);

  user = this.authSvc.userSignal();

  ngOnInit(): void {
    // this.authSvc.user$.subscribe(user => {
    //   this.user = user
    // });
  }

  constructor(public dialogRef: MatDialogRef<CreatepostDialogComponent>,
    private _snackBar: MatSnackBar) { }

  createPostForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(10)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    image: ['', [Validators.required]]
  });

  close() {
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean) {
    this.dialogRef.close({ rta });
  }

  createPost() {
    if (this.createPostForm.valid) {

      const { title, description, image } = this.createPostForm.getRawValue();

      const post: CreatePostDTO = {
        userId: this.user?.userId,
        date: new Date(),
        description: description,
        image: image,
        title: title
      }

      this.postSvc.createPost(post)
        .subscribe({
          next: (response) => {
            alert(response)
          },
          error: (error) => {
            if (error.error.errors) {
              console.log(error.error.errors[0].detail)
              this.openSnackBar(error.error.errors[0].detail);
            }
          }
        });

      this.close();

    } else {
      this.createPostForm.markAllAsTouched();
    }
  }

  durationInSeconds = 5;
  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: this.durationInSeconds * 1000,
      data: message
    });
  }

}
