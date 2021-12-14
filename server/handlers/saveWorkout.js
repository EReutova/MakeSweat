require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const saveWorkout = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("MakeSweat");
        
        const {
            _id,
            exercises,
            name,
            type,
            userId,
        } = req.body

        console.log(req.body)
        
        //Find firs the user, that need to be updated
        const userToUpdate = await db.collection("users").findOne({_id: userId});

        //check if workout is already in user's workouts 
        let findWorkout = userToUpdate.workouts.find((workout)=> {
            return workout._id === _id
        })

        //if workout was found - give error
        if (findWorkout){
            res.status(400).json({ status: 400, message: "Workout is already saved" })
        }

        else{
            //if not - updating the array of user's workouts
            const query = { "_id": userId };
    
            const newValues = { $addToSet: { "workouts": {
                "_id": _id, 
                "exercises": exercises,
                "name": name,
                "type": type,
                "userId": userId,
            } }};

            //update user's collection
            const result = await db.collection("users").updateOne(query, newValues)
    
            result
                ? res.status(201).json({ status: 201, message: "Workout was saved" })
                : res.status(400).json({ status: 400, message: "Something went wrong! Try again!" });
        }
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
    saveWorkout
};
