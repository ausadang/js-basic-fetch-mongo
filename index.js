const { MongoClient } = require("mongodb");
const readline = require("readline");
require("dotenv").config();

const uri = process.env.TOKEN_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "test";
const collectionName = "test_db";

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");

        const { insertOne, insertMany } = require("./command/insert");
        const { searchDoc } = require("./command/searth");
        const { updateDoc } = require("./command/update");
        const { deleteDoc, deleteMany } = require("./command/delete");
        const { readDoc } = require("./command/read");

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const ask = (question) => new Promise((resolve) => rl.question(question, resolve));
        while (true) {
            console.log("\n📌 Select an option:");
            console.log("1️ Insert Data ");
            console.log("2️ Search Data ");
            console.log("3️ Update Data 🚧");
            console.log("4️ Delete Data ");
            console.log("5️ Read All Data");
            console.log("0️ Exit");

            const choice = await ask("Enter your choice: ");

            if (choice === "0") {
                break;
            }

            switch (choice) {
                case "1":
                    let name = await ask("Enter name: ");
                    let age = parseInt(await ask("Enter age: "), 10);
                    let grade = await ask("Enter grade: ");
                    let city = await ask("Enter city: ");
                    let country = await ask("Enter country: ");
                    let born = await ask("Enter born: ");
                    let data = { name, age, grade, city, country, born };
                    await insertOne(client, dbName, collectionName, data);
                    break;
                case "2":
                    let search = await ask("Enter search: ");
                    try {

                        let result = await searchDoc(client, dbName, collectionName, search);
                        console.log("🔍 Search Result:", result);
                    } catch (error) {
                        console.error("❌ Error parsing search input:", error);
                    }

                    break;
                case "3":
                    console.log("🚧 Update function not implemented yet.");
                    break;
                case "4":
                    let del = await ask("Enter delete: ");
                    try {
                        let result = await deleteDoc(client, dbName, collectionName, del);
                        console.log("🗑️ Delete Result:", result);
                    } catch (error) {
                        console.error("❌ Error parsing delete input:", error);
                    }
                    break;
                case "5":
                    const docs = await readDoc(client, dbName, collectionName);
                    console.log("📄 Documents:", docs);
                    break;
                case "0":
                    console.log("👋 Goodbye!");
                    rl.close();
                    break;
                default:
                    console.log("❌ Invalid choice");
                    break;
            }
        }
        rl.close();

    } catch (error) {
        console.error("❌ Connection error:", error);
    } finally {
        await client.close();
        console.log("🔌 Connection closed");
    }
}

connectDB();


/**
 * 
 * 
 * 
 */