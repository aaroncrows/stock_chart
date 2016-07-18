const gulp = require('gulp');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');

const paths = {
  js: './app/js/client.js',
  html: './app/index.html',
  scss: './app/**/*.scss',
  build: './build',
  assets: './assets/*'
};

const webpackConf = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  }
};

gulp.task('sass', () => {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(paths.build));
});

gulp.task('copy', () => {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.build));
});

gulp.task('copy:assets', () => {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.build));
});

gulp.task('bundle', () => {
  return gulp.src(paths.js)
    .pipe(webpack(webpackConf,
      null, (err, stats) => {
        console.log('hello')
        if (err) console.log(err);
        console.log(stats);
      }))
    .pipe(gulp.dest(paths.build));
});


gulp.task('default', ['copy', 'copy:assets', 'sass', 'bundle']);

gulp.task('watch', () => {
  gulp.watch('./app/**/*', ['default']);
});
