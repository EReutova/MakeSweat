require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getUserById = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("MakeSweat");

        const { _id } = req.params;

        const result = await db.collection("users").findOne({ _id });

        result
            ? res.status(200).json({ status: 200, result, message: "User is found" })
            : res.status(400).json({ staus: 400, message: "User is not found" });
    }
    
    catch (error) {
        res.status(500).json({ status: 500, message: "Something went wrong..." });
    }

    finally {
        client.close();
    }
};

module.exports = {
    getUserById
};
