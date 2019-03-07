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
  pokemon: Pokemon[] = [];

  constructor(private pService: PokemonService) { }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {


    this.pService.getPokemonById(1).subscribe(
      resp => {
        if (resp != null) {
          this.pokemon[0] = resp as Pokemon;
          console.log(this.pokemon[0]);
        } else {
          console.error('Error loading Users. Null value loaded');
        }
      }
    );

  }
}
