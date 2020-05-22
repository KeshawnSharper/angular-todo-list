import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Todo_Types,Load_Todos, Login, Login_Success,Login_Failure,Register,Register_Success,Register_Failure,Todo_Actions, Load_Todos_Success, Load_Todos_Failure,Add_Todo,Add_Todo_Success,Add_Todo_Failure,Delete_Todo,Delete_Todo_Success,Delete_Todo_Failure} from './ngrx.actions'
import { of } from 'rxjs';
import { TodoService } from './service.service';

@Injectable()
export class TodoEffects {
//     @Effect()
// init$ = this.actions$.pipe(
//   ofType(INIT),
//   map(() => new Load_Todos_Success())
// );


  @Effect() loadTodo$ = this.actions$
    .pipe(
      ofType<Load_Todos>(Todo_Types.LOAD_TODOS),
      mergeMap(
        (id) => this.TodoService.getTodos(id)
          .pipe(
            map(data => {
                var today = new Date();
var time = today.getHours() + ":" + today.getMinutes()
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var month = Number(today.getMonth()+1)
var day = Number(today.getDate())


                data.forEach(x => {
                  console.log(parseInt(x.date.slice(5, 7)))
                  
                    if ( Number(x.date.slice(0, 4)) === Number(today.getFullYear())){
                        if (parseInt(x.date.slice(5, 7)) === month ){
                            if (Number(x.date.slice(-2)) === day ){
                                x.isDate = true
                                if ( Number(x.time.slice(0, 2)) === Number(today.getHours())){
                                    if (Number(x.time.slice(-2)) >=  Number(today.getMinutes())){
                                        x.isTime = true
                                        
                                    }
                                    else{
                                        x.isTime = false 
                                    }
                                }
                                else if (Number(x.time.slice(0, 2)) > day ){
                                    
                                    x.isTime = true
                                    var sound = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");
// 


                                }
                                else{
                                    x.isTime = false 
                                }
                            }
                            else if (Number(x.date.slice(-2)) > day ){
                                x.isDate = false
                                x.isTime = false
                            }
                            else{
                                x.isDate = true
                                x.isTime = true
                                var sound = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");
// 
sound.play()

                            }
                        }
                        else if (parseInt(x.date.slice(5, 7)) > month ){
                            x.isDate = false
                            x.isTime = false
                        }
                        else{
                         
                            x.isDate = true
                        x.isTime = true 
                        var sound = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");
// 
// sound.play()
// sound.loop = true;
                        }
                    }
                    else if (Number(x.date.slice(0, 4)) > Number(today.getFullYear())){
                        x.isDate = false
                        x.isTime = false
                    }
                    else{
                        x.isDate = true
                        x.isTime = true
                        var sound = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");
// 
sound.play()

                    }
                    data.forEach(x => {
                      // console.log(`${x.time} : ${Number(x.time.slice(0, 2))}`)
                      
                       if (Number(x.time.slice(0, 2)) > 12 && Number(x.time.slice(0, 2)) !== 0 ){
                        
                        var hour = Number(x.time.slice(0, 2)) - 12
                        
                        x.time = "0" + hour + ":" + x.time.slice(-2) + "pm"
                        
                      }
                      else if (isNaN(Number(x.time.slice(0, 2)))){
                        var hour = x.time[0]
                        
                        x.time = `0${hour}:${x.time.slice(-2)}am`
                        
                      }
                      else if (Number(x.time.slice(0, 2)) === 12 && x.time.slice(-2) !== "am" && x.time.slice(-2) !== "pm"){
                        console.log(x.time)
                        x.time =  `12:${x.time.slice(-2)}pm`
                        
                      }
                      else if (Number(x.time.slice(0, 2)) === 0){
                        
                        x.time = `12:${x.time.slice(-2)}am`
                        
                      }
                      
                        
                    })
                })
                data.forEach(x => {
                  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                  if (!isNaN(Number(x.date.slice(5, 7)))){
                    var month =x.date.slice(5, 7)
                    x.date = `${months[month - 1]} ${Math.abs(Number(x.date.slice(-2)))}, ${Number(x.date.slice(0, 4))}`
                  }
                  else{
                    x.date = `${months[x.date[5] - 1]} ${Math.abs(Number(x.date.slice(-2)))}, ${Number(x.date.slice(0, 4))}`
                  }
                })
              return new Load_Todos_Success(data)
            }),
            catchError(error => of(new Load_Todos_Failure(error)))
          )
      ),
  )
  @Effect() addTodo$ = this.actions$
    .pipe(
      ofType<Add_Todo>(Todo_Types.ADD_TODO),
      mergeMap(
        (data) => this.TodoService.addTodo(data.payload)
          .pipe(
            map(data => {
                
              return new Add_Todo_Success(data)
            }),
            catchError(error => of(new Add_Todo_Failure(error)))
          )
      ),
  )

  @Effect() deleteTodo$ = this.actions$
  .pipe(
    ofType<Delete_Todo>(Todo_Types.DELETE_TODO),
    mergeMap(
      (todo) => this.TodoService.deleteTodo(todo)
        .pipe(
          map(data => {
              console.log(data)
            return new Delete_Todo_Success(data)
          }),
          catchError(error => of(new Delete_Todo_Failure(error)))
        )
    ),
)
@Effect() login$ = this.actions$
.pipe(
  ofType<Login>(Todo_Types.LOGIN),
  mergeMap(
    (data) => this.TodoService.login(data.payload)
      .pipe(
        map(data => {
            localStorage.setItem('id',data.id)
            this.store.dispatch(new Load_Todos(Number(localStorage.getItem('id'))));
          return new Login_Success(data)
        }),
        catchError(error => of(new Login_Failure(error)))
      )
  ),
)
@Effect() register$ = this.actions$
.pipe(
  ofType<Register>(Todo_Types.REGISTER),
  mergeMap(
    (data) => this.TodoService.register(data.payload)
      .pipe(
        map(data => {
            
          return new Register_Success(data)
        }),
        catchError(error => of(new Register_Failure(error)))
      )
  ),
)

  constructor(
    private actions$: Actions,
    private TodoService: TodoService,
    public store : Store
  ) { }
}
