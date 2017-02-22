'use strict';

import gulp     from 'gulp';
import webpack     from 'webpack-stream';
import path     from 'path';
import sync     from 'run-sequence';
import browserSync    from 'browser-sync';
import plumber from 'gulp-plumber';

let reload = () => browserSync.reload();
let root = 'client';

// helper method for resolving paths
let resolveToApp = (glob) => {
  glob = glob || '';
  return path.join(root, 'app', glob); // app/{glob}
};

// map of all paths
let paths = {
  js: resolveToApp('**/*!(.spec.js).js'), // exclude spec files
  styl: resolveToApp('**/*.styl'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: path.join(root, 'app/app.js'),
  output: root
};

gulp.task('reload', done => {
  reload();
  done()
});

gulp.task('webpack', () => {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.output));
});

gulp.task('serve', () => {
  browserSync({
    port: process.env.PORT || 4000,
    open: false,
    server: { baseDir: root }
  });
});

// gulp.task('watch', ['serve'], () => {
//   let allPaths = [].concat([paths.js], paths.html, [paths.styl]);
//   gulp.watch(allPaths, ['webpack', 'reload']);
// });

gulp.task('watch', () => {
  let allPaths = [].concat([paths.js], paths.html, [paths.styl]);
  gulp.watch(allPaths, ['webpack', 'reload']);
});



gulp.task('default', (done) => {
  sync('webpack', 'serve', 'watch', done);
});
