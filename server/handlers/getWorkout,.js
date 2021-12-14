require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getWorkout = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("MakeSweat");

        const { _id } = req.params;
        
        const result = await db.collection("workouts").findOne({ _id });

        result
            ? res.status(200).json({ status: 200, result, message: "Workout is found" })
            : res.status(400).json({ staus: 400, message: "Workout is not found" });

    } 
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message });
    }
    finally {
        client.close();
    }
};

module.exports = {
    getWorkout
};
