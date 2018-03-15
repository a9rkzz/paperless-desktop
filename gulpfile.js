const gulp = require("gulp");
const gutil = require("gulp-util");
const gulpif = require("gulp-if");
const streamify = require("gulp-streamify");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const less = require("gulp-less");
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");
const source = require("vinyl-source-stream");
const babelify = require("babelify");
const browserify = require("browserify");
const watchify = require("watchify");
const uglify = require("gulp-uglify");

const production = false; //process.env.NODE_ENV === "production";

const dependencies = ["alt", "react", "react-dom", "react-router", "axios", "jquery", "moment"];

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify-vendor", function() {
	return browserify({
		debug: !production
	})
		.require(dependencies)
		.bundle()
		.pipe(source("vendor.bundle.js"))
		.pipe(
			gulpif(
				production,
				streamify(
					uglify({
						mangle: false
					})
				)
			)
		)
		.pipe(gulp.dest("js/build"));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify", ["browserify-vendor"], function() {
	return browserify({
		entries: "js/src/main.js",
		debug: !production
	})
		.external(dependencies)
		.transform(babelify)
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(
			gulpif(
				production,
				streamify(
					uglify({
						mangle: false
					})
				)
			)
		)
		.pipe(gulp.dest("js/build"));
});

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify-watch", ["browserify-vendor"], function() {
	const bundler = watchify(browserify("main.js", watchify.args));
	bundler.external(dependencies);
	bundler.transform(babelify);
	bundler.on("update", rebundle);
	return rebundle();

	function rebundle() {
		const start = Date.now();
		return bundler
			.bundle()
			.on("error", function(err) {
				gutil.log(gutil.colors.red(err.toString()));
			})
			.on("end", function() {
				gutil.log(gutil.colors.green("Finished rebundling in", Date.now() - start + "ms."));
			})
			.pipe(source("bundle.js"))
			.pipe(gulp.dest("js/"));
	}
});

gulp.task("default", ["browserify-vendor", "browserify"]);
//gulp.task("build", ["vendor", "browserify"]);
