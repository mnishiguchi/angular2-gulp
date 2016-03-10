# angular2-tour-of-heroes

Practicing setting up development environment with Angular2, Typescript and Gulp.

- [5 MIN QUICKSTART](https://angular.io/docs/ts/latest/quickstart.html)
- [QUICKSTART: ANGULAR2 WITH TYPESCRIPT AND GULP](http://blog.codeleak.pl/2016/03/quickstart-angular2-with-typescript-and.html)

==

## Troubleshooting
- IMPORTANT: Make sure that you check the latest official [docs](https://angular.io/docs/ts/latest/quickstart.html)

==

## File structure

```
project
|   .gitignore
|   bs-config.json  -> BrowserSync configuration
|   gulpfile.ts     -> Gulp in TypeScript
|   package.json    -> npm configuration / npm scripts
|   tsconfig.json   -> TypeScript configuration
|   typings.json    -> TypeScript typings definitions
|
\---src
|   |   index.html  -> Starting point for the application
|   |
|   \---app         -> Application modules
|          app.component.ts -> Main application component
|          app.html         -> Main application template
|          main.ts          -> Application bootstrap
\---dist
|   |   index.html
|   |
|   \---app   
```

==

## Some Commands
- The package.json file is the central location to define all the commands

```bash
npm run clean
npm run compile
npm run build
npm run server
npm run postinstall
npm run tslint
```







