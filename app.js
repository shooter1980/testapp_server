
const express = require("express");
let url = require('url');
const app = express();
let FileService = require('./file-service');
let DbService = require('./db_service');
let router = express.Router();
let db_service = new DbService();
let file_service = new FileService();
let MongoClient = require('mongodb').MongoClient;
let urlDB = 'mongodb://localhost:27017';

router.get('/api/items', async (request, response) =>{

    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    db_service.getItems(response);
});


router.get("/api/add_item", function(request, response, next){
    console.info("add item");
    db_service.addItem(request);
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
});



router.get("/api/del_item", function(request, response, next){
    console.info("del item");
    let parts = url.parse(request.url, true);
    let query = parts.query;
    let id = query._id;
    db_service.delItem(id, response);
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
});

router.get("/api/write/" , function (request, response){
    file_service.writeToCSVFile(null);
});

app.listen(3000);

app.use('/', router);
module.exports = app;
module.exports = router;







