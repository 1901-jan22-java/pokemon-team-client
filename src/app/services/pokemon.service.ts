import { Pokemon } from './../models/Pokemon';
import { Type } from '../models/Type'
import { Advantages } from '../models/Advantages'
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

  public getPkmnTypes(pkmn: Pokemon): Type[]{

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

  public getDoubleDamageTo(teamTypes: Type[][]): Advantages[] {
    let result:Advantages[] = [];
    let existingTypes: string[] = [];

    for(let pkmn of teamTypes){
      for(let pkmnTypes of pkmn){
        for(let type of pkmnTypes['double_damage_to']){
          if(existingTypes.indexOf(type['name']) < 0){
            existingTypes.push(type['name']);
            result.push({
              name: type['name'],
              multiplier: 2
            });
          }
          else {
            result[existingTypes.indexOf(type['name'])]['multiplier'] *= 2;
          }
        }
      }
    }
    return result;
  }

  public getDoubleDamageFrom(teamTypes: Type[][]): Advantages[] {
    let result:Advantages[] = [];
    let existingTypes: string[] = [];

    for(let pkmn of teamTypes){
      for(let pkmnTypes of pkmn){
        for(let type of pkmnTypes['double_damage_from']){
          if(existingTypes.indexOf(type['name']) < 0){
            existingTypes.push(type['name']);
            result.push({
              name: type['name'],
              multiplier: 2
            });
          }
          else {
            result[existingTypes.indexOf(type['name'])]['multiplier'] *= 2;
          }
        }
      }
    }
    return result;
  }
  
  public getHalfDamageFrom(teamTypes: Type[][]): Advantages[] {
    let result:Advantages[] = [];
    let existingTypes: string[] = [];

    for(let pkmn of teamTypes){
      for(let pkmnTypes of pkmn){
        for(let type of pkmnTypes['half_damage_from']){
          if(existingTypes.indexOf(type['name']) < 0){
            existingTypes.push(type['name']);
            result.push({
              name: type['name'],
              multiplier: 0.5
            });
          }
          else {
            result[existingTypes.indexOf(type['name'])]['multiplier'] *= 0.5;
          }
        }
      }
    }
    return result;
  }

  public getHalfDamageTo(teamTypes: Type[][]): Advantages[] {
    let result:Advantages[] = [];
    let existingTypes: string[] = [];

    for(let pkmn of teamTypes){
      for(let pkmnTypes of pkmn){
        for(let type of pkmnTypes['half_damage_to']){
          if(existingTypes.indexOf(type['name']) < 0){
            existingTypes.push(type['name']);
            result.push({
              name: type['name'],
              multiplier: 0.5
            });
          }
          else {
            result[existingTypes.indexOf(type['name'])]['multiplier'] *= 0.5;
          }
        }
      }
    }
    return result;
  }

  public getNoDamageTo(teamTypes: Type[][]): Advantages[] {
    let result:Advantages[] = [];
    let existingTypes: string[] = [];

    for(let pkmn of teamTypes){
      for(let pkmnTypes of pkmn){
        for(let type of pkmnTypes['no_damage_to']){
          if(existingTypes.indexOf(type['name']) < 0){
            existingTypes.push(type['name']);
            result.push({
              name: type['name'],
              multiplier: 0
            });
          }
          else {
            result[existingTypes.indexOf(type['name'])]['multiplier'] = 0;
          }
        }
      }
    }
    return result;
  }

  public getNoDamageFrom(teamTypes: Type[][]): Advantages[] {
    let result:Advantages[] = [];
    let existingTypes: string[] = [];

    for(let pkmn of teamTypes){
      for(let pkmnTypes of pkmn){
        for(let type of pkmnTypes['no_damage_from']){
          if(existingTypes.indexOf(type['name']) < 0){
            existingTypes.push(type['name']);
            result.push({
              name: type['name'],
              multiplier: 0
            });
          }
          else {
            result[existingTypes.indexOf(type['name'])]['multiplier'] = 0;
          }
        }
      }
    }
    return result;
  }
  
  public damageTo(teamTypes: Type[][]) : Advantages[] {
    let teamSummary:Advantages[] = [];

    let doubleDamageTo = this.getDoubleDamageTo(teamTypes);
    let halfDamageTo   = this.getHalfDamageTo(teamTypes);
    let noDamageTo   = this.getNoDamageTo(teamTypes);
    
    for(let i = 0; i < doubleDamageTo.length; i++){
      for(let j = 0; j < halfDamageTo.length; j++){
        if((doubleDamageTo[i].name).indexOf(halfDamageTo[j].name) > -1){
          let number: number = doubleDamageTo[i].multiplier * halfDamageTo[j].multiplier;
          
          if(number != 1)
            teamSummary.push({name:doubleDamageTo[i].name, multiplier:number});
        }
      }
    }

    for(let type of noDamageTo){
      if(teamSummary.find(x => x.name === type.name) === undefined){
        teamSummary.push(type);
      }
      else {
        teamSummary.find(x => x.name === type.name).multiplier = type.multiplier;
      }
    }

    return teamSummary;
  }

  public damageFrom(teamTypes: Type[][]) : Advantages[] {
    let teamSummary:Advantages[] = [];

    let doubleDamageFrom = this.getDoubleDamageFrom(teamTypes);
    let halfDamageFrom   = this.getHalfDamageFrom(teamTypes);
    let noDamageFrom   = this.getNoDamageFrom(teamTypes);
    
    for(let i = 0; i < doubleDamageFrom.length; i++){
      for(let j = 0; j < halfDamageFrom.length; j++){
        if((doubleDamageFrom[i].name).indexOf(halfDamageFrom[j].name) > -1){
          let number: number = doubleDamageFrom[i].multiplier * halfDamageFrom[j].multiplier;
          
          if(number != 1)
            teamSummary.push({name:doubleDamageFrom[i].name, multiplier:number});
        }
      }
    }

    for(let type of noDamageFrom){
      if(teamSummary.find(x => x.name === type.name) === undefined){
        teamSummary.push(type);
      }
      else {
        teamSummary.find(x => x.name === type.name).multiplier = type.multiplier;
      }
    }

    return teamSummary;
  }

  public getPkmnObject(pkmn: Pokemon) {
    return {
      id: pkmn.id,
      PokemonNumber: pkmn.PokemonNumber,
      PokemonName: pkmn.PokemonName,
      PokemonType1: pkmn.types[0]['name'],
      PokemonType2: pkmn.types[1]['name']
    }
  }
}
