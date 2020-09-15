const { MongoClient, ObjectID } = require('mongodb');
let config = require('../config/config');



function itemsRepository() {
    const url = config.mongoUri;
    const dbName = config.mongoDB;
    const collection = "items";

    function getItems(field, order) {
        let sortFilter = getFilter(field, order);
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(url, { useUnifiedTopology: true });
            try {
                await client.connect();
                const db = client.db(dbName);
                let items = db.collection(collection).find().sort(sortFilter);
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

function getOrder(order) {
    if (order === "1") {
        return 1;
    } else {
        return -1;
    }
}

function getFilter(field, order) {
    let o = getOrder(order);
    if (field === "purchase") {
        return {purchase: o};
    } else if (field === "price") {
        return {price: o};
    } else if(field ==="count"){
        return {count: o};
    }else{
        return "";
    }
}

module.exports = itemsRepository();