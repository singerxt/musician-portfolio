// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone'),
    handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

  'name': 'mKulesza-portfolio',
  'brand': 'mKulesza-portfolio',

  'sass': 'public',
  'sass options': {outputStyle: 'compressed'},
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'hbs',

  'custom engine': handlebars.create({
    layoutsDir: 'templates/views/layouts',
    partialsDir: 'templates/views/partials',
    defaultLayout: 'default',
    helpers: new require('./templates/views/helpers')(),
    extname: '.hbs'
  }).engine,

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'No',
  'cookie secret': 'aXD]oiP/)0+Q*UId!wCOU:F2|um+#P8a1&gI{]1yPlJ5[?<HB,=l5W$->~*c6lny',
  'frame guard': false,
  'compress': true

});


// Configure images cloud

keystone.set('cloudinary config', {
  cloud_name: 'dhv6bltxc',
  api_key: '894396721574751',
  api_secret: 'aSNKeUPmXFdeUYM1mXiYOgRiboA'
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
  _: require('underscore'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
  'nos': 'nos',
  'header': 'header',
  'videos': 'videos',
  'listen': 'listen',
  'soundCloud': 'soundCloud',
  'footer': 'footer'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
