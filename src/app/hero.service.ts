import { HEROES }     from './mock-heroes';  // An array of Hero objects
import { Injectable } from 'angular2/core';  // @Injectable() decorator

@Injectable()
export class HeroService {

  // Simulate the behavior of an ultra-fast, zero-latency server,
  // by returning an immediately resolved promise with our mock heroes as the result.
  getHeroes() {

    return Promise.resolve( HEROES );

  } // end getHeroes

  // Returns a promise.
  // Waits 2 seconds before resolving the promise with mock heroes.
  getHeroesSlowly() {

    return new Promise<Hero[]>( resolve => {

      setTimeout( () => resolve( HEROES ), 2000 );

    });

  } // end getHeroesSlowly

} // end HeroService
