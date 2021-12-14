require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addToFavorite = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {

        await client.connect();

        const db = client.db("MakeSweat");
        
        const { 
            userId,  
            bodyPart,
            equipment,
            gifUrl,
            _id,
            name,
            target,
            description } = req.body;

        // find user who's favorites we update
        const userToUpdate = await db.collection("users").findOne({_id: userId});

        //check if exercise is already in the favorites
        let findExercise = userToUpdate.favorites.find((exercise)=> {
            return exercise._id === _id;
        })

        //if exercise was found in user's favorites - give error
        if (findExercise){
            res.status(400).json({ status: 400, message: "Exercise is already in your favorites" })
        }

        //if not - update the array of user's favorites
        else{
            const query = { "_id": userId }
    
            const newValues = { $addToSet: { "favorites": {bodyPart, equipment, gifUrl, _id, name, target, description}  }};
    
            const result = await db.collection("users").updateOne(query, newValues);
    
            result
                ? res.status(201).json({ status: 201, message: "Exercise was added to favorites" })
                : res.status(400).json({ status: 400, message: "Something went wrong! Try again!" });
        }
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
    addToFavorite
};
