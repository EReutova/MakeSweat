require("dotenv").config();

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const createNewWorkout = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {

        await client.connect();

        const db = client.db("MakeSweat");
        
        const { userId, name, type, exercises } = req.body;
        
        // Creates new _id for workout
        const _id = uuidv4();
        
        const newWorkout = { _id, ...req.body };
        
        // pushing new workout to the "workouts" collection
        const result = await db.collection("workouts").insertOne(newWorkout);

        //updating the array of user's workouts
        const query = { _id: newWorkout.userId }

        const newValues = { $push: { workouts:  newWorkout }};

        const workoutsUpdated = await db.collection("users").updateOne(query, newValues);

        result && workoutsUpdated
            ? res.status(201).json({ status: 201, _id, message: "Success! New workout was created!" })
            : res.status(400).json({ status: 400, message: "Something went wrong! Please provide valid data!" });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    finally {
        client.close();
    }
};

module.exports = {
    createNewWorkout
};
