import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/Pokemon';
import { PokemonTableComponent } from '../components/pokemon-table/pokemon-table.component';


@Pipe({ name: "filter" })
export class Filter implements PipeTransform {
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
              break;
            }
          }
        }
      });
    }
    
    return filteredList;
  }
}
