import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { UserTeamComponent } from './components/user-team/user-team.component';
import { TeamComparatorComponent } from './components/team-comparator/team-comparator.component';
import { SearchUserTableComponent } from './components/search-user-table/search-user-table.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'pokemon-table', component: PokemonTableComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'home', component: HomeComponent},
    { path: 'tutorial', component: TutorialComponent},
    { path: 'teams', component: UserTeamComponent},
    { path: 'team-comparator', component: TeamComparatorComponent},
    { path: 'search-user-table', component: SearchUserTableComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
