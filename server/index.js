"use strict";

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");


// Importing handlers
const { getAllExercises } = require("./handlers/getAllExercises");
const { getExerciseById } = require("./handlers/getExerciseById");
const { createNewUser } = require("./handlers/createNewUser");
const { getUserById } = require("./handlers/getUserById");
const { updateUser } = require("./handlers/updateUser");
const { deleteUser } = require("./handlers/deleteUser");
const { createNewWorkout } = require("./handlers/createNewWorkout");
// const { getWorkout } = require("./handlers/getWorkout");
const { getAllWorkouts } = require("./handlers/getAllWorkouts");
const { updateWorkout } = require("./handlers/updateWorkout");
const { saveWorkout } = require("./handlers/saveWorkout");
const { addToWorkouts } = require("./handlers/addToWorkouts");
const { removeFromWorkouts } = require("./handlers/removeFromWorkouts");
const { deleteWorkout } = require("./handlers/deleteWorkout");
const { addToFavorite } = require("./handlers/addToFavorite");
const { removeFromFavorite } = require("./handlers/removeFromFavorite");
const { getMotivatingQuote } = require("./handlers/getMotivatingQuote");
const { handleLogIn } = require("./handlers/handleLogIn");


const { 
    // getAllExercises, 
    // getExerciseById, 
    getExerciseByName, 
    getExerciseByEquipmentType, 
    getExerciseByTarget, 
    getExerciseByBodyPart, 
    // createNewUser, 
    // getUserById, 
    // updateUser, 
    // deleteUser,
    // createNewWorkout, 
    getWorkout,
    // getAllWorkouts,
    // updateWorkout, 
    // addToWorkouts, 
    // removeFromWorkouts,
    // deleteWorkout,
    // addToFavorite,
    // removeFromFavorite,
    // getMotivatingQuote,
    // handleLogIn
} = require("./handlers")


express()

    .use(morgan("tiny"))
    .use(express.json())
    .use(helmet())

    .use(express.static("public"))

    // ---------------------------------
    // All the encpoints are here 👇

    // get all exercises USED
    .get("/exercises", getAllExercises)

    // get exercise by id USED
    .get("/exercise/:_id", getExerciseById)

    // get exercise by name
    .get("/exercises/name/:name", getExerciseByName)

    // get exercises by equipment type 
    .get("/exercises/equipment/:type", getExerciseByEquipmentType)

    // get exercises by target 
    .get("/exercises/target/:target", getExerciseByTarget)

    // get exercises by bodyPart 
    .get("/exercises/bodyPart/:bodyPart", getExerciseByBodyPart)

    // create a new user USED
    .post("/create/user", createNewUser)

    // get user by id USED
    .get("/user/:_id", getUserById)

    // update a user USED
    .patch("/user/:_id", updateUser)

    // delete a user
    .delete("/user/:_id", deleteUser)

    // create a new workout USED
    .post("/create/workout", createNewWorkout)

    // get a workout USED
    .get("/workout/:_id", getWorkout)

    //get all workouts USED
    .get("/workouts", getAllWorkouts)

    // update a workout USED
    .patch("/workout/:_id", updateWorkout)

    //save Workout to user's workouts
    .put("/save-workout", saveWorkout)

    // delete workout USED
    .delete("/workout/:_id", deleteWorkout)

    //add exercise to workout USED
    .put("/add-to-workout", addToWorkouts)

    //remove exercise from workout USED
    .delete("/remove-from-workout", removeFromWorkouts)

    //add exercise in favorites USED
    .put("/add-favorite", addToFavorite)

    //remove exercise from favorites USED
    .delete("/remove-favorite", removeFromFavorite)

    // get random motivating quote USED
    .get("/motivating-quote", getMotivatingQuote)

    //endpoint for log in USED
    .post("/login", handleLogIn)

    // this is our catch all endpoint.
    .get("*", (req, res) => {
        res.status(404).json({
            status: 404,
            message: "This is obviously not what you are looking for.",
        });
    })

    // Node spins up our server and sets it to listen on port 8000.
    .listen(8000, () => console.log(`Listening on port 8000`));






