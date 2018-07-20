import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Hero} from '../hero';
import {environment} from '../../environments/environment';
import {ResultVo} from '../domain/result.vo';

@Injectable()
export class AdminService {
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  addHero(hero: Hero): Observable<ResultVo> {
    return this.http.post<ResultVo>(`${environment.HOST}/api/hero`, hero, {headers: this.headers});
  }

  imageUpload(formData: FormData): Observable<ResultVo> {
    let headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data'); //브라우저가 자동 생성함.
    headers.append('Accept', 'application/json');

    return this.http.post<ResultVo>(`${environment.HOST}/api/file`, formData, {headers: headers});
  }

  removeHero(hero_id: number): Observable<ResultVo> {
    return this.http.delete<ResultVo>(`${environment.HOST}/api/hero?hero_id=${hero_id}`);
  }

  modifyHero(hero: Hero): Observable<ResultVo> {
    return this.http.post<ResultVo>(`${environment.HOST}/api/hero`, hero, {headers: this.headers});
  }
}
