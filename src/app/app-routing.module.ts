import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'pokemon-table', component: PokemonTableComponent}, 
    { path: 'register', component: RegisterComponent},
    { path: 'home', component: HomeComponent},
    { path: 'tutorial', component: TutorialComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
