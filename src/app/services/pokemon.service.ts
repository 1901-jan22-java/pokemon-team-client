import { Pokemon } from './../models/Pokemon';
import { Type } from '../models/Type'
import { Advantages } from '../models/Advantages'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs'; 
import { PkmnTeam } from '../models/PkmnTeam';
import { PkUser } from '../models/PkUsers';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PokemonService {

  url = `https://pokeapi.co/api/v2/pokemon`;

  constructor(private http: HttpClient) { }

  public getPokemon(page: number) : Observable<Pokemon[]>{
    return this.http
            .get<Pokemon[]>(`${this.url}/?offset=${(page - 1) * 964}&limit=964`, httpOptions);
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
    if(pkmn.types.length == 1)
      return {
        id: pkmn.id,
        PokemonNumber: pkmn.PokemonNumber,
        PokemonName: pkmn.PokemonName,
        PokemonType1: pkmn.types[0]['name']
      };
    else
      return {
        id: pkmn.id,
        PokemonNumber: pkmn.PokemonNumber,
        PokemonName: pkmn.PokemonName,
        PokemonType1: pkmn.types[0]['name'],
        PokemonType2: pkmn.types[1]['name']
      };
  }

  public addPkmn(user :PkUser, pkmn :Pokemon[]) : Observable<PkmnTeam>{ 

    let jsonstring = {
      trainer: { 
        id: user['id'], 
        username: user['username'] 
      },
      slot1: {
        pokemonNumber   : pkmn[0]['id'],
        pokemonName     : pkmn[0]['name'],
        pokemonPicture  : pkmn[0]['sprites']['front_default'],
        pokemonType     : pkmn[0]['types'][0]['type']['name']
      },
      slot2: {
        pokemonNumber   : pkmn[1]['id'],
        pokemonName     : pkmn[1]['name'],
        pokemonPicture  : pkmn[1]['sprites']['front_default'],
        pokemonType     : pkmn[1]['types'][0]['type']['name']
      },
      slot3: {
        pokemonNumber   : pkmn[2]['id'],
        pokemonName     : pkmn[2]['name'],
        pokemonPicture  : pkmn[2]['sprites']['front_default'],
        pokemonType     : pkmn[2]['types'][0]['type']['name']
      },
      slot4: {
        pokemonNumber   : pkmn[3]['id'],
        pokemonName     : pkmn[3]['name'],
        pokemonPicture  : pkmn[3]['sprites']['front_default'],
        pokemonType     : pkmn[3]['types'][0]['type']['name']
      },
      slot5: {
        pokemonNumber   : pkmn[4]['id'],
        pokemonName     : pkmn[4]['name'],
        pokemonPicture  : pkmn[4]['sprites']['front_default'],
        pokemonType     : pkmn[4]['types'][0]['type']['name']
      },
      slot6: {
        pokemonNumber   : pkmn[5]['id'],
        pokemonName     : pkmn[5]['name'],
        pokemonPicture  : pkmn[5]['sprites']['front_default'],
        pokemonType     : pkmn[5]['types'][0]['type']['name']
      }
    };

    try{
      jsonstring['slot1']['pokemonType2'] = pkmn[0]['types'][1]['type']['name'];
    } catch(error){
      jsonstring['slot1']['pokemonType2'] = null;
    }
    try{
      jsonstring['slot2']['pokemonType2'] = pkmn[1]['types'][1]['type']['name'];
    } catch(error){
      jsonstring['slot2']['pokemonType2'] = null;
    }
    try{
      jsonstring['slot3']['pokemonType2'] = pkmn[2]['types'][1]['type']['name'];
    } catch(error){
      jsonstring['slot3']['pokemonType2'] = null;
    }
    try{
      jsonstring['slot4']['pokemonType2'] = pkmn[3]['types'][1]['type']['name'];
    } catch(error){
      jsonstring['slot4']['pokemonType2'] = null;
    }
    try{
      jsonstring['slot5']['pokemonType2'] = pkmn[4]['types'][1]['type']['name'];
    } catch(error){
      jsonstring['slot5']['pokemonType2'] = null;
    }
    try{
      jsonstring['slot6']['pokemonType2'] = pkmn[5]['types'][1]['type']['name'];
    } catch(error){
      jsonstring['slot6']['pokemonType2'] = null;
    }

    console.log(jsonstring);
    console.log(JSON.stringify(jsonstring));
    return this.http.post<PkmnTeam>('http://localhost:8080/pokemon-team/teams', jsonstring, httpOptions);
  }
}
