var path = require('path');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use('/public',express.static(path.join(__dirname,'../public')));
let config = require('./config/config');
let FileService = require('./file-service');
let itemsRepository = require('./repositories/items_repository');
let router = express.Router();
let file_service = new FileService();
const cors = require('cors');

router.get('/api/items',  async (req, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    const result = await itemsRepository.getItems();
    response.send(result);
});

router.post("/api/add_item", function (req, response){
    console.info("add item");
    console.log(req.body);
    itemsRepository.addItem(req.body);
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'POST');
    response.send({"status":"ok"});
});

router.delete("/api/del_item/:id", async (req, response) =>{
    console.log("del item");
    itemsRepository.delItem(req.params.id);
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    response.send({"status":"ok"});
});

router.get("/api/write/" , function (request, response){
    file_service.writeToCSVFile();
});


app.listen(config.port,function(err){
    if(err) throw err;
    console.info(`Running server at port ${config.port}!`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/', router);
module.exports = app;
module.exports = router;







