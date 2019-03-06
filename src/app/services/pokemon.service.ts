import { Pokemon } from './../models/Pokemon';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/jsom'})
};

@Injectable()
export class PokemonService {

  url = `https://pokeapi.co/api/v2/pokemon`;
  constructor(private http: HttpClient) { }

  public getPokemon(pokemon: Pokemon) {
    console.log(`service Id: ${pokemon.id}`);
    return this.http.get(`${this.url}/${pokemon.id}`, httpOptions);
  }
}
