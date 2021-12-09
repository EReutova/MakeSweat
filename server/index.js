"use strict";

const express = require("express");
const morgan = require("morgan");
const { 
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
    // updateWorkout, 
    addToWorkouts, 
    removeFromWorkouts,
    deleteWorkout,
    addToFavorite,
    removeFromFavorite,
    getMotivatingQuote,
    handleLogIn
} = require("./handlers")


express()

    .use(morgan("tiny"))
    .use(express.json())

    .use(express.static("public"))

    // ---------------------------------
    // All the encpoints are here 👇

    // get all exercises USED
    .get("/exercises", getAllExercises)

    // get exercise by id USED
    .get("/exercise/:id", getExerciseById)

    // get exercise by name
    .get("/exercises/name/:name", getExerciseByName)

    // get exercises by equipment type 
    .get("/exercises/equipment/:type", getExerciseByEquipmentType)

    // get exercises by target 
    .get("/exercises/target/:target", getExerciseByTarget)

    // get exercises by bodyPart 
    .get("/exercises/bodyPart/:bodyPart", getExerciseByBodyPart)

    // get filtered exercises
    // .get("/search/:equipment/:target/:bodyPart", getFilteredExercise)

    // create a new user USED
    .post("/create/user", createNewUser)

    // get user by id USED
    .get("/user/:_id", getUserById)

    // update a user
    .patch("/user/:_id", updateUser)

    // delete a user
    .delete("/user/:_id", deleteUser)

    // create a new workout USED
    .post("/create/workout", createNewWorkout)

    // get a workout USED
    .get("/workout/:_id", getWorkout)

    //get all workouts
    .get("/workouts", getAllWorkouts)

    // update a workout ???? need help with it
    // .patch("/workout/:_id", updateWorkout)

    // delete workout 
    .delete("/workout/:_id", deleteWorkout)

    //add exercise to workout
    .post("/add-to-workout", addToWorkouts)

    //remove exercise from workout
    .delete("/remove-from-workout", removeFromWorkouts)

    //add exercise in favorites
    .post("/add-favorite", addToFavorite)

    //remove exercise from favorites
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






