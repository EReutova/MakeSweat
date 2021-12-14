const request = require("request");

require("dotenv").config();

const { QUOTE_OF_THE_DAY_KEY } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const fetch = require("node-fetch");

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
};

module.exports = {
    getMotivatingQuote
};
