const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID ;


persist = async (handler) => {
    const url = 'mongodb://root:example@68.183.207.82:27017/';
    const dbName = "uber"
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName)

    let result;
    try{
        result = await handler(db);
        // console.log({result});
    } catch (e) {
        result = {error: "Resource unavailable."}
    } finally {
        client.close()  
    }
    
    return result;

}




module.exports = persist;
