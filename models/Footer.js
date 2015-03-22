var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Header Model
 */

var footer = new keystone.List('footer');

footer.add({
  mail: { type: Types.Text, initial: true, required: true, index: true },
  facebookUrl: { type: Types.Text, initial: true, required: true, index: true },
  soundcloudUrl: { type: Types.Text, initial: true, required: true },
  twitterUrl: { type: Types.Text, initial: true, required: true },
  vimeoUrl: { type: Types.Text, initial: true, required: true },
  youtubeUrl: { type: Types.Text, initial: true, required: true }
});

/**
 * Registration
 */

footer.defaultColumns = 'mail, facebookUrl, soundcloudUrl, twitterUrl, vimeoUrl, youtubeUrl';
footer.register();
