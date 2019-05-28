"use strict";
const EventEmitter = require("events");
const https = require("https");
const Websocket = require("websocket");

class dlive extends EventEmitter {
    constructor () {
        super();
        this.authkey = "";
        this.channel = "";
        this.https = https;
        this.WebsocketClient = Websocket.client;
        this.client = new this.WebsocketClient();
    }

    get getAuthkey() {
        return this.authkey;
    }

    get getChannel() {
        return this.channel;
    }

    get getBlockChainUsername() {
        return this.blockChainUsername;
    }

    set setBlockChainUsername(username) {
        this.blockChainUsername = username;
    }

    set setAuthkey(authkey) {
        this.authkey = authkey;
    }

    set setChannel(channel) {
        this.channel = channel;
    }
}

module.exports = {
    dlive: dlive
};