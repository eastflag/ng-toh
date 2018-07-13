import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {TodoVo} from './domain/todo.vo';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(environment.HOST + '/api/heroes');
  }

  getHero(hero_id: number): Observable<Hero> {
    return this.http.get<Hero>(environment.HOST + `/api/hero/${hero_id}`);
  }

  getTodoList(): Observable<TodoVo[]> {
    return this.http.get<TodoVo[]>(environment.HOST + '/api/todo');
  }

  addTodo(todo: TodoVo): Observable<TodoVo> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<TodoVo>(environment.HOST + '/api/todo', todo, {headers: headers});
  }

  modifyTodo(todo: TodoVo): Observable<TodoVo> {
    return this.http.put<TodoVo>(environment.HOST + '/api/todo', todo, {headers: this.headers});
  }
}
