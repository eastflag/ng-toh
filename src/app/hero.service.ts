import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {TodoVo} from './domain/todo.vo';
import {ResultVo} from './domain/result.vo';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  headers = new HttpHeaders();

  refresh = new Subject<number>(); // publisher: next() 함수로 데이터 발생
  refresh$ = this.refresh.asObservable(); // subscriber: subscribe()로 데이터 수신

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

  getPagedTodoList(start_index: number, page_size: number): Observable<ResultVo> {
    return this.http.get<ResultVo>(environment.HOST +
      `/api/paged_todo?start_index=${start_index}&page_size=${page_size}`);
  }

  addTodo(todo: TodoVo): Observable<TodoVo> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<TodoVo>(environment.HOST + '/api/todo', todo, {headers: headers});
  }

  modifyTodo(todo: TodoVo): Observable<TodoVo> {
    return this.http.put<TodoVo>(environment.HOST + '/api/todo', todo, {headers: this.headers});
  }

  removeTodo(todo_id: number): Observable<ResultVo> {
    return this.http.delete<ResultVo>(environment.HOST + `/api/todo?todo_id=${todo_id}`);
  }
}
