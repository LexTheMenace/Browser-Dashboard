import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Bookmark } from 'src/app/shared/Bookmark.model';
import { BookmarkService } from 'src/app/shared/bookmark.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {
  @Input() bookmark!: Bookmark;

  constructor(private bookmarkService: BookmarkService, private route: ActivatedRoute, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        const idParam = paramMap.get('id');

        if(idParam){
          const bookmark = this.bookmarkService.getBookmark(idParam);
          if(bookmark){
            this.bookmark = bookmark;
          }
        }
      }
    )
  }
  onFormSubmit(form: NgForm){
    const { name, url} = form.value
    this.bookmarkService.updateBookmark(this.bookmark.id, {name, url: new URL(url)});
    this.router.navigateByUrl('bookmarks/manage');
    this.notificationService.show('Bookmark was updated successfully!')
  }

  deleteBookmark(){
    this.bookmarkService.deleteBookmark(this.bookmark.id);
    this.router.navigateByUrl('/bookmarks/manage')
  }
}
