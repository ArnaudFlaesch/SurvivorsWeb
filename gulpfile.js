
const browserify = require("browserify");
const browserSync = require("browser-sync");
const buffer = require("vinyl-buffer");
const del = require("del");
const gulp = require("gulp");
const gutil = require("gulp-util");
const jshint = require("gulp-jshint");
const runSequence = require("run-sequence");
const reload = browserSync.reload;
const source = require("vinyl-source-stream");

const sourceDir = "./src";
const buildDir = "./build";

var paths = {
    source: sourceDir,
    dest: buildDir,
    index: sourceDir + "/index.html",
    assets: {
        src: sourceDir + "/assets",
        dest: buildDir + "/assets"
    },
    js: {
        src: sourceDir + "/js/**/*.js",
        bundle: "bundle-game.js"
    }
};

gulp.task("clean", function(cb) {
    return del([paths.dest]);
});

gulp.task("build-index", function() {
    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.dest))
        .pipe(reload({stream: true}));
});

gulp.task("build-game", function() {
    var bundleStream =
        browserify([
            "./src/js/game.js",
            "./src/js/services/service.js",
            "./src/js/states/registerState.js",
            "./src/js/states/loginState.js",
            "./src/js/states/gameState.js"
        ])
        .bundle()
        .on("error", function logError(error) {
            gutil.log(gutil.colors.red("BUNDLE JS"), error.toString());
            this.emit("end");
        })
        .pipe(source(paths.js.bundle))
        .pipe(gulp.dest(paths.dest))
        .pipe(reload({stream: true}));
});

gulp.task("copy-assets", function() {
    return gulp.src(paths.assets.src + "/*")
        .pipe(gulp.dest(paths.assets.dest))
        .pipe(reload({stream: true}));
});

gulp.task("copy-phaser-input", function() {
    return gulp.src("./node_modules/phaser-input/build/phaser-input.js")
        .pipe(gulp.dest(paths.dest))
        .pipe(reload({stream: true}));
});

gulp.task("serve", function() {
    browserSync({
        server: {
            baseDir: paths.dest
        },
        open: false,
        reloadOnRestart: true
    });

    gulp.watch([paths.index], ["build-index"]);
    gulp.watch([paths.js.src, "./*.js"], ["build-game", "jshint"]);
});

gulp.task("jshint", function () {
    return gulp.src([paths.js.src, "./*.js"])
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("copy", ["copy-assets", "copy-phaser-input"]);

gulp.task("build", ["build-index", "build-game"]);

gulp.task("default", function() {
    runSequence(
        ["clean"],
        ["copy"],
        ["jshint"],
        ["build"],
        ["serve"]
    );
});
