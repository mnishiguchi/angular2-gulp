import { Component } from 'angular2/core';

import { Hero } from './hero';

@Component({

  selector:    'hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls:   [ 'app/hero-detail.component.css' ],

  // Declare target properties.
  inputs:       [ 'hero' ]

})
export class HeroDetailComponent {

  public hero: Hero;

} // end HeroDetailComponent
