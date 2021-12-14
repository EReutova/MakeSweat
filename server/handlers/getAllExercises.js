require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getAllExercises = async (req, res) => {
    const { searchRequest, start, limit, equipment, target, bodyPart } = req.query;
    console.log(req.query)

    let startNum = Number(start);
    let limitNum = Number(limit);

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("MakeSweat");
        const result = await db.collection("exercises").find().toArray();
    
        let filteredResult = result;


        if (equipment){
            filteredResult = filteredResult.filter((item) => {
                return item.equipment.toLowerCase().includes(equipment.toLowerCase())
            })
        }

        if (target) {
            filteredResult = filteredResult.filter((item) => {
                return item.target.toLowerCase().includes(target.toLowerCase())
            })
        }

        if (bodyPart) {
            filteredResult = filteredResult.filter((item) => {
                return item.bodyPart.toLowerCase().includes(bodyPart.toLowerCase())
            })
        }

        if (searchRequest) {
            filteredResult = filteredResult.filter((item) => {
                return (
                    item.equipment.toLowerCase().includes(searchRequest.toLowerCase()) ||
                    item.target.toLowerCase().includes(searchRequest.toLowerCase()) ||
                    item.bodyPart.toLowerCase().includes(searchRequest.toLowerCase()) ||
                    item.name.toLowerCase().includes(searchRequest.toLowerCase()) 
                )        
            })
        }

        let newResult = filteredResult.slice(startNum, limitNum+startNum);

        result
        ? res.status(200).json({ status: 200, data: newResult, message: "Success" })
        : res.status(404).json({ status: 404, message: "Exercise is not found" });

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
    getAllExercises
};