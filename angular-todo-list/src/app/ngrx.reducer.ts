import {Todo}  from './ngrx.model'
import {Todo_Actions,Todo_Types}  from './ngrx.actions'
import { Add_Todo, DELETE_TODO} from './ngrx.actions';
import { HttpClient } from '@angular/common/http';



export interface TodoState {
  list: Todo[],
  loading: boolean,
  
  error: Error
  user_id: string
}
const initialState: TodoState= {
  list: [
  ],
  loading: false,
  error: undefined,
  user_id: null

};
 
export function reducer(state:TodoState = initialState, action:Todo_Actions) {
  switch (action.type){
case Todo_Types.LOAD_TODOS:
    return {
      ...state,
      loading: true
    }
  case Todo_Types.LOAD_TODOS_SUCCESS:
    return {
      ...state,
      list: action.payload,
      loading: false
    }
  
  case Todo_Types.LOAD_TODOS_FAILURE: 
    return {
      ...state,
      error: action.payload,
      loading: false
    }
  
  case Todo_Types.ADD_TODO:
    return {
      ...state,
      loading: true
    }
  case Todo_Types.ADD_TODO_SUCCESS:
    return {
      ...state,
      list: [...state.list, action.payload],
      loading: false
    };
  case Todo_Types.ADD_TODO_FAILURE:
    return {
      ...state,
      error: action.payload,
      loading: false
    };
  case Todo_Types.DELETE_TODO:
    return {
      ...state,
      loading: true
    };
  case Todo_Types.DELETE_TODO_SUCCESS:
    return {
      ...state,
      list: state.list.filter(item => item.id !== Number(action.payload)),
      loading: false
    };
  case Todo_Types.DELETE_TODO_FAILURE:
    return {
      ...state,
      error: action.payload,
      loading: false
    };
    case Todo_Types.REGISTER:
    return {
      ...state,
      loading: true
    };
    case Todo_Types.REGISTER_SUCCESS:
    return {
      ...state,
      user_id: action.payload
    };
    case Todo_Types.REGISTER_FAILURE:
    return {
      ...state,
      error: action.payload,
      loading: false
    };
    case Todo_Types.LOGIN:
    return {
      ...state,
      loading: true
    };
    case Todo_Types.LOGIN_SUCCESS:
    return {
      ...state,
      user_id: action.payload.id
    };
    case Todo_Types.LOGIN_FAILURE:
    return {
      ...state,
      error: action.payload,
      loading: false
    };

    default:
    return state
  }
}

// import { createReducer, on } from '@ngrx/store';
// import { increment, decrement, reset } from './ngrx.actions';
 
// export const initialState = {
//   list: [],
//   error:false,
//   loading: 0
// };
 
// const _counterReducer = createReducer(initialState,
//   on(increment, state => ({...state,list: [...state.list,1]})),
//   // on(decrement, state => state - 1),
//   // on(reset, state => 0),
// );
 
// export function counterReducer(state, action) {
//   return _counterReducer(state, action);
// }