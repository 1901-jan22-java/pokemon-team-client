import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';
import { Type } from 'src/app/models/Type';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-user-team',
  templateUrl: './user-team.component.html',
  styleUrls: ['./user-team.component.css']
})
export class UserTeamComponent implements OnInit {

  public pkmn:Array<Pokemon> = [];
  public teamTypes:Array<Type[]> = [];
  public team = [1, 4, 7, 10, 13, 94];
  /**
   * bulbasaur  grass poison
   * charmander fire
   * squirtle   water
   * caterpie   bug
   * weedle     bug poison
   * gengar     ghost poison
   */

  constructor(private pService : PokemonService) { }

  ngOnInit(){
    this.getPkmnTeam(this.team);
  }

  public getTeam() {
    console.log(this.pkmn);
  }

  public getTeamStrAndWeak() {
    for(let i = 0; i < this.pkmn.length; i++){
      this.teamTypes.push(this.pService.getPkmnStrAndWeak(this.pkmn[i]));
    }
    this.pService.getNoDamageFrom(this.teamTypes);
  }

  public getPkmnTeam(team: number[]) {
    for(let i = 0; i < team.length; i++){
      this.pService.getPokemonById(team[i])
        .subscribe(data => this.pkmn.push(data));
    }
  }
}
