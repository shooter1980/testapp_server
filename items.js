
let MongoClient = require('mongodb').MongoClient;
let urlDB = 'mongodb://localhost:27017';

router.post('/api/getItems', (req, res, next) => {
    try {

        MongoClient.connect(urlDB, function(err, client) {
            assert.equal(null, err);
            const db = client.db('items');
            //Step 1: declare promise
            var myPromise = () => {
                return new Promise((resolve, reject) => {
                    db.collection('items')
                        .find()
                        .toArray(function(err, data) {
                            err
                                ? reject(err)
                                : resolve(data[0]);
                        });
                });
            };
            //Step 2: async promise handler
            var callMyPromise = async () => {
                var result = await (myPromise());
                //anything here is executed after result is resolved
                return result;
            };
            //Step 3: make the call
            callMyPromise().then(function(result) {
                client.close();
                res.json(result);
            });
        }); //end mongo client

    } catch (e) {
        next(e)
    }
});
module.exports = router;