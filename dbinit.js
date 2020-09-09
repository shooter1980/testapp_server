var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let config = require('./config/config');

mongoose.connect(config.mongoUri,{
    server:{
        poolSize: 10
    }
});

mongoose.connection.on('error',(err)=>
{
    console.error("Database Connection Error: " + err);
    process.exit(2);
});

mongoose.connection.on('connected',()=>
{
    console.info("Succesfully connected to MongoDB Database");
});