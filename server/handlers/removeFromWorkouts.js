require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const removeFromWorkouts = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);
    
    try {
        await client.connect();
        
        const db = client.db("MakeSweat");

        const { userId, workoutId, exerciseId } = req.body;

        //updating the array of workout's exercises
        const query = { "_id": workoutId }

        const newValues = { $pull: { "exercises": {"exerciseId": exerciseId} }};

        const result = await db.collection("workouts").updateOne(query, newValues);

        //updating the array of user's workouts
        const userQuery = { "_id": userId, "workouts._id": workoutId};

        const userNewVal = { $pull: { "workouts.$.exercises": {"exerciseId": exerciseId} }};

        const updatedUser = await db.collection("users").updateOne(userQuery, userNewVal);

        result && updatedUser
            ? res.status(204).json({ status: 204, message: "Exercise is deleted successfully" })
            : res.status(404).json({ status: 404, message: "Exercise is not found" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: err.message });
    }
    finally {
        client.close();
    }
};

module.exports = {
    removeFromWorkouts
};
