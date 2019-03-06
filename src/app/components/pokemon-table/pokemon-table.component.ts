import { Pokemon } from './../../models/Pokemon';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.css']
})
export class PokemonTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  pokemon: Pokemon = new Pokemon();

  constructor(private pService: PokemonService) { }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon(){
    this.pokemon.id = 1;
    console.log(`Id: ${this.pokemon.id}`);
    this.pService.getPokemon(this.pokemon).subscribe(
      resp => {
        if (resp != null) {
          this.pokemon = resp as Pokemon;
          console.log(resp);
        } else {
          console.error('Error loading Users. Null value loaded');
        }
      }
    );

  }
}
