require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const updateWorkout = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {

        await client.connect();

        const db = client.db("MakeSweat");

        const { _id } = req.params;

        const { 
            userId,
            exerciseId, 
            description, 
        } = req.body;

        //updating the array of workouts
        const query = { "_id": _id, "exercises.exerciseId": exerciseId };

        const newValues = { $set: { "exercises.$.description": description } };

        const result = await db.collection("workouts").updateOne(query, newValues);

        //updating the array of user's workouts
        const userQuery = { "_id": userId};

        const userNewVal = { $set: { "workouts.$[workouts].exercises.$[exercises].description": description }};

        const filters = {
            arrayFilters : [{ 'workouts._id' : _id }, { "exercises.exerciseId": exerciseId }],
            new: true
        }
        
        const updatedUser = await db.collection("users").findOneAndUpdate(userQuery, userNewVal, filters) ;

        result && updatedUser
            ? res.status(200).json({ status: 200, message: "Description was added" })
            : res.status(400).json({ status: 400, message: "Something went wrong! Try again!" });
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
    updateWorkout
};
