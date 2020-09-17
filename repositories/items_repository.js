const { MongoClient, ObjectID } = require('mongodb');
let config = require('../config/config');



function itemsRepository() {
    const url = config.mongoUri;
    const dbName = config.mongoDB;
    const collection = "items";

    function getItems(state) {
        let sortFilter = getSortFilter(state);
        let findFilter = getFindFilter(state);
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(url, { useUnifiedTopology: true });
            try {
                await client.connect();
                const db = client.db(dbName);
                let items = db.collection(collection).find(findFilter).sort(sortFilter);
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

function getOrder(state) {
    if(state && state.sort){
        if(state.sort.reverse){
            return  -1;
        }else{
           return  1;
        }
    }
}

function getSortFilter(state) {
    let order = getOrder(state);
    if(state && state.sort){
        let field = state.sort.by;
        if (field === "purchase") {
            return {purchase: order};
        } else if (field === "price") {
            return {price: order};
        } else if(field ==="count"){
            return {count: order};
        }
    }else{
        return "";
    }
}

function getFindFilter(state){
    if(state && state.filters) {
        let jsonData = {};
        for(let filter of state.filters){
            console.info(filter);
            let columnName = filter.property;
            if(filter.value){
                jsonData[columnName] = {$regex : '^'+filter.value};
            }else if(filter.low || filter.high){
                if(filter.low===null && filter.high!==null){
                    jsonData[columnName] = { $lt : filter.high }
                }else if(filter.low!==null && filter.high===null){
                    jsonData[columnName] = { $gt : filter.low }
                }else if(filter.low!==null && filter.high!==null){
                    jsonData[columnName] = { $gt : filter.low , $lt : filter.high }
                }
            }
            console.info(jsonData);
        }
        return jsonData;
    } else return {};
}

module.exports = itemsRepository();