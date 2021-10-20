import { Component, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/shared/Bookmark.model';
import { BookmarkService } from 'src/app/shared/bookmark.service';

@Component({
  selector: 'app-manage-bookmarks',
  templateUrl: './manage-bookmarks.component.html',
  styleUrls: ['./manage-bookmarks.component.scss']
})
export class ManageBookmarksComponent implements OnInit {
  bookmarks: Bookmark[] = [];

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks()
  }

}
