var path = require('path');
const express = require("express");
const app = express();
app.use('/public',express.static(path.join(__dirname,'../public')));
var config = require('./config/config');
const models = require('./models');

let url = require('url');
let FileService = require('./file-service');
let Item_Service = require('./item_service');
// let getItems = require('./items');
let router = express.Router();
let item_service = new Item_Service();
let file_service = new FileService();

require('./dbinit');


router.get('/api/items',  function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    item_service.getItems(response, next);
});


router.get("/api/add_item", function(request, response, next){
    console.info("add item");
    item_service.addItem(request);
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
});



router.get("/api/del_item", function(request, response, next){
    console.info("del item");
    let parts = url.parse(request.url, true);
    let query = parts.query;
    let id = query._id;
    item_service.delItem(id);
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
});

router.get("/api/write/" , function (request, response){
    file_service.writeToCSVFile();
});


app.listen(config.port,function(err){
    if(err) throw err;
    console.info(`Running server at port ${config.port}!`);
});

app.use('/', router);
module.exports = app;
module.exports = router;







