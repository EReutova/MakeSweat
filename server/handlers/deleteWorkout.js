require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const deleteWorkout = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);
    
    try {
        await client.connect();

        const { _id } = req.params;

        const { userId } = req.body

        const db = client.db("MakeSweat");

        const query = { _id: userId}
        
        const newValues = { $pull: { "workouts": {"_id": _id} }};
        
        //updating the array of user's workouts - removing one
        const result = await db.collection("users").updateOne(query, newValues);
        console.log(workoutToDelete)
        if (result){
            res.status(204).json({ status: 204, message: "Workout is deleted successfully" })
        }
        else {
            res.status(404).json({ status: 404, message: "Workout is not found" });
        }
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
    deleteWorkout
};
