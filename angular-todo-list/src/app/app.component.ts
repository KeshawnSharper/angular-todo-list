import { Component,OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './AppState.model';
import { Add_Todo, Load_Todos,Login,Register,Delete_Todo} from './ngrx.actions';
import { Todo } from './ngrx.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FormControl, FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todo_list$: Observable<object>
  days: any
  years: any
  hours: any
  minutes: any
  form: FormGroup
  login: FormGroup
  register: FormGroup
  time: any
  logged:boolean
  user_id: any
  list: any
  open:boolean
  sound: any
  a : any
  logged_error:boolean
  register_error:boolean
  form_error:boolean
  constructor(private store: Store<{ Todo_List: any }>,private http:HttpClient ){
    store.pipe(select('Todo_List')).subscribe( data => {
      console.log(this.store)
      this.a = 5
      this.logged_error = false
      this.register_error = false
      this.form_error = false
      this.open = false
      this.sound = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");
      this.list = data.list.filter( data => data.isDate && data.isTime) 
      this.todo_list$ = data
      if(this.todo_list$.user_id !== null){
        this.open = true
      }
      if(this.list.length > 0 && this.open){
        this.sound.play()
        console.log(this.store)
      }
      this.todo_list$ = data})
    
  }
  
  loading$: Observable<Boolean>;
  ngOnInit(): void{
    this.user_id = localStorage.getItem('id')
    this.store.dispatch(new Load_Todos(Number(localStorage.getItem('id'))));



// sound.loop = true;

  
  console.log(this.list)
this.days = [...Array(31).keys()] 
this.years=  Array.from({length:10},(v,k)=>k+2020)
this.hours =  Array.from({length:12},(v,k)=>k+1)
this.minutes =  Array.from({length:4},(v,k)=>k * 15)
    // this.todo_list$ = this.store.source._value.Todo_List.list
    // this.loading$ = this.store.source._value.Todo_List.loading
    this.form = new FormGroup({
      month: new FormControl('',Validators.required),
      year:new FormControl('',Validators.required),
      day:new FormControl('',Validators.required),
      t_o_d: new FormControl('',Validators.required),
      minute: new FormControl('',Validators.required),
      message: new FormControl('',Validators.required),
      hour: new FormControl('',Validators.required)
    })

    this.login = new FormGroup({
      email: new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })

    this.register = new FormGroup({
      email: new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })
  }
  title = 'angular-todo-list';
 
  click(){
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes()
   
    if (this.form.value.hour === '' ){
      this.form.value.hour = 1
    }
    if (this.form.value.year === '' ){
      this.form.value.year = today.getFullYear()
    }
    if (this.form.value.minute=== '' ){
      this.form.value.minute = '00'
    }
    if (this.form.value.t_o_d === 'PM' && this.form.value.hour !== '12'){
      this.time = `${Number(this.form.value.hour)+ 12}:${this.form.value.minute}`
    }
    else if (this.form.value.t_o_d === 'AM' && this.form.value.hour !== '12'){
      this.time = `${this.form.value.hour}:${this.form.value.minute}`
    }
    else if (this.form.value.t_o_d === 'PM' && this.form.value.hour === '12'){
      this.time = `${this.form.value.hour}:${this.form.value.minute}`
    }
    else if (this.form.value.t_o_d === 'AM' && this.form.value.hour === '12'){
      this.time = `00:${this.form.value.minute}`
    }
   
    // else if (this.form.value.t_o_d === 'PM' && this.form.value.hour === '1' ){
    //   this.time = `13:${this.form.value.minute}`
    // }
    // 
    if (this.form.value.hour === '' || this.form.value.message === ''|| this.form.value.minute === ''
    || this.form.value.t_o_d === ''
    || this.form.value.day === ''
    || this.form.value.year === ''
    || this.form.value.month === ''
    ){
      this.form_error = true
    }
    else{ console.log(this.form.value.hour)
      console.log(this.store)
      this.store.dispatch(new Add_Todo({
      message: this.form.value.message,
      time: this.time,
      date:`${this.form.value.year}-${this.form.value.month}-${this.form.value.day}`,
      user_id: this.todo_list$.user_id,
  }
  )
 
  )
  this.form_error = false
}
   
  
  // this.todo_list$ = this.store.source._value.Todo_List.list
}
signIn(){
  if (this.login.value.email === ''|| this.login.value.password === ''){
    this.logged_error= true
  }else{
  this.store.dispatch(new Login(
    this.login.value
  ))
  this.store.dispatch(new Load_Todos(Number(localStorage.getItem('id'))));
  console.log(this.form.value.hour)
  console.log(this.store)
  }
}
signUp(){
  if (this.register.value.email === ''|| this.register.value.password === '' ){
    this.register_error = true
    console.log(this.store)
  }else{ 
    this.store.dispatch(new Register(
      this.register.value))
    this.store.dispatch(new Login(
      this.register.value
    ))
    console.log(this.store)
    console.log(this.todo_list$ )
}}
remove(todo){
  this.store.dispatch(new Delete_Todo(
    todo
  ))
  console.log(this.store)
  this.store.dispatch(new Load_Todos(Number(localStorage.getItem('id'))));
}
close(){
  this.open = false
  this.a = 0 
}
}



// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute, Router } from '@angular/router';
// import { tokenName } from '@angular/compiler';

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css']
// })
// export class SignUpComponent implements OnInit {
//   title = 'bookface';
//   loginName = localStorage.getItem('email');
//   login: FormGroup;
//   signUp: FormGroup;
//   signUpGender = localStorage.getItem('gender');
//   days:any
//   router:any
//   years:any
//   constructor(private http:HttpClient,private _router:Router)  
// {
  
//   this.days = [...Array(31).keys()]
//   this.years=  Array.from({length:50},(v,k)=>k+1970)
// }

//   ngOnInit() {
//     this.login = new FormGroup({
//       email: new FormControl(''),
//       password: new FormControl('')
//     });
//     this.signUp = new FormGroup({
//       first_name: new FormControl('',Validators.required),
//       last_name: new FormControl('',Validators.required),
//       email: new FormControl('',Validators.required),
//       password: new FormControl('',Validators.required),
//       month: new FormControl('',Validators.required),
//       year:new FormControl('',Validators.required),
//       day:new FormControl('',Validators.required),
//       gender: new FormControl('',Validators.required),
//       birthday:new FormControl('',Validators.required)
//     })


// }

// loginSubmit() {
  
//   this.loginName = this.login.value.username;
//   this.http.post('https://bookface-be.herokuapp.com/login',this.login.value).toPromise().then(res => {
    
//   console.log(res)
//   localStorage.setItem('id',res.id)
//   localStorage.setItem('token',res.token)
//   localStorage.setItem('name',res.name)
//   localStorage.setItem('picture',res.picture)
//   this._router.navigate(['/home'])
// }
//   )

// }
// signupSubmit() {
//   if (this.signUp.value.day  <= 9) {
//     this.signUp.value.day = "0" + this.signUp.value.day
//   }
//   this.signUp.value.birthday = this.signUp.value.month + '/' + this.signUp.value.day +  '/' +  this.signUp.value.year
//   localStorage.setItem('gender',this.signUp.value.gender);  
//   this.signUpGender = this.signUp.value.gender;
//   console.log(this.signUp.value)
  
//   this.http.post('https://bookface-be.herokuapp.com/register',{
//     first_name:this.signUp.value.first_name,
//     last_name:this.signUp.value.last_name,
//     email:this.signUp.value.email,
//     password:this.signUp.value.password,
//     gender:this.signUp.value.gender,
//     birthday:this.signUp.value.birthday
// }
//   ).toPromise().then(data => {
//     this._router.navigate(['/home'])
//     console.log(data)})

//     this.http.post('https://bookface-be.herokuapp.com/login',{ email:this.signUp.value.email,
//     password:this.signUp.value.password,}).toPromise().then(res => {
    
//   console.log(res)
//   localStorage.setItem('id',res.id)
//   localStorage.setItem('token',res.token)
//   localStorage.setItem('name',res.name)
//   localStorage.setItem('picture',res.picture)
//   this.http.post(`https://bookface-be.herokuapp.com/message`,{message:'Welcome to Bookface',sender_id:1,receiver_id:localStorage.getItem('id')}).toPromise().then(res => {
  
      
//     this.http.post('https://bookface-be.herokuapp.com/requests',{
//       user_id : localStorage.getItem('id'),
//       request_id : 1
//   }
//     ).toPromise().then(data => {
//       this._router.navigate(['/home'])
   
//   })
// }
//   )
 
// })
// }
// }
// "email": "kshrsdfeder@studentmba.org",
// "password": "Keyboys1",

// "email": "BarrySanders@gmail.com
// "password": "Sanders20",

// scary20@gmail.com


// import { Component } from '@angular/core';
// import { Store, select } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { increment, decrement, reset } from './ngrx.actions';
 
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   count$: Observable<any>;
 
//   constructor(private store: Store<{ count: any }>) {
//     store.pipe(select('count')).subscribe( data => this.count$ = data)
//   }
 
//   increment() {
//     this.store.dispatch(increment());
//     console.log(this.count$)
//   }
 
//   decrement() {
//     this.store.dispatch(decrement());
//   }
 
//   reset() {
//     this.store.dispatch(reset());
//   }
// }

