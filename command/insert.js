async function insertOne(client, dbName, collectionName, data) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(data);
        return result;
    } catch (error) {
        console.error("❌ Insert One Error:", error);
    }
}

async function insertMany(client, dbName, collectionName, dataArray) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertMany(dataArray);
        return result;
    } catch (error) {
        console.error("❌ Insert Many Error:", error);
    }
}

module.exports = { insertOne, insertMany };
