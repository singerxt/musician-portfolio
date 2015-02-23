var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Header Model
 */

var listen = new keystone.List('listen');

listen.add({
  description: { type: Types.Text, initial: true, required: true, index: true },
});

/**
 * Registration
 */

listen.defaultColumns = 'description';
listen.register();
