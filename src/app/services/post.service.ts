import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../models/getPostResponse.model';
import { checkToken } from '../interceptors/token.interceptor';
import { CreatePostDTO } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = `${environment.apiBaseURL}/api/Post`
  private http = inject(HttpClient);

  getPosts() {
    return this.http.get<ApiResponse>(`${this.apiURL}`, { context: checkToken() })
  }

  createPost(post: CreatePostDTO) {
    return this.http.post(`${this.apiURL}`, post, { context: checkToken() });
  }
}