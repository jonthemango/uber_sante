const MongoClient = require('mongodb').MongoClient;


async function persist (handler) {
    const url = 'mongodb://root:example@68.183.207.82:27017/';
    const dbName = "uber"
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName)

    let result;
    try{
        result = await handler(db);
    } catch (error) {
        console.log({error})
        result = {error: error.message}
    } finally {
        client.close()  
    }
    
    return result;

}




module.exports = persist;
