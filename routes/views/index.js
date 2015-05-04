var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
      locals = res.locals;

  /*
   * Hader configuration
   */

  view.on('init', function (next) {
    keystone.list('header').model.find().exec(function (err,results) {
      if (err || !results.length) {
        return next(err);
      }

      locals.title = results[0].title;
      locals.subTitle = results[0].subTitle;
      locals.tags = results[0].tags;
      locals.youtubeID = results[0].youtubeID;
      locals.bgImage = results[0].bgImage;
      next();
    });
  });

  /*
   * Videos configuration
   */

  view.on('init', function (next) {
    keystone.list('videos').model.find().exec(function (err,results) {
      if (err || !results.length) {
        return next(err);
      }

      locals.videos = results;
      next();
    });
  });

  /*
   * Listen configuration
   */

  view.on('init', function (next) {
    keystone.list('listen').model.find().exec(function (err,results) {
      if (err || !results.length) {
        return next(err);
      }
      locals.description = results[0].description;
      next();
    });
  });

  view.on('init', function (next) {
    keystone.list('soundCloud').model.find().exec(function (err,results) {
      if (err || !results.length) {
        return next(err);
      }

      locals.soundCloud = results;
      next();
    });
  });

  view.on('init', function (next) {
    keystone.list('footer').model.find().exec(function (err,results) {
      if (err || !results.length) {
        return next(err);
      }

      locals.footer = results[0];
      console.log(results[0]);
      next();
    });
  });

  // Render the view
  view.render('index');
};
