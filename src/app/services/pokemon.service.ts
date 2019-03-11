import { Pokemon } from './../models/Pokemon';
import { Type } from '../models/Type'
import { Types } from '../models/Types'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'; 

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/jsom'})
};

@Injectable()
export class PokemonService {

  url = `https://pokeapi.co/api/v2/pokemon`;
  constructor(private http: HttpClient) { }

/*
  public getPokemon(page: number) : Observable<any>{
    return this.http
            .get<Pokemon[]>(`${this.url}/?offset=${(page - 1) * 100}&limit=100`, httpOptions);
  }
*/
  public getPokemon(page: number) : Observable<Pokemon[]>{
    return this.http
//            .get<Pokemon[]>(`${this.url}/?offset=${(page - 1) * 964}&limit=964`, httpOptions);
            .get<Pokemon[]>(`${this.url}/?offset=${(page - 1) * 10}&limit=10`);
  }

  public getPokemonByName(name: string) : Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}/${name}`);
  }

  public getPokemonById(id: number) : Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.url}/${id}`);
  }

  public getPkmnWeakness(pkmn: Pokemon): Observable<string[]>{
    let type1 = this.http.get<string[]>(`${pkmn.types.map(function(el){
                                                          console.log("INSIDE THE GET REQUEST " + el['type']['url']);
                                                          return el['type'];
                                                        })}`, httpOptions);

    let pkmnType: string[] = [];
    type1.subscribe(data => {
      pkmnType = data;
      console.log(data);
    });
    
      console.log("TYPE1 " + type1);
    console.log("PKMNTYPE " + pkmnType);

    return type1;
  }
}
