let mongoose = require('mongoose');
let itemSchema = new mongoose.Schema({
    purchase: String,
    price: String,
    count: String,
    sum: String
});
module.exports = mongoose.model('Item',itemSchema);