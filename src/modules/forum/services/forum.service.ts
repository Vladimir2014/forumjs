import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ForumModel } from '../models/forum-response';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }

  getAllForums(): Observable<Array<ForumModel>> {
    return this.http.get<Array<ForumModel>>('http://localhost:8081/api/forum');
  }

  getForum(id: number): Observable<ForumModel> {
    return this.http.get<ForumModel>('http://localhost:8081/api/forum/' + id);
  }

  createForum(forumModel: ForumModel): Observable<ForumModel> {
    return this.http.post<ForumModel>('http://localhost:8081/api/forum', forumModel);
  }
}