var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Header Model
 */

var header = new keystone.List('header');

header.add({
  title: { type: Types.Text, initial: true, required: true, index: true },
  subTitle: { type: Types.Text, initial: true, required: true, index: true },
  tags: { type: Types.Text, initial: true, required: true },
  bgImage: { type: Types.CloudinaryImage, initial: false, required: true },
  youtubeID: { type: Types.Text, initial: true, required: false }
});

/**
 * Registration
 */

header.defaultColumns = 'title, subtitle, tags, bgImage, youtubeID';
header.register();
