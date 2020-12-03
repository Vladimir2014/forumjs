import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { CreatePostPayload } from '../models/create.post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array <Post>> {
    return this.http.get<Array<Post>>('http://localhost:8081/api/posts');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('http://localhost:8081/api/posts/', postPayload);
  }

  getPost(id: number): Observable<Post> {
    console.log('-----> ', id);
    return this.http.get<Post>('http://localhost:8081/api/posts/' + id);
  }

  getAllPostsForForum(forumId: number): Observable<Array <Post>> {
    return this.http.get<Array<Post>>('http://localhost:8081/api/posts/by-forum/' + forumId);
  }

  getAllPostsByUser(name: string): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8081/api/posts/by-user/' + name);
  }
}
