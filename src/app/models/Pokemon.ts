export class Pokemon {
  id: number;
  sprites: object = {front_default: ''};
  name: string;
  types: Array<object> = [{type: {name: '', url: ''}}, {type: {name: '', url: ''}}];
}
