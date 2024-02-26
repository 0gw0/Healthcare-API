var MyInfoConnector = require("myinfo-connector-v4-nodejs");
// const crypto = require("crypto");

const config = require("./config");
const connector = new MyInfoConnector(config.MYINFO_CONNECTOR_CONFIG);

// var sessionIdCache = {};

export default function handler(req, res) {
    try {
        // call connector to generate code_challenge and code_verifier
        let pkceCodePair = connector.generatePKCECodePair();

        // create a session and store code_challenge and code_verifier pair
        // let sessionId = crypto.randomBytes(16).toString("hex");

        // sessionIdCache[sessionId] = pkceCodePair.codeVerifier;

        // establish a frontend session with browser to retrieve back code_verifier
        // res.cookie("sid", sessionId);

        //send code code_challenge to frontend to make /authorize call
        res.status(200).send([
            pkceCodePair.codeChallenge,
            pkceCodePair.codeVerifier,
        ]);
    } catch (error) {
        console.log("Error".red, error);
        res.status(500).send({
            error: error,
        });
    }
}
