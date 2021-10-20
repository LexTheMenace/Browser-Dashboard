import { getRandomUuid } from "src/utils/randomIdGenerator";

export class Bookmark{
  id: string;
  url: URL

  constructor(public name: string, url: string){
    this.id = getRandomUuid()
    this.url = new URL(url)
    if(!this.name){
      const hostname = this.url.hostname.replace('www.', '').replace('.com', '')
      this.name = hostname
    }
  }
}
