const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String
});

//params: (name of the model, schema, collection name in DB--optional)
//if param3 is not provided, ((collection name = model name + s))
module.exports = mongoose.model('user', userSchema, 'user');