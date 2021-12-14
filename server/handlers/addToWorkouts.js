require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addToWorkouts = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {

        await client.connect();

        const db = client.db("MakeSweat");
        
        const { 
            workoutId, 
            exerciseId, 
            description, 
            userId, 
            bodyPart,
            equipment,
            name,
            target,
            gifUrl
        } = req.body;

        //find the workout to update
        const workoutToUpdate = await db.collection("workouts").findOne({_id: workoutId});

        //check if exercise is already in the workout
        let findExercise = workoutToUpdate.exercises.find((exercise)=> {
            return exercise.exerciseId === exerciseId
        })

        //if exercise was found in exercise - give error
        if (findExercise){
            res.status(400).json({ status: 400, message: "Exercise is already in your workout" })
        }

        else{
            //if not - updating the array of user's workouts
            const query = { "_id": workoutId };
    
            const newValues = { $addToSet: { "exercises": {
                "exerciseId": exerciseId, 
                "description": description,  
                "bodyPart": bodyPart,
                "equipment": equipment,
                "name": name,
                "target": target,
                "gifUrl": gifUrl
            } }};

            const result = await db.collection("workouts").updateOne(query, newValues);
    
            const userQuery = { "_id": userId, "workouts._id": workoutId};
    
            const userNewVal = { $push: { "workouts.$.exercises": {
                "exerciseId": exerciseId, 
                "description": description,  
                "bodyPart": bodyPart,
                "equipment": equipment,
                "name": name,
                "target": target,
                "gifUrl": gifUrl
            } }};

            const updatedUser = await db.collection("users").updateOne(userQuery, userNewVal);
    
            result && updatedUser
                ? res.status(201).json({ status: 201, message: "Exercise was added to your workout" })
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
    addToWorkouts
};
