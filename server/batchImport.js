require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const data  = require("./data.json");

// Function that batch imports data, Companies and Categories to Mongo
const batchImport = async () => {
    
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("MakeSweat");

        // Adds the data to Mongo
        await db.collection("exercises").insertMany(data);

    } 
    catch (err) {
        console.log(err);
    }
    finally {
        client.close()
    }
}

batchImport();