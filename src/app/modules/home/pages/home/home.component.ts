import { Component, OnInit, inject } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { ApiResponse } from '../../../../../models/getPostResponse.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private postSvc = inject(PostService);

  posts!: ApiResponse;

  ngOnInit(): void {
    this.postSvc.getPosts().subscribe({
      next: (response) => {
        this.posts = response;
        console.log(this.posts)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
