import { getRandomUuid } from "src/utils/randomIdGenerator";

export class Todo {
  id: string;
  completed: boolean;

  constructor(public text: string){
    this.id = getRandomUuid();
    this.completed = false

  }
}
