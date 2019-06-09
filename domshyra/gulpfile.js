/// <binding BeforeBuild='clean' Clean='clean' />
"use strict";

const gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    terser = require("gulp-terser");

var sass = require('gulp-sass');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var csso = require('gulp-csso');

const paths = {
    webroot: "./wwwroot/"
};

paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", done => rimraf(paths.concatJsDest, done));
gulp.task("clean:css", done => rimraf(paths.concatCssDest, done));
gulp.task("clean", gulp.series(["clean:js", "clean:css"]));


gulp.task("min:css", () => {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});


// Our scss source folder: .scss files
var scss = {
    in: 'Styles/scss/main.scss',
    out: 'wwwroot/lib/bootstrap/css/',
    watch: 'Styles/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true
    }
};


// compile scss
gulp.task('sass:build', function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(rename('bootstrap.css'))
        .pipe(gulp.dest(scss.out));
});

gulp.task('sass:min', function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(rename('bootstrap.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(scss.out));
});

// Dependency Dirs
var deps = {
    "jquery": {
        "dist/*": ""
    },
    "bootstrap": {
        "dist/**/*": ""
    },
    "popper.js": {
        "dist/**/*": ""
    }
};

gulp.task("scripts", function () {

    var streams = [];

    for (var prop in deps) {
        console.log("Prepping Scripts for: " + prop);
        for (var itemProp in deps[prop]) {
            streams.push(gulp.src("node_modules/" + prop + "/" + itemProp)
                .pipe(gulp.dest("wwwroot/lib/" + prop + "/" + deps[prop][itemProp])));
        }
    }

    return merge(streams);

});

gulp.task("min", gulp.series(["min:css"]));

gulp.task("sass", gulp.series(["sass:build", "sass:min"]));

// A 'default' task is required by Gulp v4
gulp.task("default", gulp.series(["scripts", 'sass', "min"]));



