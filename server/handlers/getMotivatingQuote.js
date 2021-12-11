const { MongoClient } = require("mongodb");

const request = require("request");

require("dotenv").config();
const { MONGO_URI } = process.env;

const { QUOTE_OF_THE_DAY_KEY } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const fetch = require("node-fetch");

const getMotivatingQuote = async (req, res) => {

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
    getMotivatingQuote
};
