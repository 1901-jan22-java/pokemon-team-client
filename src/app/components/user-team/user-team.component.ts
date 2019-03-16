import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';
import { Type } from '../../models/Type';
import { Advantages } from '../../models/Advantages';
import { PokemonService } from '../../services/pokemon.service';
import { SpringCommService } from '../../services/spring-comm.service';
import { PkUser } from '../../models/PkUsers';

@Component({
  selector: 'app-user-team',
  templateUrl: './user-team.component.html',
  styleUrls: ['./user-team.component.css']
})
export class UserTeamComponent implements OnInit {

  public pkmn:Array<Pokemon> = [];
  public teamTypes:Array<Type[]> = [];
  public team = [252, 4, 7, 10, 13, 94];
  public user = {
    id: 4,
    username: "user",
    password: "pass",
    firstName: "Kevin",
    lastName: "Ho"
  };
  /**
   * treecko    grass
   * charmander fire
   * squirtle   water
   * caterpie   bug
   * weedle     bug poison
   * gengar     ghost poison
   */

  constructor(private pService : PokemonService, 
              private sCommService: SpringCommService) { }

  ngOnInit(){
    this.getPkmnTeam(this.team);
  }

  public getTeam() {
    console.log(this.pkmn);
  }

  /**
   * gets back a pokemon team based on an array of IDs
   */
  public getPkmnTeam(team: number[]) {
    for(let i = 0; i < team.length; i++){
      this.pService.getPokemonById(team[i])
        .subscribe(data => this.pkmn.push(data));
    }
  }
  
  public registerPkmnTeam(user, pkmn){
    console.log(this.pService.addPkmn(user, pkmn));
  }

  public getTeamTypes() {
    for(let i = 0; i < this.pkmn.length; i++){
      this.teamTypes.push(this.pService.getPkmnTypes(this.pkmn[i]));
    }
  }

  public getDamageTo(teamTypes: Type[][]) : Advantages[]{
    console.log(this.pService.damageTo(teamTypes));
    return this.pService.damageTo(teamTypes);
  }

  public getDamageFrom(teamTypes: Type[][]) : Advantages[]{
    console.log(this.pService.damageFrom(teamTypes));
    return this.pService.damageFrom(teamTypes);
  }

  public test(){
    this.getTeamTypes();
 //   console.log(this.pkmn);

    this.registerPkmnTeam(this.user, this.pkmn);
  }
}
