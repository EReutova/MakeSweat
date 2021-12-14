require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getAllWorkouts = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {

        await client.connect();

        const db = client.db("MakeSweat");

        const workouts = await db.collection("workouts").find().toArray();
        
        workouts
            ? res.status(200).json({ status: 200, data: workouts, message: "Success" })
            : res.status(404).json({ status: 404, message: "Workouts are not found" });
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
    getAllWorkouts
};
