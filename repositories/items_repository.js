const { MongoClient, ObjectID } = require('mongodb');
let config = require('../config/config');

function itemsRepository() {
    const url = config.mongoUri;
    const dbName = config.mongoDB;
    const collection = "items";

    function getItems(query) {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(url, { useUnifiedTopology: true });
            try {
                await client.connect();
                const db = client.db(dbName);
                let items = db.collection(collection).find(query);
                resolve(await items.toArray());
            } catch (error) {
                reject(error);
            } finally {
                 client.close();
            }
        });
    }


    function addItem(item) {
        MongoClient.connect(url, function (err, client) {
            if (err) throw err;
            let dbo = client.db("item");
            dbo.collection("items").insertOne(item, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(result.result);
            });
        });
    }


    function delItem(id) {
        MongoClient.connect(url, function (err, client) {
            if (err) throw err;
            let dbo = client.db("item");
            dbo.collection("items").deleteOne({ _id: ObjectID(id)}, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(result.result);
            });
        });
    }


    return { getItems, addItem, delItem }

}

module.exports = itemsRepository();