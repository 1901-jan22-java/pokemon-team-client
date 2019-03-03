// General imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componement imports
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { RegisterComponent } from './components/register/register.component';

// Services imports
import { LoginService } from './services/login.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PokemonTableComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
