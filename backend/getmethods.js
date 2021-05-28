const persist = require('./persistence')

function getAllMethods(object) {
    return Object.getOwnPropertyNames(object).filter(function (property) {
        return typeof object[property] == 'function';
    });
}

// console.log(getAllMethods(Math));

async function print() {
    const cursor = await persist(async (db) => {
        return await db.collection("appointments").find({})
    })
    console.log(getAllMethods(cursor))
    console.log(Object.getOwnPropertyNames(cursor))
}
 print()
