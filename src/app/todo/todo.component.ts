import { Component, OnInit } from '@angular/core';
import {TodoVo} from '../domain/todo.vo';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoList: TodoVo[];
  newTodo = new TodoVo();
  tempTodoList: Map<number, TodoVo> = new Map<number, TodoVo>();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList() {
    this.heroService.getTodoList()
      .subscribe(body => {
        console.log('getTodoList', body);
        this.todoList = body;
      });
  }

  addTodo() {
    this.heroService.addTodo(this.newTodo)
      .subscribe(body => {
        console.log(body);
        this.todoList.unshift(body);
      });
  }

  /**
   * 수정 템플릿으로 전환
   * @param {TodoVo} item
   */
  save(item: TodoVo) {
    item.isEdited = true;

    // 새로운 객체를 생성하고 값을 복사하는 deep copy를 수행
    let tempTodo = new TodoVo();
    Object.assign(tempTodo, item);
    console.log(tempTodo);
    this.tempTodoList.set(item.todo_id, tempTodo);
  }

  /**
   * 일반 템플릿으로 전환
   * @param {TodoVo} item
   */
  restore(item: TodoVo) {
    item.isEdited = false;

    let tempTodo = this.tempTodoList.get(item.todo_id);
    // 기존에 저장된 isEdited는 true이기 때문에 false를 다시 추가하였다.
    Object.assign(item, tempTodo, {isEdited: false});
    console.log(item);
  }

  remove(item: TodoVo) {

  }

  modify(item: TodoVo) {

  }
}
