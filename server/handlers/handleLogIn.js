require("dotenv").config();

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const { MONGO_URI } = process.env;
const { QUOTE_OF_THE_DAY_KEY } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

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
    handleLogIn
};
