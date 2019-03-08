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
  paginationProperty: string = 'page-item disabled';
  paginationLength: number;

  constructor(private pService: PokemonService) { }

  ngOnInit() {
    this.getPokemon();
  }

  listItemClicked(id) {
    console.log(id);
    console.log(this.pokemon.find(item => item.id === id).name);
  }

  getPokemon() {
    this.pService.getPokemon(1).subscribe(
      resp => {
        if (resp != null) {
          resp['results'].map(item => {
            this.pService.getPokemonByName(item.name).subscribe(
              resp2 => {
                if (resp2 != null) {
                  this.pokemon.push(resp2 as Pokemon);
                } else {
                  console.error('Error loading Pokemon. Null value loaded');
                }
              }
            );
          });
        } else {
          console.error('Error loading List. Null value loaded');
        }
      }
    );

  }
}
