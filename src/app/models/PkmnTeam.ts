import { PkUser } from './PkUsers';
import { Pokemon } from './Pokemon';


export class PkmnTeam {
    id: number;
    trainer: PkUser;
    slot1: Pokemon;
    slot2: Pokemon;
    slot3: Pokemon;
    slot4: Pokemon;
    slot5: Pokemon;
    slot6: Pokemon;
}