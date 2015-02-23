var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Header Model
 */

var header = new keystone.List('header');

header.add({
  title: { type: Types.Text, initial: true, required: true, index: true },
  subTitle: { type: Types.Text, initial: true, required: true, index: true },
  tags: { type: Types.Text, initial: true, required: true }
});

/**
 * Registration
 */

header.defaultColumns = 'title, subtitle, tags';
header.register();
