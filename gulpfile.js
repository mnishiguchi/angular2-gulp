"use strict";

var gulp       = require( "gulp" );
var del        = require( "del" );
var tsc        = require( "gulp-typescript" );
var sourcemaps = require( 'gulp-sourcemaps' );
var tsProject  = tsc.createProject( "tsconfig.json" );
var tslint     = require( 'gulp-tslint' );


/**
 * Remove build directory.
 */
gulp.task( 'clean', function( cb ) {
    return del( [ "build" ], cb );
});


/**
 * Lint all custom TypeScript files.
 */
gulp.task( 'tslint', function() {
  return gulp.src( 'src/**/*.ts' )
    .pipe( tslint() )
    .pipe( tslint.report( "prose", {
      summarizeFailureOutput: true
    }))
});


/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task( "compile", function() {
  var tsResult = gulp.src( "src/**/*.ts" )
    .pipe( sourcemaps.init() )
    .pipe( tsc( tsProject ) );
  return tsResult.js
    .pipe( sourcemaps.write( "." ) )
    .pipe( gulp.dest( "build" ) );
});


/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task( "resources", function() {
  return gulp
    .src([ "src/**/*", "!**/*.ts" ])
    .pipe( gulp.dest( "build" ) )
});


/**
 * Copy all required libraries into build directory.
 */
gulp.task( "libs", function() {
  return gulp.src([
      'es6-shim/es6-shim.min.js',
      'systemjs/dist/system-polyfills.js',
      'angular2/bundles/angular2-polyfills.js',
      'systemjs/dist/system.src.js',
      'rxjs/bundles/Rx.js',
      'angular2/bundles/angular2.dev.js',
      'angular2/bundles/router.dev.js'
    ],
    { cwd: "node_modules/**" }) /* Glob required here. */
    .pipe( gulp.dest( "build/lib" ) );
});


/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task( 'watch', function () {

  // Compile if there is a change in ts files.
  gulp.watch( [ "src/**/*.ts" ], [ 'compile' ] )
    .on( 'change', function( e ) {
        console.log(' TypeScript file ' + e.path + ' has been changed. Compiling.');
    });

  // Compile if there is a change in html or css files.
  gulp.watch( [ "src/**/*.html", "src/**/*.css" ], [ 'resources' ] )
    .on( 'change', function( e ) {
      console.log( 'Resource file ' + e.path + ' has been changed. Updating.' );
    });
});


/**
 * Build the project.
 */
gulp.task( "build", [ 'tslint', 'compile', 'resources', 'libs' ], function() {
    console.log( "Building the project ..." );
});
