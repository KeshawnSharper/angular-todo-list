import { Action } from '@ngrx/store';
import {Todo} from './ngrx.model';
import { HttpClient } from '@angular/common/http';

export enum Todo_Types {
    LOAD_TODOS = '[Todos] Load Todos',
    LOAD_TODOS_SUCCESS = '[Todos] Load Todos Success',
    LOAD_TODOS_FAILURE = '[Todos] Load Todos Failure',
    ADD_TODO = '[Todos] Add Todo',
    ADD_TODO_SUCCESS = '[Todos] Add Todo Success',
    ADD_TODO_FAILURE = '[Todos] Add Todo Failure',
    DELETE_TODO = '[Todos] Delete Todo',
    DELETE_TODO_SUCCESS = '[Todos] Delete Todo Success',
    DELETE_TODO_FAILURE = '[SHOPPING] Delete Todo Failure',
    REGISTER = '[Todos] Register',
    REGISTER_SUCCESS = '[Todos] Register Success',
    REGISTER_FAILURE = '[Todos] Register Failure',
    LOGIN = '[Todos] Login',
    LOGIN_SUCCESS = '[Todos] Login Success',
    LOGIN_FAILURE = '[Todos] Login Failure'
}
export class Load_Todos implements Action{
    readonly type = Todo_Types.LOAD_TODOS
    constructor (public id: number){
       
    }
   
  }
  export class Load_Todos_Success implements Action{
    readonly type = Todo_Types.LOAD_TODOS_SUCCESS
    constructor (public payload: Todo){
       
    }
   
  }
  export class Load_Todos_Failure implements Action{
    readonly type = Todo_Types.LOAD_TODOS_FAILURE
    constructor (public payload: Todo){
       
    }
   
  }
export class Add_Todo implements Action{
    readonly type = Todo_Types.ADD_TODO
    constructor (public payload: Todo){
       
    }
   
  }
  export class Add_Todo_Success implements Action{
    readonly type = Todo_Types.ADD_TODO_SUCCESS
    constructor (public payload: Todo){
       
    }
   
  }
  export class Add_Todo_Failure implements Action{
    readonly type = Todo_Types.ADD_TODO_FAILURE
    constructor (public payload: Todo){
       
    }
   
  }
export class Delete_Todo implements Action{
    readonly type = Todo_Types.DELETE_TODO
    constructor (public payload:object){

    }

}
export class Delete_Todo_Success implements Action{
    readonly type = Todo_Types.DELETE_TODO_SUCCESS
    constructor (public payload: number){

    }

}
export class Delete_Todo_Failure implements Action{
    readonly type = Todo_Types.DELETE_TODO_FAILURE
    constructor (public payload: Todo){

    }

}
export class Register implements Action{
    readonly type = Todo_Types.REGISTER
    constructor (public payload:object ){

    }

}
export class Register_Success implements Action{
    readonly type = Todo_Types.REGISTER_SUCCESS
    constructor (public payload: number){

    }

}
export class Register_Failure implements Action{
    readonly type = Todo_Types.REGISTER_FAILURE
    constructor (public payload:object ){

    }

}
export class Login implements Action{
    readonly type = Todo_Types.LOGIN
    constructor (public payload:object){

    }

}
export class Login_Success implements Action{
    readonly type = Todo_Types.LOGIN_SUCCESS
    constructor (public payload:object){

    }

}
export class Login_Failure implements Action{
    readonly type = Todo_Types.LOGIN_FAILURE
    constructor (public payload:object){

    }

}
export type Todo_Actions = Add_Todo 
| 
Delete_Todo| 
Load_Todos | 
Load_Todos_Success| 
Load_Todos_Failure| 
Add_Todo_Success| 
Add_Todo_Failure| 
Add_Todo| 
Delete_Todo| 
Delete_Todo_Success| 
Delete_Todo_Failure| 
Login_Failure|
Login_Success |
Login |
Register_Failure |
Register_Success |
Register
// import { createAction } from '@ngrx/store';

// export const increment = createAction('[Counter Component] Increment');
// export const decrement = createAction('[Counter Component] Decrement');
// export const reset = createAction('[Counter Component] Reset');