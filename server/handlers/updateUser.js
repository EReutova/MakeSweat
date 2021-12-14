require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const updateUser = async (req, res) => {

    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    const { _id } = req.params;

    try {

        // TODO: connect...
        await client.connect();

        // TODO: declare 'db'
        const db = client.db("MakeSweat");

        const { name, email, age, weight, password } = req.body;

        const query = { _id };

        let newValues = { $set: { name: name, email: email, age: age, weight: weight, password: password } }

        //find a user according the _id and update according reseived changes
        const result = await db.collection("users").updateOne(query, newValues);

        result
            ? res.status(200).json({ status: 200, data: req.body, message: "User data is updated" })
            : res.status(404).json({ status: 404, data: req.body, message: "User is not found" });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message })
    }

    finally {
        // TODO: close...
        client.close();
    }
};

module.exports = {
    updateUser
};
