import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';
import { Type } from 'src/app/models/Type';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Advantages } from 'src/app/models/Advantages';

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
    for(let i = 0; i < this.pkmn.length; i++)
      this.teamTypes.push(this.pService.getPkmnTypes(this.pkmn[i]));
    console.log(this.teamTypes);
  }

  public getPkmnTeam(team: number[]) {
    for(let i = 0; i < team.length; i++)
      this.pService.getPokemonById(team[i])
        .subscribe(data => this.pkmn.push(data));
  }

  public getDamageTo(teamTypes: Type[][]): Advantages[]{
    console.log(this.pService.damageTo(teamTypes));
    return this.pService.damageTo(teamTypes);
  }

  public getDamageFrom(teamTypes: Type[][]): Advantages[]{
    console.log(this.pService.damageFrom(teamTypes));
    return this.pService.damageFrom(teamTypes);
  }
}
