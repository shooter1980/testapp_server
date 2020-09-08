'use strict';
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
let urlDB = 'mongodb://localhost:27017';
let url = require('url');

class DbService {

        getItems(response) {
            MongoClient.connect(urlDB, function (err, client) {
                let db = client.db('item');
                db.collection('item').find().toArray( function(err, results) {
                    response.send(results);
                }
                )
            });
        }

    addItem(request) {
        let parts = url.parse(request.url, true);
        let query = parts.query;
        let purchase = query.purchase;
        let price = query.price;
        let count = query.count;
        let sum = query.sum;

        MongoClient.connect(urlDB, function (err, client) {
            if (err) throw err;
            let dbo = client.db("item");
            let item = {
                purchase: purchase,
                done: true,
                price: price,
                count: count,
                sum: sum
            };
            dbo.collection("item").insertOne(item, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                client.close();
            });
        });
    }

    delItem(id, response) {
        MongoClient.connect(urlDB, function (err, client) {
            let db = client.db('item');
            db.collection('item', function (err, collection) {
                collection.deleteOne({_id: ObjectID(id)}, function (err, results) {
                    if (err) {
                        console.log("failed");
                        throw err;
                    }
                    console.log("success");
                });
            });
        })
    }

}
module.exports = DbService


