System.register(['angular2/core', './hero-detail.component', './hero.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, hero_detail_component_1, hero_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hero_detail_component_1_1) {
                hero_detail_component_1 = hero_detail_component_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            }],
        execute: function() {
            /**
             * Defines the AppComponent, which is the root component.
             */
            AppComponent = (function () {
                // Constructor.
                // Inject a HeroService object.
                function AppComponent(_heroService) {
                    this._heroService = _heroService;
                    // Expose the public properties for binding.
                    this.title = 'Tour of Heroes';
                }
                // Keep complex logic out of the constructor.
                AppComponent.prototype.ngOnInit = function () {
                    this.getHeroes();
                };
                // ---
                // PRIVATE METHODS
                // ---
                AppComponent.prototype.getHeroes = function () {
                    var _this = this;
                    this._heroService
                        .getHeroesSlowly()
                        .then(function (heroes) {
                        _this.heroes = heroes;
                    });
                }; // end getHeroes
                // ---
                // PUBLIC METHODS
                // ---
                AppComponent.prototype.onSelect = function (hero) {
                    this.selectedHero = hero;
                };
                AppComponent.prototype.isSelected = function (hero) {
                    return hero === this.selectedHero;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css'],
                        // Register child components.
                        // A browser ignores HTML tags and attributes that it doesn't recognize. So does Angular.
                        directives: [hero_detail_component_1.HeroDetailComponent],
                        // Register providers.
                        // The providers array tells Angular to create a fresh instance of the
                        // each service when it creates a new AppComponent
                        providers: [hero_service_1.HeroService]
                    }), 
                    __metadata('design:paramtypes', [hero_service_1.HeroService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent); // end AppComponent
        }
    }
});

//# sourceMappingURL=app.component.js.map
