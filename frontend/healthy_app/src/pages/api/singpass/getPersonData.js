const fs = require("fs");
var MyInfoConnector = require("myinfo-connector-v4-nodejs");

const config = require("./config");
const connector = new MyInfoConnector(config.MYINFO_CONNECTOR_CONFIG);

export default async function handler(req, res) {
    try {
        console.log(5);
        // get variables from frontend
        var authCode = req.body.authCode;

        //retrieve code verifier from session cache
        // var codeVerifier = sessionIdCache[req.cookies.sid];
        var codeVerifier = req.body.codeVerifier;
        console.log("Calling MyInfo NodeJs Library...".green);

        // retrieve private siging key and decode to utf8 from FS
        let privateSigningKey = fs.readFileSync(
            config.APP_CONFIG.DEMO_APP_CLIENT_PRIVATE_SIGNING_KEY,
            "utf8"
        );

        let privateEncryptionKeys = [];
        // retrieve private encryption keys and decode to utf8 from FS, insert all keys to array
        readFiles(
            config.APP_CONFIG.DEMO_APP_CLIENT_PRIVATE_ENCRYPTION_KEYS,
            (filename, content) => {
                privateEncryptionKeys.push(content);
            },
            (err) => {
                throw err;
            }
        );

        console.log(25);
        //call myinfo connector to retrieve data
        console.log(
            authCode,
            codeVerifier,
            privateSigningKey,
            privateEncryptionKeys
        );

        let personData = await connector.getMyInfoPersonData(
            authCode,
            codeVerifier,
            privateSigningKey,
            privateEncryptionKeys
        );

        console.log(25);
        /*
          P/s: Your logic to handle the person data ...
        */
        console.log(
            "--- Sending Person Data From Your-Server (Backend) to Your-Client (Frontend)---:"
                .green
        );

        console.log(25);

        console.log(JSON.stringify(personData)); // log the data for demonstration purpose only
        res.status(200).send(personData); //return personData
    } catch (error) {
        console.log("---MyInfo NodeJs Library Error---".red);
        console.log(error);
        res.status(500).send({
            error: error,
        });
    }

    // let cacheCtl = "no-cache";
    // let contentType = "application/x-www-form-urlencoded";
    // let method = constant.HTTP_METHOD.POST;
    // let clientAssertionType =
    //     "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
    // let jktThumbprint = await this.securityHelper.generateJwkThumbprint(
    //     sessionPopKeyPair.publicKey
    // );
    // let strParams;
    // // assemble params for Token API
    // strParams =
    //     `grant_type=authorization_code` +
    //     "&code=" +
    //     authCode +
    //     "&redirect_uri=" +
    //     CONFIG.REDIRECT_URL +
    //     "&client_id=" +
    //     CONFIG.CLIENT_ID +
    //     "&code_verifier=" +
    //     codeVerifier +
    //     "&client_assertion_type=" +
    //     clientAssertionType +
    //     "&client_assertion=" +
    //     (await this.securityHelper.generateClientAssertion(
    //         CONFIG.TOKEN_URL,
    //         CONFIG.CLIENT_ID,
    //         privateSigningKey,
    //         jktThumbprint
    //     ));

    // let params = querystring.parse(strParams);
    // let dPoP = await this.securityHelper.generateDpop(
    //     CONFIG.TOKEN_URL,
    //     null,
    //     null,
    //     constant.HTTP_METHOD.POST,
    //     sessionPopKeyPair
    // );

    // // assemble headers for Token API
    // let strHeaders = `Content-Type=${contentType}&Cache-Control=${cacheCtl}&DPoP=${dPoP}`;
    // let headers = querystring.parse(strHeaders);

    // // invoke Token API
    // let tokenURL =
    //     CONFIG.USE_PROXY && CONFIG.USE_PROXY == "Y"
    //         ? CONFIG.PROXY_TOKEN_URL
    //         : CONFIG.TOKEN_URL;
    // let parsedTokenUrl = urlParser.parse(tokenURL);
    // let tokenDomain = parsedTokenUrl.hostname;
    // let tokenRequestPath = parsedTokenUrl.path;

    // let accessToken = await requestHandler.getHttpsResponse(
    //     tokenDomain,
    //     tokenRequestPath,
    //     headers,
    //     method,
    //     params
    // );
    // return accessToken;
}

//function to read multiple files from a directory
function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.readFile(dirname + filename, "utf8", function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(filename, content);
            });
        });
    });
}
