import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum } from '../models/forum';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private cache: {};

  constructor(private http: HttpClient) { }

  getAllForums(): Observable<Array<Forum>> {
    return this.http.get<Array<Forum>>('http://localhost:8081/api/forum');
  }

  getForum(id: number): Observable<Forum> {
    if (this.cache[id]) return this.cache[id];

    let currentForum$ = this.http.get<Forum>('http://localhost:8081/api/forum/' + id);
    this.cache[id] = currentForum$;

    return currentForum$;
  }

  createForum(forum: Forum): Observable<Forum> {
    return this.http.post<Forum>('http://localhost:8081/api/forum', forum);
  }
}
