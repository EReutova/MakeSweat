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

// use this package to generate unique ids
const { v4: uuidv4 } = require("uuid");

const getAllExercises = async (req, res) => {
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

            result
                ? res.status(200).json({ status: 200, data: result, message: "Success" })
                : res.status(404).json({ status: 404, data: result, message: "Exercise is not found" });
            console.log(result)
        });
    }
    catch (err) {
        console.log(err.stack);
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
            console.log(result)
        });
    }
    catch (err) {
        console.log(err.stack);
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
        console.log(err.stack);
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
        console.log(err.stack);
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
        console.log(err.stack);
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
        console.log(err.stack);
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
        else if (typeof age !== "number") {
            return res.status(400).json({ status: 400, message: "Age is not a number" });
        }
        else if (!gender) {
            return res.status(400).json({ status: 400, message: "Please select a gender" });
        }
        else if (typeof weight !== "number") {
            return res.status(400).json({ status: 400, message: "Please provide your weight in kg/lb" });
        }

        // Creates new _id for user
        const _id = uuidv4();

        const newUser = { _id, ...req.body };

        // Pushes user to "users" collection
        const result = await db.collection("users").insertOne(newUser);

        result
            ? res.status(201).json({ status: 201, _id, newUser, message: "Success! New user was added!" })
            : res.status(400).json({ status: 400, message: "Something went wrong! Please provide valid data!" });
    }
    catch (error) {
        console.log(error, "error")
        res.status(500).json({ status: 500, message: "Something went wrong 😭", error });
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
            ? res.status(200).json({ status: 200, result, message: "Used is found" })
            : res.status(400).json({ staus: 400, message: "User is not found" });

    } catch (error) {
        res.status(500).json({ status: 500, message: "Something went wrong 😭" });
    }
    finally {
        client.close();
    }
};
//************** */
// updateUser, 


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
        res.status(500).json({ status: 500, data: err.message });
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
        console.log(err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message })
    }
}
// createNewWorkout, 
// getWorkout,
// updateWorkout, 
// deleteWorkout 


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
    // updateUser, 
    deleteUser,
    // createNewWorkout, 
    // getWorkout,
    // updateWorkout, 
    // deleteWorkout,
    getMotivatingQuote
};

