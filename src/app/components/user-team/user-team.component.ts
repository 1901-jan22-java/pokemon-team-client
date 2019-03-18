import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';
import { Type } from '../../models/Type';
import { Advantages } from '../../models/Advantages';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-user-team',
  templateUrl: './user-team.component.html',
  styleUrls: ['./user-team.component.css']
})
export class UserTeamComponent implements OnInit {

  public pkmn:Array<Pokemon> = [];
  public teamTypes:Array<Type[]> = [];

  constructor(private pService : PokemonService) { }

  ngOnInit(){
    document.body.classList.add('team-img');
  }

  public getTeam() {
    console.log(this.pkmn);
  }

  /**
   * gets back a pokemon team based on an array of IDs
   */
  public getPkmnTeam(team: number[]) {
    this.pkmn = [];
    for(let i = 0; i < team.length; i++){
      this.pService.getPokemonById(team[i])
        .subscribe(data => this.pkmn.push(data));
    }
  }
  
  public registerPkmnTeam(user, pkmn){
    console.log(this.pService.addPkmn(user, pkmn));
  }

  public getTeamTypes() {
    for(let i = 0; i < this.pkmn.length; i++)
      this.teamTypes.push(this.pService.getPkmnTypes(this.pkmn[i]));
    console.log(this.teamTypes);
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
