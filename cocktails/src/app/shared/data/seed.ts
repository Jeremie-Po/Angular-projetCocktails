import {Cocktails} from './cocktails.data';

export async function seedData() {
  await fetch('https://restapi.fr/api/acocktails', {
    method: 'POST',
    body: JSON.stringify(Cocktails),
    headers: {
      'content-type': 'application/json',
    }
  });
}
