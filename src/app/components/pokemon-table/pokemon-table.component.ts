import { Pokemon } from './../../models/Pokemon';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.css']
})
export class PokemonTableComponent implements OnInit {
  //dtOptions: DataTables.Settings = {};
  pokemon: Pokemon[] = [];

  constructor(private pService: PokemonService) { }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    this.pService.getPokemon(1).subscribe(
      resp => {
        if (resp != null) {
          console.log(resp);
          this.pokemon[0] = resp as Pokemon;
        } else {
          console.error('Error loading Users. Null value loaded');
        }
      }
    );

  }
}
