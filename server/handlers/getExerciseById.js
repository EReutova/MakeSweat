require("dotenv").config();

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const { MONGO_URI } = process.env;
const { QUOTE_OF_THE_DAY_KEY } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getExerciseById = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("MakeSweat");

        const { _id } = req.params;
        
        const result = await db.collection("exercises").findOne({ _id });

        result
            ? res.status(200).json({ status: 200, result, message: "Exercise is found" })
            : res.status(400).json({ staus: 400, message: "Workout is not found" });
    } 

    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message })
    }

    finally {
        client.close();
    }
};

module.exports = {
    getExerciseById
};
