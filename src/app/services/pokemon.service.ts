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

  public getPokemon(page: number) {
    console.log(`page: ${page * 10}`);
    return this.http.get(`${this.url}/?offset=${(page - 1) * 10}&limit=10`, httpOptions);
  }

  public getPokemonByName(name: string) {
    return this.http.get(`${this.url}/${name}`, httpOptions);
  }

  public getPokemonById(id: number) {
    console.log(`service Id: ${id}`);
    return this.http.get(`${this.url}/${id}`, httpOptions);
  }
}
