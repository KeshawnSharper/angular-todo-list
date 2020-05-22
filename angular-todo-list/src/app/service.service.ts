import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './ngrx.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private URL = "https://angulartodolist-be.herokuapp.com"

  constructor(private http: HttpClient) { }

  getTodos(id: number) {
    
    return this.http.get<Array<Todo>>(`${this.URL}/users/${Number(localStorage.getItem('id'))}`)
      .pipe(
      delay(500)
    )
  }

  addTodo(Todo: Todo) {
    return this.http.post(`${this.URL}/todo`, Todo)
      .pipe(
        delay(500)
      )
  }
  login(user: object) {
    return this.http.post(`${this.URL}/login`, user)
      .pipe(
        delay(500)
      )
  }
  register(user: object) {
    return this.http.post(`${this.URL}/register`, user)
      .pipe(
        delay(500)
      )
  }

  deleteTodo(todo: object) {
    return this.http.delete(`${this.URL}/${todo.payload.id}`)
      .pipe(
        delay(500)
      )
  }
}