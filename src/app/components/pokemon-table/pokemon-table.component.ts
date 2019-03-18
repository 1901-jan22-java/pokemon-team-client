import { Pokemon } from './../../models/Pokemon';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { PkUser } from '../../models/PkUsers';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.css']
})


export class PokemonTableComponent implements OnInit {
  pokemon: Pokemon[] = [];
  userTeam: Pokemon[] = [];
  user = {
      username: "user",
      password: "pass"
  };
  
  paginationLength = 0;
  paginationPage = 1;

  constructor(private pService: PokemonService) { }

  ngOnInit() {
    this.getPokemon();
    document.body.classList.add('non-img');
  }

  sendTeamFunc(){
    this.pService.addPkmn(this.user, this.userTeam).subscribe(resp => {console.log(resp)});
  }

  listItemClicked(id: number) {
    if(this.userTeam.length < 6)
      this.userTeam.push(this.pokemon.find(item => item.id === id));
  }

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
