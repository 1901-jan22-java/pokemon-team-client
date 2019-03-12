import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-user-team',
  templateUrl: './user-team.component.html',
  styleUrls: ['./user-team.component.css']
})
export class UserTeamComponent implements OnInit {

  public pkmn:Array<Pokemon> = [];
  public team = [1, 4, 7, 10, 13, 15];

  constructor(private pService : PokemonService) { }

  ngOnInit(){
    this.getPkmnTeam(this.team);
  }

  public getTeam() {
    console.log(this.pkmn);
  }

  public getTeamStrAndWeak() {
    for(let i = 0; i < this.pkmn.length; i++)
      console.log(this.pService.getPkmnStrAndWeak(this.pkmn[i]));
  }

  public getPkmnTeam(team: number[]) {
    for(let i = 0; i < team.length; i++){
      this.pService.getPokemonById(team[i])
        .subscribe(data => this.pkmn.push(data));
    }
  }
}
