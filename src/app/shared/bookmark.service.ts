import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Bookmark } from './Bookmark.model';
import { NotificationService } from './notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks: Bookmark[] = [
    new Bookmark('Wikipedia', 'https://www.wikipedia.org/'),
    new Bookmark('Google', 'https://www.google.com/'),
    new Bookmark('Reddit', 'https://www.reddit.com/'),

  ];
  storageSub: Subscription;


  constructor(private notificationService: NotificationService) {
    this.loadState();


    this.storageSub = fromEvent<StorageEvent>(window, 'storage').pipe(
      filter((event): event is StorageEvent => event instanceof StorageEvent)
    ).subscribe((event: StorageEvent) => {
      console.log('Storage Event Fired!');
      console.log(event);
      if(event.key === 'bookmarks') this.loadState();
    });
  };

  getBookmarks(){
    return this.bookmarks;
  }
  getBookmark(id: string){
    return this.bookmarks.find(b => b.id === id);
  }
  addBookmark(bookmark: Bookmark){
    this.bookmarks.push(bookmark)
    this.notificationService.show(`Bookmark: '${bookmark.name}' was added successfully!`)
    this.saveState()
  }
  updateBookmark(id: string, updatedFields: Partial<Bookmark>){
    const bookmark = this.getBookmark(id);
    if(!updatedFields.name) delete updatedFields.name
    console.log(updatedFields);

    Object.assign(bookmark, updatedFields);
    this.saveState();
  }
  deleteBookmark(id: string){
    const index = this.bookmarks.findIndex(b => b.id === id)
    if(index === -1) return;
    const removedBookmark = this.bookmarks.splice(index,1)[0];
    this.saveState();
    this.notificationService.show(`Bookmark: '${removedBookmark.name}' was removed!`,2000)
  }
  saveState(){
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
  }
  loadState(){
    try{
    const unparsedBookmarksInstorage = localStorage.getItem('bookmarks')

    if(!unparsedBookmarksInstorage) return;
    const bookmarksInstorage = JSON.parse(unparsedBookmarksInstorage, (key,value) => {
      if(key == 'url') return new URL(value)
      return value
    });

    this.bookmarks.length = 0; // Clear bookmarks array while keeping the reference
    this.bookmarks.push(...bookmarksInstorage);

  }catch(e){
      console.log('There was an error retrieving the bookmarks from localstorage');
      console.log(e);
    }
  }
}
