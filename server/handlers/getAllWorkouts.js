require("dotenv").config();

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const { MONGO_URI } = process.env;
const { QUOTE_OF_THE_DAY_KEY } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getAllWorkouts = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();


    } 

    catch (error) {

    }

    finally {
        client.close();
    }
};

module.exports = {
    getAllWorkouts
};
