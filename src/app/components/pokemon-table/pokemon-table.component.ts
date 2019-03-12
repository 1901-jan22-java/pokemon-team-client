import { Pokemon } from './../../models/Pokemon';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.css']
})


export class PokemonTableComponent implements OnInit {
  pokemon: Pokemon[] = [];
  paginationLength = 0;
  paginationPage = 1;

  constructor(private pService: PokemonService) { }

  ngOnInit() {
    this.getPokemon();
  }

/*
  getPageinationLength(): Array<number> {
    const arr: number[] = [];
    const starting = (this.paginationPage - 1);
    const end = Math.floor(9 + starting - 1);
    if (starting < 4) {
      for (let i = 0; i < 9; i++) {
        arr.push(i + 1);
      }
    } else if (starting > this.paginationLength - 4) {
      for (let i = this.paginationLength - 9; i < this.paginationLength; i++) {
        arr.push(i + 1);
      }
    } else {
      for (let i = starting - 4; i < end - 3; i++) {
        arr.push(i + 1);
      }
    }
    return arr;
  }
*/
/*
  listItemClicked(id: number) {
    console.log(id);
    console.log(this.pokemon.find(item => item.id === id).name);
  }

  pageChange(page: number) {
    this.paginationPage = page;
    this.getPokemon();
  }

*/
  getPokemon() {
    this.pokemon = [];
    this.pService.getPokemon(this.paginationPage).subscribe(
      resp => {
        if (resp != null) {
          this.paginationLength = Math.ceil(resp['count'] as number / 5);
          resp['results'].map(item => {
            this.pService.getPokemonByName(item.name).subscribe(
              resp2 => {
                if (resp2 != null) {
                  this.pokemon.push(resp2 as Pokemon);
                  this.pokemon = this.pokemon.sort((a, b) => a.id - b.id);
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
