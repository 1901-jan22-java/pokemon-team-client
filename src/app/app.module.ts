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
import { FilterByName } from './pipes/filterByName.pipe';
import { UserTeamComponent } from './components/user-team/user-team.component';
import { TeamComparatorComponent } from './components/team-comparator/team-comparator.component';
import { SearchUserTableComponent } from './components/search-user-table/search-user-table.component';


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
    FilterByName,
    UserTeamComponent,
    TeamComparatorComponent,
    SearchUserTableComponent
  
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
