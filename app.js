
const express = require("express");
let url = require('url');
const app = express();
var router = express.Router()

let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;

let urlDB = 'mongodb://localhost:27017';

router.use(function (req, res, next) {
    console.log('Time:', Date.now().toLocaleString())
    next()
})

router.get('/user/:id', function (req, res) {

    res.send('hello, '+ req.get('id'));
})

app.use('/', router);

app.get("/api/items", function(request, response){

    MongoClient.connect(urlDB, function(err, client){
        let db = client.db('item');
        db.collection('item').find().toArray(function(err, result){
            if(err) throw err;
            // console.log(result);
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
            response.send(result);
            client.close();
        });
    })
});


app.get("/api/add_item", function(request, response){
    console.info("add item");
    let parts = url.parse(request.url, true);
    let query = parts.query;
    let purchase = query.purchase;
    let price = query.price;
    let count = query.count;
    let sum = query.sum;

    MongoClient.connect(urlDB, function(err, client) {
        if (err) throw err;
        let dbo = client.db("item");
        let item = {
            purchase: purchase,
            done:true,
            price: price,
            count: count,
            sum: sum
        };
        dbo.collection("item").insertOne(item, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            client.close();
        });
    });
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
});

app.get("/api/del_item", function(request, response){
    console.info("del item");
    let parts = url.parse(request.url, true);
    let query = parts.query;
    let id = query._id;
    console.info("_id "+id);

    MongoClient.connect(urlDB, function(err, client){
        let db = client.db('item');
        db.collection('item', function(err, collection) {
            collection.deleteOne({_id: ObjectID(id)}, function(err, results) {
                if (err){
                    console.log("failed");
                    throw err;
                }
                response.header('Access-Control-Allow-Origin', '*');
                response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
                response.send("{\"status\": \"ok\"}");
                console.log("success");
            });
        });
    })
});

app.listen(3000);







