import { Types } from './Types';

export interface Pokemon {
  id: number;
  PokemonNumber: number;
  PokemonName: string;
  PokemonPicture: string;
  types: Types[];
}
