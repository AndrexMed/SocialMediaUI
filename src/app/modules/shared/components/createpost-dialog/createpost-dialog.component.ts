import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../../../../services/post.service';
import { CreatePostDTO, Post } from '../../../../../models/post.model';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../../models/user.model';
import { finalize } from 'rxjs';
import { UserDetails } from '../../../../../models/auth.model';

@Component({
  selector: 'app-createpost-dialog',
  templateUrl: './createpost-dialog.component.html',
  styleUrl: './createpost-dialog.component.scss'
})
export class CreatepostDialogComponent {

  loading: boolean = false;

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

  constructor(public dialogRef: MatDialogRef<CreatepostDialogComponent>) { }

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

      this.loading = true;

      const { title, description, image } = this.createPostForm.getRawValue();

      const post: CreatePostDTO = {
        userId: this.user?.userId,
        date: new Date(),
        description: description,
        image: image,
        title: title
      }
      console.log(this.user);

      this.postSvc.createPost(post)
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe({
          next: (response) => {
            alert(response)
          },
          error: (error) => {
            console.log(error)
          }
        });

      this.close();

    } else {
      this.createPostForm.markAllAsTouched();
    }
  }

}
