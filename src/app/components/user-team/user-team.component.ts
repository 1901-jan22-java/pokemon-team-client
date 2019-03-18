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
  public pkmnId = [1, 2, 3, 4, 5, 6];
  public teamTypes:Array<Type[]> = [];
  public strong = [];
  public weak = [];
  user = {
    username: "user",
    password: "pass"
  };

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

  public getPkmnTeamByTrainer(user) {
    this.pkmn = [];
    for(let i = 0; i < this.pkmn.length; i++){
      this.pService.getPokemonByTrainer(this.user)
        .subscribe(data => this.pkmn.push(data));
        console.log('being called');
    }
  }
  
  public registerPkmnTeam(user, pkmn){
    console.log(this.pService.addPkmn(user, pkmn));
  }

  public getTeamTypes() {
    this.teamTypes = [];
    for(let i = 0; i < this.pkmn.length; i++)
      this.teamTypes.push(this.pService.getPkmnTypes(this.pkmn[i]));
    console.log(this.teamTypes);
  }

  public getDamageTo(teamTypes: Type[][]){
    console.log(this.pService.damageTo(teamTypes));
    this.strong = this.pService.damageTo(teamTypes);
  }

  public getDamageFrom(teamTypes: Type[][]){
    console.log(this.pService.damageFrom(teamTypes));
    this.weak = this.pService.damageFrom(teamTypes);
  }

  public test(){
    this.getPkmnTeam(this.pkmnId);
  }
}
