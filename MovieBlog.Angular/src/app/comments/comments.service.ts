import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { commentDTO } from './comments.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  private apiURL = environment.apiURL + '/comments';

  getByMovieId(id: number): Observable<commentDTO[]> {
    return this.httpClient.get<commentDTO[]>(
      `${this.apiURL}/getbymovieid/${id}`
    );
  }

  createComment(
    text: string,
    parentId: number,
    movieId: number
  ): Observable<commentDTO> {
    return this.httpClient.post<commentDTO>(this.apiURL, {
      body: text,
      parentId,
      movieId,
    });
  }

  updateComment(id: number, text: string): Observable<commentDTO> {
    return this.httpClient.patch<commentDTO>(`${this.apiURL}/${id}`, {
      body: text,
    });
  }

  deleteComment(id: number): Observable<{}> {
    return this.httpClient.delete(`${this.apiURL}/${id}`);
  }
}
