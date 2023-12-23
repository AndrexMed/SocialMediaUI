import { Component, OnInit, inject } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { Item } from '../../../../../models/getPostResponse.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private postSvc = inject(PostService);

  posts: Item[] = [];

  ngOnInit(): void {
    this.postSvc.getPosts().subscribe({
      next: (response) => {
        this.posts = response.data;
        console.log(this.posts)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
