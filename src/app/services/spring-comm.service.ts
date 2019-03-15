import { Pokemon } from '../models/Pokemon';
import { Type } from '../models/Type';
import { PkUser } from '../models/PkUsers';
import { Advantages } from '../models/Advantages';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'; 
import { PkmnTeam } from '../models/PkmnTeam';
import { PokemonService } from './pokemon.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class SpringCommService {

  url: string = "http://localhost:8080/pokemon-team";
  
  constructor(private http: HttpClient,
              private pService : PokemonService) { }

  public getUsers(): Observable<PkUser>{
    return this.http.get<PkUser>(`${this.url}/trainers`);
  }

  public getUserTeams(pokemonTrainer: PkUser): Observable<PkmnTeam> {
    return this.http.post<PkmnTeam>(`${this.url}/teams/getAll`, 
                pokemonTrainer, httpOptions);
  }

  
}
