require("dotenv").config();

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const { MONGO_URI } = process.env;
const { QUOTE_OF_THE_DAY_KEY } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const removeFromFavorite = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);
    
    try {
        await client.connect();
        
        const db = client.db("MakeSweat");

        const { userId, _id } = req.body;

        //updating the array of user's workouts
        const query = { "_id": userId }

        const newValues = { $pull: { "favorites": { "_id": _id } }}

        const result = await db.collection("users").updateOne(query, newValues);

        result 
            ? res.status(204).json({ status: 204, message: "Exercise is deleted successfully" })
            : res.status(404).json({ status: 404, message: "Exercise is not found" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    finally {
        client.close();
    }
};

module.exports = {
    removeFromFavorite
};
