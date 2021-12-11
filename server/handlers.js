const { MongoClient } = require("mongodb");

const request = require("request");

require("dotenv").config();
const { MONGO_URI } = process.env;

const { EXERCISE_DB_KEY } = process.env;

const { QUOTE_OF_THE_DAY_KEY } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const fetch = require("node-fetch");

const { v4: uuidv4 } = require("uuid");

const getAllExercises = async (req, res) => {
    const { searchRequest, start, limit } = req.query;

    let startNum = Number(start);
    let limitNum = Number(limit);
    try {
        
        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises`,
            headers: {
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                'x-rapidapi-key': EXERCISE_DB_KEY,
                useQueryString: true
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            const result = JSON.parse(body);
            let newResult;

            if (searchRequest) {
                //*************************************** */
                // let newSearch = searchRequest.split(" ")
                newResult = result.filter((item) => {
                    return (
                        item.bodyPart.toLowerCase().includes(searchRequest.toLowerCase()) ||
                        item.equipment.toLowerCase().includes(searchRequest.toLowerCase()) ||
                        item.name.toLowerCase().includes(searchRequest.toLowerCase()) ||
                        item.target.toLowerCase().includes(searchRequest.toLowerCase())
                        )
                }).slice(startNum, limitNum+startNum)
            }
            else {
                newResult = result.slice(startNum, limitNum+startNum)
            }
            result
                ? res.status(200).json({ status: 200, data: newResult, message: "Success" })
                : res.status(404).json({ status: 404, message: "Exercise is not found" });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message })
    }
};

const getExerciseById = async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${req.params.id}`,
            headers: {
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                'x-rapidapi-key': EXERCISE_DB_KEY,
                useQueryString: true
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            const result = JSON.parse(body);

            result
                ? res.status(200).json({ status: 200, data: result, message: "Success" })
                : res.status(404).json({ status: 404, data: result, message: "Exercise is not found" });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message })
    }
};

const getExerciseByName = async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises/name/${req.params.name}`,
            headers: {
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                'x-rapidapi-key': EXERCISE_DB_KEY,
                useQueryString: true
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            const result = JSON.parse(body);

            result
                ? res.status(200).json({ status: 200, data: result, message: "Success" })
                : res.status(404).json({ status: 404, data: result, message: "Exercise is not found" });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message })
    }
};

const getExerciseByEquipmentType = async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises/equipment/${req.params.type}`,
            headers: {
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                'x-rapidapi-key': EXERCISE_DB_KEY,
                useQueryString: true
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            const result = JSON.parse(body);

            result
                ? res.status(200).json({ status: 200, data: result, message: "Success" })
                : res.status(404).json({ status: 404, data: result, message: "Exercise is not found" });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message })
    }
};

const getExerciseByTarget = async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises/target/${req.params.target}`,
            headers: {
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                'x-rapidapi-key': EXERCISE_DB_KEY,
                useQueryString: true
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            const result = JSON.parse(body);

            result
                ? res.status(200).json({ status: 200, data: result, message: "Success" })
                : res.status(404).json({ status: 404, data: result, message: "Exercise is not found" });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message })
    }
};

const getExerciseByBodyPart = async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${req.params.bodyPart}`,
            headers: {
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                'x-rapidapi-key': EXERCISE_DB_KEY,
                useQueryString: true
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            const result = JSON.parse(body);

            result
                ? res.status(200).json({ status: 200, data: result, message: "Success" })
                : res.status(404).json({ status: 404, data: result, message: "Exercise is not found" });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message })
    }
};

//********************** */
// getFilteredExercise,

const createNewUser = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {

        await client.connect();

        const db = client.db("MakeSweat");
        
        const { name, email, age, gender, weight,
            // avatar
        } = req.body;
        
        //Validation
        if (name.length <= 2) {
            return res.status(400).json({ status: 400, message: "Please provide your full name" });
        }
        else if (!email.includes("@")) {
            return res.status(400).json({ status: 400, message: "Please provide valid email" });
        }
        else if (!gender) {
            return res.status(400).json({ status: 400, message: "Please select a gender" });
        }
        
        // Creates new _id for user
        const _id = uuidv4();
        
        const newUser = { _id, ...req.body };
        
        //validation if user was registered or not yet
        const existingUser = await db.collection("users").findOne({email: newUser.email});

        if (existingUser){
            // if find matching email - give error
            return res.status(400).json({ status: 400, message: "This email is already being used" })
        }
        else {
            // if not - pushes newUser to "users" collection
            const result = await db.collection("users").insertOne(newUser);
    
            result
                ? res.status(201).json({ status: 201, _id, newUser, message: "Success! New user was added!" })
                : res.status(400).json({ status: 400, message: "Something went wrong! Please provide valid data!" });
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message });
    }
    finally {
        client.close();
    }
};

const getUserById = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("MakeSweat");

        const { _id } = req.params;

        const result = await db.collection("users").findOne({ _id });

        result
            ? res.status(200).json({ status: 200, result, message: "User is found" })
            : res.status(400).json({ staus: 400, message: "User is not found" });

    } catch (error) {
        res.status(500).json({ status: 500, message: "Something went wrong..." });
    }
    finally {
        client.close();
    }
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

const getWorkout = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("MakeSweat");

        const { _id } = req.params;
        
        const result = await db.collection("workouts").findOne({ _id });

        result
            ? res.status(200).json({ status: 200, result, message: "Workout is found" })
            : res.status(400).json({ staus: 400, message: "Workout is not found" });

    } 
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message });
    }
    finally {
        client.close();
    }
};

const getAllWorkouts = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {

        await client.connect();

        const db = client.db("MakeSweat");

        const workouts = await db.collection("workouts").find().toArray();
        
        workouts
            ? res.status(200).json({ status: 200, data: workouts, message: "Success" })
            : res.status(404).json({ status: 404, message: "Workouts are not found" });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message })
    }

    finally {
        client.close();
    }
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
        const userQuery = { "_id": userId, "workouts._id.exercises": exerciseId};

        const userNewVal = { $set: { "exercises.$.description": description }};

        const updatedUser = await db.collection("users").updateOne(userQuery, userNewVal);

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

const deleteWorkout = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);
    
    try {
        await client.connect();

        const { _id } = req.params;

        const db = client.db("MakeSweat");

        //find a workout that we are going to delete
        const workoutToDelete = await db.collection("workouts").findOne({ _id });

        const query = { _id: workoutToDelete.userId}
        
        const newValues = { $pull: { "workouts": {"_id": _id} }};
        
        //updating the array of user's workouts - removing one
        const workoutsUpdated = await db.collection("users").updateOne(query, newValues);
        
        //deleting workout
        const result = await db.collection("workouts").deleteOne({ _id });

        
        if (result && workoutsUpdated){
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

const getMotivatingQuote = async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://bodybuilding-quotes1.p.rapidapi.com/random-quote',
            headers: {
                'x-rapidapi-host': 'bodybuilding-quotes1.p.rapidapi.com',
                'x-rapidapi-key': QUOTE_OF_THE_DAY_KEY
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            const result = JSON.parse(body);

            result
                ? res.status(200).json({ status: 200, data: result, message: "Success" })
                : res.status(404).json({ status: 404, data: result, message: "Quote is not found" });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message })
    }
}

const handleLogIn = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("MakeSweat");

        const { userEmail, userPassword } = req.body;

        //findint in DB email of user that tries to sign in
        const user = await db.collection("users").findOne({ email: userEmail });
        
        if (!user){
            // if email was not found
            return res.status(400).json({ status: 400, message: "User was not found!" })
        }
        else if (user.password !== userPassword){
            // if tha password is not matching
            return res.status(400).json({ status: 400, message: "Password is incorrect!" })
        }
        else {
            //Succsess
            res.status(200).json({ status: 200, user, message: "You were successfully logged in!" })
        }
    } 
    
    catch (error) {
        res.status(500).json({ status: 500, message: "Something went wrong..." });
    }

    finally {
        client.close();
    }
};

module.exports = {
    getAllExercises,
    getExerciseById,
    getExerciseByName,
    getExerciseByEquipmentType,
    getExerciseByTarget,
    getExerciseByBodyPart,
    // getFilteredExercise,
    createNewUser,
    getUserById,
    updateUser, 
    deleteUser,
    createNewWorkout, 
    getWorkout,
    getAllWorkouts,
    updateWorkout, 
    deleteWorkout,
    addToWorkouts, 
    removeFromWorkouts,
    addToFavorite,
    removeFromFavorite,
    getMotivatingQuote, 
    handleLogIn
};

