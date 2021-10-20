import { getRandomUuid } from 'src/utils/randomIdGenerator';

export class Note {
  id: string;

  constructor(public title: string, public content: string) {
    this.id = getRandomUuid();
  }
}
