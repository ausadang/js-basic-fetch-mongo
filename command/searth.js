async function searchDoc(client, dbName, collectionName, filter) {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const [field, value] = filter.split(":");
        const filters = { [field]: isNaN(value) ? value : parseInt(value, 10) };
        console.log("🔍 Search Filter:", filters);
        const result = await collection.findOne(filters);
        return result;
    } catch (error) {
        console.error("❌ Search Error:", error);
    }
}

module.exports = { searchDoc };