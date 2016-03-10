"use strict";

var gulp = require( "gulp" );

// TypeScript.
var tsc        = require( "gulp-typescript" );
var tsProject  = tsc.createProject( "tsconfig.json" );
var tslint     = require( 'gulp-tslint' );

// Convert SCSS to CSS.
var sass = require('gulp-sass');

// Prefix CSS.
var autoprefixer = require('gulp-autoprefixer');

// Replace HTML tags with references.
var useref = require('gulp-useref');

// Run the tasks in the specific order.
var runSequence = require('run-sequence');

// Sourcemaps.
var sourcemaps = require( 'gulp-sourcemaps' );

// Cleaning.
var del = require( "del" );


/**
 * Convert SCSS files to CSS, create sourcemaps, and save to in the build directory.
 */
gulp.task( 'sass2css', function() {
  return gulp.src( 'src/app/**/*.scss' )   // Read a file.
    .pipe( sourcemaps.init() )             // Process the original sources.
    .pipe( sass() )                        // Convert SCSS to CSS.
    .pipe( autoprefixer() )                // Add vender-prefixes.
    .pipe( sourcemaps.write( "." ) )       // Write sourcemaps.
    .pipe( gulp.dest( 'build/app' ) )      // Save the resulting file to the build directory.
})


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
 * Compile TypeScript sources, create sourcemaps, and save to in the build directory.
 */
gulp.task( "ts2js", function() {
  var tsResult = gulp.src( "src/**/*.ts" )
    .pipe( sourcemaps.init() )
    .pipe( tsc( tsProject ) );
  return tsResult.js
    .pipe( sourcemaps.write( "." ) )
    .pipe( gulp.dest( "build" ) );
});


/**
 * Copy all required libraries into the build/vendor directory.
 */
gulp.task( "vendor", function() {
  return gulp.src([
      'es6-shim/es6-shim.min.js',
      'systemjs/dist/system-polyfills.js',
      'angular2/bundles/angular2-polyfills.js',
      'systemjs/dist/system.src.js',
      'rxjs/bundles/Rx.js',
      'angular2/bundles/angular2.dev.js',
      'angular2/bundles/router.dev.js'
    ],
    { cwd: "node_modules/**" })
    .pipe( gulp.dest( "build/vendor" ) );
});


/**
 * Copy all the files other than TypeScript and SCSS files,
 * and save to the build directory.
 */
gulp.task( "resources", function() {
  return gulp
    .src([
      "src/**/*",    // All the files in the src directory.
      "!**/*.scss",  // Exclude SCSS files.
      "!**/*.ts"     // Exclude TypeScript files.
    ])
    .pipe( gulp.dest( "build" ) )
});


/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task( 'watch', function () {

  // Compile if there is a change in TypeScript files.
  gulp.watch( [ "src/**/*.ts" ], [ 'ts2js' ] )
    .on( 'change', function( e ) {
      console.log(' TypeScript file ' + e.path + ' has been changed. Compiling...');
    });

  // Compile if there is a change in SASS files.
  gulp.watch( 'src/**/*.scss', [ 'sass2css' ] )
    .on( 'change', function( e ) {
      console.log(' SASS file ' + e.path + ' has been changed. Compiling...');
    });

  // Copy to the build direcory if there is a change in HTML or CSS files.
  gulp.watch( [ "src/**/*.html", "src/**/*.css" ], [ 'resources' ] )
    .on( 'change', function( e ) {
      console.log( 'Resource file ' + e.path + ' has been changed. Updating...' );
    });
});


/**
 * Remove build directory.
 */
gulp.task( 'clean', function( done ) {
    return del( [ "build" ], done );
});


/**
 * Build the project.
 */
gulp.task( 'build', function ( done ) {
  runSequence(
    'clean',
    [ 'sass2css', 'ts2js', 'resources', 'vendor' ],  // Run there tasks simultaneously.
    done
  )
})

