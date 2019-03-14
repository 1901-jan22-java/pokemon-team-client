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
  public team = [252, 4, 7, 10, 13, 94];
  /**
   * treecko    grass
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

  public getTeamTypes() {
    for(let i = 0; i < this.pkmn.length; i++){
      this.teamTypes.push(this.pService.getPkmnTypes(this.pkmn[i]));
    }

    this.pService.damageTo(this.teamTypes);
    this.pService.damageFrom(this.teamTypes);
  }

  public getPkmnTeam(team: number[]) {
    for(let i = 0; i < team.length; i++){
      this.pService.getPokemonById(team[i])
        .subscribe(data => this.pkmn.push(data));
    }
  }

}
