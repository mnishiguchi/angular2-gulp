import {
  Component,
  OnInit // OnInit interface
} from 'angular2/core';
// import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { Hero }                from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService }         from './hero.service';


/**
 * Defines the AppComponent, which is the root component.
 */
@Component({

  selector:    'app',
  templateUrl: 'app/app.component.html',
  styleUrls:   [ 'app/app.component.css' ],

  // Register child components.
  // A browser ignores HTML tags and attributes that it doesn't recognize. So does Angular.
  directives:  [ HeroDetailComponent ],

  // Register providers.
  // The providers array tells Angular to create a fresh instance of the
  // each service when it creates a new AppComponent
  providers:   [ HeroService ]

})
export class AppComponent implements OnInit {

  // Expose the public properties for binding.
  public title  = 'Tour of Heroes';
  public heroes: Hero[];      // Array of Hero objects.
  public selectedHero: Hero;  // Currently selected Hero object.

  // Constructor.
  // Inject a HeroService object.
  constructor( private _heroService: HeroService ) { }

  // Keep complex logic out of the constructor.
  ngOnInit() {

    this.getHeroes();

  }


  // ---
  // PRIVATE METHODS
  // ---


  getHeroes() {

    this._heroService
      .getHeroesSlowly()
      .then( heroes => {

        this.heroes = heroes;

      });

  } // end getHeroes


  // ---
  // PUBLIC METHODS
  // ---


  onSelect( hero: Hero ) {

    this.selectedHero = hero;

  }


  isSelected( hero: Hero ) {

    return hero === this.selectedHero;

  }


} // end AppComponent
