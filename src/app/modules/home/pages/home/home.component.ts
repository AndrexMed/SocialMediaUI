import { Component, OnInit, inject } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { Item } from '../../../../../models/getPostResponse.model';
import { Dialog } from '@angular/cdk/dialog';
import { PostDialogComponent } from '../../components/post-dialog/post-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private postSvc = inject(PostService);
  private dialog = inject(Dialog)

  posts: Item[] = [];

  ngOnInit(): void {
    this.postSvc.getPosts().subscribe({
      next: (response) => {
        this.posts = response.data;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  openDialog(event: Event, post: Item) {
    event.stopPropagation()
    const dialogRef = this.dialog.open(PostDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        post: post,
      },
    });
    dialogRef.closed.subscribe((output) => {
      console.log(output);
    });
  }

}
