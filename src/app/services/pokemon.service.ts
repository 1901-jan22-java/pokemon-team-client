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
            .get<Pokemon[]>(`${this.url}/?offset=${(page - 1) * 964}&limit=964`, httpOptions);
            //.get<Pokemon[]>(`${this.url}/?offset=${(page - 1) * 10}&limit=10`);
  }

  public getPokemonByName(name: string) : Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}/${name}`);
  }

  public getPokemonById(id: number) : Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.url}/${id}`);
  }

  public getPkmnStrAndWeak(pkmn: Pokemon): Type[]{

    let urlString:string[] = pkmn.types.map(function(el){return el['type']['url']});
    let pkmnTypes: Type[] = [];
   
    for(let el of urlString){
      let data = this.http.get<any>(el);
      data.subscribe(resp => {
        if (resp != null) {
          let jsonObj:Type = JSON.parse(JSON.stringify(resp['damage_relations']));
          pkmnTypes.push(jsonObj);
        }
      })
    }
    
    return pkmnTypes;
  }

  public getDoubleDamageTo(teamTypes: Type[][]): string[] {
    let advantages:string[] = [];
    for(let pkmn of teamTypes){
      for(let pkmnTypes of pkmn){
        for(let type of pkmnTypes['double_damage_to']){
          if(advantages.indexOf(type['name']) < 0)
            advantages.push(type['name']);
        }
      }
    }
    return advantages;
  }

  public getDoubleDamageFrom(teamTypes: Type[][]): string[] {
    let weaknesses:string[] = [];
    
    for(let pkmn of teamTypes){
      for(let pkmnTypes of pkmn){
        for(let type of pkmnTypes['double_damage_from']){
          if(weaknesses.indexOf(type['name']) < 0)
          weaknesses.push(type['name']);
        }
      }
    }
    return weaknesses;
  }
  
  public getHalfDamageFrom(teamTypes: Type[][]): string[] {
    let halfDamageFrom:string[] = [];
    
    for(let pkmn of teamTypes){
      for(let pkmnTypes of pkmn){
        for(let type of pkmnTypes['half_damage_from']){
          if(halfDamageFrom.indexOf(type['name']) < 0)
          halfDamageFrom.push(type['name']);
        }
      }
    }
    return halfDamageFrom;
  }

  public getHalfDamageTo(teamTypes: Type[][]): string[] {
    let halfDamageTo:string[] = [];
    
    for(let pkmn of teamTypes){
      for(let pkmnTypes of pkmn){
        for(let type of pkmnTypes['half_damage_to']){
          if(halfDamageTo.indexOf(type['name']) < 0)
          halfDamageTo.push(type['name']);
        }
      }
    }
    return halfDamageTo;
  }

  public getNoDamageFrom(teamTypes: Type[][]): string[] {
    let noDamageFrom:string[] = [];
    
    for(let pkmn of teamTypes){
      for(let pkmnTypes of pkmn){
        for(let type of pkmnTypes['no_damage_from']){
          if(noDamageFrom.indexOf(type['name']) < 0)
          noDamageFrom.push(type['name']);
        }
      }
    }
    return noDamageFrom;
  }

}
