import { Types } from './Types';

export interface Pokemon {
  id: number;
  sprites: object;
  name: string;
  types: Types[];
}
