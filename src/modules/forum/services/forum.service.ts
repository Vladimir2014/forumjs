import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Forum } from '../models/forum';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  currentForum: Observable<Forum> = new Observable;

  constructor(private http: HttpClient) { }

  getAllForums(): Observable<Array<Forum>> {
    return this.http.get<Array<Forum>>('http://localhost:8081/api/forum');
  }

  getForum(id: number): Observable<Forum> {
    return this.http.get<Forum>('http://localhost:8081/api/forum/' + id);
  }

  createForum(forum: Forum): Observable<Forum> {
    this.currentForum = this.http.post<Forum>('http://localhost:8081/api/forum', forum);
    return this.currentForum;
  }

  getCurrentForum() {
    return this.currentForum;
  }
}
