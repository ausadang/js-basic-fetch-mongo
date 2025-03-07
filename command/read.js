
async function readDoc(client, dbName, collectionName) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.find({ /* no filter */ }).toArray();
        return result;
    } catch (error) {
        console.error("❌ Read Error:", error);
    }
}

module.exports = { readDoc };