let mix = require('laravel-mix')

mix.disableNotifications()

mix
    // compilation of .js & .vue files, minification for production environments (ES2015 syntax)
    .js('resources/assets/js/app.js', 'public/js')
    // compilation of .scss (sass) files into .css files
    .sass('resources/assets/sass/app.scss', 'public/css')
    // copying of static assets
    .copyDirectory('resources/assets/images', 'public/images')
    .copyDirectory('resources/assets/fonts', 'public/fonts')
    .copyDirectory('resources/assets/soundfonts', 'public/soundfonts')
    .copyDirectory('resources/assets/js/extra', 'public/js/extra')
    // copying of libraries
    .copyDirectory('resources/assets/js/lib', 'public/lib')

// suffixes compiled assets with a unique token to force browsers to load the fresh assets instead of serving stale copies of the code
// versioned files are usually unnecessary in development, so use versioning only in production
if (mix.config.inProduction) {
    mix.version()
}

// BrowserSync automatically monitors files for changes, and injects the changes into the browser without requiring a manual refresh
// mix.browserSync({
//     proxy: 'localhost:8000',
//     browser: process.platform === 'darwin' ? 'google chrome' : 'chrome',
//     open: 'local',
//     reloadDelay: 0,
//     reloadThrottle: 2000,
//     reloadDebounce: 2000,
//     files: [
//         'public/**/*.js',
//         'public/**/*.css'
//     ]
// })
