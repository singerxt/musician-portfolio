var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Header Model
 */

var soundCloud = new keystone.List('soundCloud', {
  sortable: true
});

soundCloud.add({
  title: { type: Types.Text, initial: true, required: true, index: true },
  url: { type: Types.Text, initial: true, required: true, index: true }
});

/**
 * Registration
 */

soundCloud.defaultColumns = 'title, url';
soundCloud.register();
