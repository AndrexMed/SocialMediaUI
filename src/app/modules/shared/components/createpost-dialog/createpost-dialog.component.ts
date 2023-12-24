import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../../../../services/post.service';
import { Post } from '../../../../../models/post.model';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../../models/user.model';

@Component({
  selector: 'app-createpost-dialog',
  templateUrl: './createpost-dialog.component.html',
  styleUrl: './createpost-dialog.component.scss'
})
export class CreatepostDialogComponent {

  loading: boolean = false;

  date = new Date();

  user!: User | null;

  private formBuilder = inject(FormBuilder);
  private postSvc = inject(PostService);
  private authSvc = inject(AuthService);

  ngOnInit(): void {
    this.authSvc.user$.subscribe(user => {
      this.user = user
    });
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

      const post: Post = {
        userId: this.user?.id,
        date: new Date(),
        description: description,
        image: image,
        title: title
      }
      console.log(this.user);

      this.postSvc.createPost(post).subscribe({
        next: (response) => {
          alert(response)
        },
        error: (error) => {
          console.log(error)
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });

      this.close();

    } else {
      this.createPostForm.markAllAsTouched();
    }
  }

}
