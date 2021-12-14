require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const deleteUser = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);
    
    try {
        await client.connect();

        const { _id } = req.params;

        const db = client.db("MakeSweat");

        const result = await db.collection("users").deleteOne({ _id });

        //I mign also will need to delete user's workouts
        result
            ? res.status(204).json({ status: 204, data: "User deleted successfully" })
            : res.status(404).json({ status: 404, data: "User is not found" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message });
    }
    finally {
        client.close();
    }
};

module.exports = {
    deleteUser
};
