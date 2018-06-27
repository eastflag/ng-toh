import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(environment.HOST + '/api/heroes');
  }

  getHero(hero_id: number): Observable<Hero> {
    return this.http.get<Hero>(environment.HOST + `/api/hero/${hero_id}`);
  }
}
