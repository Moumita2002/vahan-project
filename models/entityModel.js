const mongoose = require('mongoose');
const dynamicSchema = require('./dynamicSchema');

const Entity = mongoose.model('Entity', dynamicSchema);

module.exports = Entity;
