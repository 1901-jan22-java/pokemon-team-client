import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';
import { Type } from '../../models/Type';
import { Advantages } from '../../models/Advantages';
import { PokemonService } from '../../services/pokemon.service';
import { PkmnTeam } from '../../models/PkmnTeam';

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
    id: 22,
    username: "Ashketchum",
    password: "catchthemall"
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
    this.pService.getPokemonByTrainer(this.user)
    .subscribe(data => {
      console.log(data);
      for (let item of data) {
        console.log(item);
        let teamItem: PkmnTeam = item;
        let pokemonItem: Pokemon = {id: null, PokemonNumber: null, PokemonName: null, PokemonPicture: null, types: []};
        let teamArr = [teamItem.slot1, teamItem.slot2, teamItem.slot3, teamItem.slot4, teamItem.slot5, teamItem.slot6];
        for (let arrItem of teamArr) {
          console.log(arrItem);
          if (arrItem != null) {
            console.log(arrItem['pokemonNumber']);
            pokemonItem.PokemonNumber = +arrItem['pokemonNumber'];
            console.log(arrItem['pokemonName']);
            pokemonItem.PokemonName = arrItem['pokemonName'];
            console.log(arrItem['pokemonPicture']);
            pokemonItem.PokemonPicture = arrItem['pokemonPicture'];
            console.log(arrItem['pokemonType']);
            if (arrItem['pokemonType'] !== null) {
              pokemonItem.types.push(arrItem['pokemonType']);
            }
            console.log(arrItem['pokemonType2']);
            if (arrItem['pokemonType2'] !== null) {
              pokemonItem.types.push(arrItem['pokemonType2']);
            }
            this.pkmn.push(pokemonItem);
          }
        }
      }
    });
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
    this.getTeamTypes();

    console.log(this.pService.damageTo(teamTypes));
    this.strong = this.pService.damageTo(teamTypes);
  }

  public getDamageFrom(teamTypes: Type[][]){
    this.getTeamTypes();

    console.log(this.pService.damageFrom(teamTypes));
    this.weak = this.pService.damageFrom(teamTypes);
  }

  public test(){
    this.getPkmnTeam(this.pkmnId);
  }
}
