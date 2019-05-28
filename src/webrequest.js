"use strict";
const https = require("https");

function generateOptions(authKey) {
    const options = {
        hostname: "graphigo.prd.dlive.tv",
        port: 443,
        path: "/",
        method: "POST",
        headers: {
            accept: "*/*",
            authorization: authKey,
            'content-type': "application/json",
            Origin: "https://dlive.tv"
        }
    };
    return options;
}

const webRequest = (authKey, postData) => {
    return new Promise(async (resolve) => {
        const options = generateOptions(authKey);
        const req = https.request(options,
            (res) => {
                res.setEncoding("utf-8");
                res.on("data",
                    (chunk) => {
                        resolve(JSON.parse(chunk))
                    });
            });
        await req.write(postData);
        req.end();
    });
};

module.exports = {
    webRequest
};