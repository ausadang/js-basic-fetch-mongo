async function updateDoc(client, dbName, collectionName, filter, update) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.updateOne(filter, update);
        return result;
    } catch (error) {
        console.error("❌ Update Error:", error);
    }
}

module.exports = { updateDoc };