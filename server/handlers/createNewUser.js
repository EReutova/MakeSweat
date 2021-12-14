require("dotenv").config();

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const createNewUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    //generating random password
    let number = Math.round(Math.random()*10);
    const nouns = ["team", "dirt", "wilderness", "noise", "cover", "laborer", "waste", "scarf", "friction", "jar", "impulse", "truck", "trains", "teaching", "base", "chicken", "quilt", "wing", "queen", "word", "vegetable", "floor", "wren", "pin"];
    let randomNounOne = nouns[Math.floor(Math.random() * nouns.length)];
    let randomNounTwo = nouns[Math.floor(Math.random() * nouns.length)];
    let randomNounThree = nouns[Math.floor(Math.random() * nouns.length)];
    let randomNounFour = nouns[Math.floor(Math.random() * nouns.length)];
    let randomPassword = `${randomNounOne}-${randomNounTwo}-${randomNounThree}-${randomNounFour}-${number}`;

    try {

        await client.connect();

        const db = client.db("MakeSweat");
        
        const { name, email, age, gender, weight, password, confirmation, workouts, favorites } = req.body;
        
        //Validation
        if (name.length <= 2) {
            return res.status(400).json({ status: 400, message: "Please provide your full name" });
        }
        else if (!age) {
            return res.status(400).json({ status: 400, message: "Please enter your age" });
        }
        else if (!gender) {
            return res.status(400).json({ status: 400, message: "Please select a gender" });
        }
        else if (!weight) {
            return res.status(400).json({ status: 400, message: "Please enter your weight in kg" });
        }
        else if (!email.includes("@")) {
            return res.status(400).json({ status: 400, message: "Please provide valid email" });
        }
        else if (!password || !confirmation){
            return res.status(400).json({ status: 400, message: "Please enter your password" });
        }
        else if (password.length < 10) {
            return res.status(400).json({ status: 400, message: `Your password is too short! Try this ${randomPassword}`});
        }
        else if (password !== confirmation){
            return res.status(400).json({ status: 400, message: `You password is not matching confirmation!`});
        }
        
        // Creates new _id for user
        const _id = uuidv4();
        
        const newUser = { 
            _id, 
            name: name, 
            age: age, 
            gender: gender, 
            weight: weight, 
            email: email, 
            password: password, 
            workouts: workouts,
            favorites: favorites
        };
        
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

module.exports = {
    createNewUser
};
