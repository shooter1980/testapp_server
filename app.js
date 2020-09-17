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


router.post('/api/items',  async (req, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    let state = req.body;
    const result = await itemsRepository.getItems(state);
    console.info(result);
    response.send(result);
});

router.post("/api/add_item", function (req, response){
    console.info("add item");
    console.log(req.body);
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'POST');
    let item = req.body;
    if(item.purchase===undefined ||item.purchase===null || item.purchase.length===0
        ||item.price===undefined ||item.price===null || item.price.length===0
        ||item.count===undefined ||item.count===null || item.count.length===0
        ||item.sum===undefined ||item.sum===null || item.sum.length===0  ){
        response.status(400).send({"status":"error"});
    }else{
        itemsRepository.addItem(item);
        response.status(201).send({"status":"ok"});
    }
});

router.delete("/api/del_item/:id", function (req, response) {
    console.log("del item");
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    if(req.params.id===null || req.params.id.length===0){
        response.status(400).send({"status":"error"});
    }else{
        itemsRepository.delItem(req.params.id);
        response.status(202).send({"status":"ok"});
    }
});

router.get("/api/write/" , async (request, response)=>{
    await file_service.writeToCSVFile();
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







