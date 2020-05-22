import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './ngrx.reducer'
import { TodoEffects } from './todos.effects'
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule ,
    StoreModule.forRoot({Todo_List : reducer  }),
    EffectsModule.forRoot([TodoEffects]),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

