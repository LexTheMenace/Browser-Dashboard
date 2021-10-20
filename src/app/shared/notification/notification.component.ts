import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotificationData } from './notification-data.model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('notificationAnim', [
        transition(':enter', [
          style({
            opacity: 0,
            transform: 'translateX(100px)'
        }),
          animate("250ms 125ms ease-out")
        ]),
        transition(':leave', [
          animate(150,
            style({
              opacity: 0,
             transform: 'translateX(-1000px)'
            })
        )
        ])
      ]
    )
  ]
})
export class NotificationComponent implements OnInit {
  notification: NotificationData[] = [];
  timeout: any = null;
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification.subscribe((notification: NotificationData) => {
      this.notification = Array(notification);
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.notification = []
      }, notification.duration);
    });
  };
};
