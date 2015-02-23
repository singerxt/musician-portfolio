var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Header Model
 */

var videos = new keystone.List('videos');

videos.add({
  title: { type: Types.Text, initial: true, required: true, index: true },
  url: { type: Types.Text, initial: true, required: true, index: true },
  image: { type: Types.CloudinaryImage, initial: false, required: true }
});

/**
 * Registration
 */

videos.defaultColumns = 'title, url, image';
videos.register();
