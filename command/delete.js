
async function deleteDoc(client, dbName, collectionName, filter) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const [field, value] = filter.split(":");
        const filters = { [field]: isNaN(value) ? value : parseInt(value, 10) };
        console.log("🗑️ Delete Filter:", filters);
        const result = await collection.deleteOne(filters);
        return result;
    } catch (error) {
        console.error("❌ Delete Error:", error);
    }
}

async function deleteMany(client, dbName, collectionName, filter) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.deleteMany(filter);
        return result;
    } catch (error) {
        console.error("❌ Delete Error:", error);
    }
}

module.exports = { deleteDoc, deleteMany };