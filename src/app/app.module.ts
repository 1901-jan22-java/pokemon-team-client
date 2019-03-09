// General imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

// Componement imports
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Services imports
import { LoginService } from './services/login.service';
import { PokemonService } from './services/pokemon.service';
import { HomeComponent } from './components/home/home.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

// Pipes
import { Filter } from './pipes/filter.pipe';

//Observable

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PokemonTableComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    TutorialComponent,
    Filter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    LoginService,
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
