const models = require('./models');
let url = require('url');

class Item_service {

    getItems(response, next) {
        models.Item.find({}).exec().then((posts)=>{
            response.send(posts)
        }).catch(next);
    }


    addItem(request) {
        let parts = url.parse(request.url, true);
        let query = parts.query;
        let purchase = query.purchase;
        let price = query.price;
        let count = query.count;
        let sum = query.sum;

        let item = new models.Item({
            purchase: purchase,
            price: price,
            count: count,
            sum: sum });
        item.save();
    }

    delItem(id){
        console.info("id "+id);
        models.Item.findByIdAndDelete(id, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted : ", docs);
            }
        });
    }

}
module.exports = Item_service;