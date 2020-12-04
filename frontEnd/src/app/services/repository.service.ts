import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface Response {
  status: string;
  message: string;
  token?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  saveRepository(repository) {
    return this.http.post<Response>(`${this.auth.baseLink}/repository`, repository);
  }

  getApiRepositories() {
    return this.http.get<Response>(`${this.auth.baseLink}/repository`);
  }
  getApiRepository(id: string) {
    return this.http.get<Response>(`${this.auth.baseLink}/repository/${id}`);
  }
}
