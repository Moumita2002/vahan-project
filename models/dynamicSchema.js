const mongoose = require('mongoose');

const dynamicSchema = new mongoose.Schema({
    name: String,
    fields: [{ fieldName: String, fieldType: String }]
});

module.exports = dynamicSchema;
