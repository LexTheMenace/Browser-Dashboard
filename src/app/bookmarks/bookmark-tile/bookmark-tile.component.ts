import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/shared/Bookmark.model';

@Component({
  selector: 'app-bookmark-tile',
  templateUrl: './bookmark-tile.component.html',
  styleUrls: ['./bookmark-tile.component.scss']
})
export class BookmarkTileComponent implements OnInit {
  @Input() bookmark!: Bookmark;

  iconSrc: string = '';
  faviconError = false;

  constructor() { }

  ngOnInit(): void {
    this.iconSrc = this.bookmark.url.origin + '/favicon.ico'
  }

}
