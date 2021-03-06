import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/Pokemon';
import { PokemonService } from '../services/pokemon.service';


@Pipe({ name: "filterByName" })
export class FilterByName implements PipeTransform {

  constructor(private pService: PokemonService) { }

  transform(itemList: Pokemon[], searchKeyword: string) {
    
    if (!itemList)
      return [];
    if (!searchKeyword)
      return itemList;

    let filteredList = [];

    if (itemList.length > 0) {
      searchKeyword = searchKeyword.toLowerCase();

      itemList.forEach(item => {
        let propValueList = Object.values(item);
        for(let i=0;i<propValueList.length;i++) {
          if (propValueList[i]) {
            if (propValueList[i].toString().toLowerCase().indexOf(searchKeyword) > -1) {
              filteredList.push(item);
              console.log(item.types.map(function(el){return el['type']['url']}));
              
              break;
            } else if(item.types.map(function(el){return el['type']['name'].includes(searchKeyword)})[0] ||
                      item.types.map(function(el){return el['type']['name'].includes(searchKeyword)})[1]){
              filteredList.push(item);
              break;
            }
            
          }
        }
      });
    }
    
    return filteredList;
  }
}
