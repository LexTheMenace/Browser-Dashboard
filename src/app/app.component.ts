import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
const queryStyle = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflowY: 'none',
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden',
        }),

        query(
          ':enter, :leave',
          [
          queryStyle
          ],
          { optional: true }
        ),
        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(-80px)',
                })
              ),
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              style({
                transform: 'translateX(80px)',
                opacity: 0,
              }),
              animate(
                '250ms 120ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden',
        }),

        query(
          ':enter, :leave',
          [
            queryStyle
          ],
          { optional: true }
        ),
        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(80px)',
                })
              ),
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              style({
                transform: 'translateX(-80px)',
                opacity: 0,
              }),
              animate(
                '250ms 120ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
      transition('* => secondary', [
        style({
          position: 'relative',
          // overflow: 'hidden',
        }),

        query(
          ':enter, :leave',
          [
            queryStyle
          ],
          { optional: true }
        ),
        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({
                  opacity: 0,
                  transform: 'scale(0.8)'
                })
              ),
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              style({
                transform: 'scale(1.2)',
                opacity: 0,
              }),
              animate(
                '250ms 120ms ease-out',
                style({
                  opacity: 1,
                  transform: 'scale(1)',
                  overflow: 'visible'
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
      transition('secondary => *', [
        style({
          position: 'relative',
        }),

        query(
          ':enter, :leave',
          [
           queryStyle
          ],
          { optional: true }
        ),
        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease-in',
                style({
                  opacity: 0,
                  transform: 'scale(1.2)'
                })
              ),
            ],
            { optional: true }
          ),

          query(
            ':enter',
            [
              style({
                transform: 'scale(.8)',
                opacity: 0,
              }),
              animate(
                '250ms 120ms ease-out',
                style({
                  opacity: 1,
                  transform: 'scale(1)',
                  overflow: 'visible'
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ])
    ]),
    trigger('bgAnim',[
      transition(':leave', [
        animate(1000, style({
          opacity: 0
        }))
      ]),
      transition(':enter', [
        style({
          opacity: 0

        }),
        animate(1000, style({
          opacity: 1
        }))
      ])
    ]),
    trigger('fadeAnim', [
      transition(':enter', [
        style({
          opacity: 0

        }),
        animate(1000, style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1

        }),
        animate(1000, style({
          opacity: 0
        }))
      ])
    ])
  ],
})
export class AppComponent implements OnInit {
  currentTime!: Observable<Date>;
  bgSrc: string[] = ['https://source.unsplash.com/1920x1080/?nature'];
  loadingBgImage = false;

  ngOnInit() {
   this.currentTime =  timer(0,1000).pipe(
     map(() => new Date())
   )
  }

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tabNum'];
      if(!tab) return 'secondary';
      return tab;
    }
  }

  async changeBgImage(): Promise<void> {
    this.loadingBgImage = true;
    const res = await fetch('https://source.unsplash.com/1920x1080/?nature', {
      method: 'HEAD',
    });
    const bgExists = this.bgSrc.includes(res.url);

    if (bgExists) return this.changeBgImage();

    this.bgSrc.push(res.url);
  }
  onBGLoad() {
    if(this.bgSrc.length > 1){
      this.bgSrc.splice(0,1)
    }
    this.loadingBgImage = false;
  }
}
