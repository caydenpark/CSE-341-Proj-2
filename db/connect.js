// Connect to MongoDB
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient, ObjectId } = require('mongodb');

DB_CONNECTION_STRING = process.env.MONGODB_URI;

let client = undefined;

async function main() {
    client = new MongoClient(DB_CONNECTION_STRING);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    }
}

main().catch(console.error)

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log('Databases: ');
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

module.exports = client;