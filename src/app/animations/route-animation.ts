import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const routeAnimation =

  trigger('routeAnimation', [

/*    transition('* => *', [
      query(':enter',
        [
          style({opacity: 0})
        ],
        {optional: true}
      ),
      query(':leave',
        [
          style({opacity: 1}),
          animate('0.4s', style({opacity: 0}))
        ],
        {optional: true}
      ),
      query(':enter',
        [
          style({opacity: 0}),
          animate('0.4s', style({opacity: 1}))
        ],
        {optional: true}
      )
    ]),*/

/*    transition('homePage => jqueryPage', [
      group([
        query(':enter', [
          style({ opacity: 0 }),
          animate('0.5s', style({ opacity: 1 })),
          animateChild()
        ]),
        query(':leave', [
          animate('0.5s', style({ opacity: 0 })),
          animateChild()
        ])
      ])
    ]),*/

    transition('* <=> *', [
      /* order */
      /* 1 */
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      /* 2 */
      group([  // block executes in parallel
        query(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translate(0, 0)' }),
          animate('0.5s ease-in-out', style({ transform: 'translate(0, 100%)' }))
        ], { optional: true }),
      ])
    ])

  ]);
