"use strict";
const {
    webRequest
} = require("./webrequest");
const queries = require("./constants/queries.json");

const channelToBlockchain = (authKey, channel) => {
    return getChannelInformation(authKey, channel).then((blockchain) => {
        return blockchain.data.userByDisplayName.username;
    }).catch(e => {
        return e;
    });
};

const generatePostData = (operationName, variables) => {
    const postData = JSON.stringify({
        operationName: operationName,
        query: queries[operationName],
        variables: variables
    });
    return postData;
};

const followChannel = (authKey, channel) => {
    const postData = generatePostData("FollowUser", {
        streamer: channel
    });
    return new Promise((resolve, reject) => {
        webRequest(authKey, postData).then((result) => {
            result.data.follow.err !== null ? reject(new Error(result.data.follow.err)) : resolve(true);
        }).catch(reject);
    });
};

const unfollowChannel = (authKey, channel) => {
    const postData = generatePostData("UnfollowUser", {
        streamer: channel
    });
    return new Promise((resolve, reject) => {
        webRequest(authKey, postData).then((result) => {
            result.data.follow.err !== null ? reject(new Error(result.data.follow.err)) : resolve(true);
        }).catch(reject);
    });
};

const getChannelInformation = (authKey, channel) => {
    const postData = generatePostData("LivestreamPage", {
        displayname: channel,
        add: false,
        isLoggedIn: true
    });
    return new Promise((resolve, reject) => {
        webRequest(authKey, postData).then((result) => {
            result.errors !== undefined ? reject(new Error(result.errors["0"].message)) : resolve(result);
        }).catch(reject);
    });
};

const getChannelViewers = (authKey, channel) => {
    const postData = generatePostData("LivestreamPage", {
        displayname: channel,
        add: false,
        isLoggedIn: true
    });
    return new Promise((resolve, reject) => {
        webRequest(authKey, postData).then((result) => {
            if (!result.errors) {
                if (!result.data.userByDisplayName || !result.data.userByDisplayName.livestream) {
                    reject(new Error("Livestream not available"));
                } else {
                    resolve(result.data.userByDisplayName.livestream.watchingCount);
                }
            } else {
                reject(new Error(result.errors["0"].message));
            }
        }).catch(reject);
    });
};

const getChannelFollowers = (authKey, channel, amountToShow) => {
    const postData = generatePostData("LivestreamProfileFollowers", {
        displayname: channel,
        sortedBy: "AZ",
        first: amountToShow,
        isLoggedIn: true
    });
    return new Promise((resolve, reject) => {
        webRequest(authKey, postData).then((result) => {
            if (result.data.userByDisplayName.followers) {
                const followers = result.data.userByDisplayName.followers.list;
                resolve(followers);
            } else {
                reject(new Error(result.errors["0"].message));
            }
        }).catch(reject);
    });
};

const getChannelReplays = (authKey, channel, amountToShow) => {
    const postData = generatePostData("LivestreamProfileReplay", {
        displayname: channel,
        first: amountToShow
    });
    return new Promise((resolve, reject) => {
        webRequest(authKey, postData).then((result) => {
            result.errors !== undefined ?
                reject(new Error(result.errors["0"].message)) :
                resolve(result.data.userByDisplayName.pastBroadcasts.list);
        }).catch(reject);
    });
};

const getChannelVideos = (authKey, channel, amountToShow) => {
    const postData = generatePostData("LivestreamProfileVideo", {
        displayname: channel,
        sortedBy: "Trending",
        first: amountToShow
    });
    return new Promise((resolve, reject) => {
        webRequest(authKey, postData).then((result) => {
            result.errors !== undefined ?
                reject(new Error(result.errors["0"].message)) :
                resolve(result.data.userByDisplayName.videos.list);
        });
    });
};

const getChannelWallet = (authKey, channel, amountToShow) => {
    const postData = generatePostData("LivestreamProfileWallet", {
        displayname: channel,
        first: amountToShow,
        isLoggedIn: true
    });
    return new Promise((resolve, reject) => {
        webRequest(authKey, postData).then((result) => {
            if (result.data.userByDisplayName) {
                const details = {
                    transactions: result.data.userByDisplayName.transactions,
                    wallet: result.data.userByDisplayName.wallet
                };
                resolve(details);
            }
        }).catch(reject);
    });
};

const getTopContributors = (authKey, channel, amountToShow, rule) => {
    const postData = generatePostData("TopContributors", {
        displayname: channel,
        first: amountToShow,
        rule: rule,
        queryStream: false
    });
    return new Promise((resolve, reject) => {
        webRequest(authKey, postData).then((result) => {
            result.errors !== undefined ? reject(new Error(result.errors["0"].message)) : resolve(result.data.userByDisplayName.topContributions.list);
        }).catch(reject);
    });
};

const sendChatMessage = (authKey, channel, msg) => {
    const msgError = "Can't send your message, make sure there is a valid API KEY";
    const postData = generatePostData("SendStreamChatMessage", {
        input: {
            streamer: channel,
            message: msg,
            roomRole: "Moderator",
            subscribing: true
        }
    });
    return new Promise((resolve, reject) => {
        webRequest(authKey, postData).then((result) => {
            if (result.errors !== undefined || result.data.sendStreamchatMessage.message === null) {
                reject(new Error(msgError));
            } else {
                resolve(true);
            }
        }).catch(reject);
    });
};

module.exports = {
    channelToBlockchain,
    followChannel,
    unfollowChannel,
    generatePostData,
    getChannelInformation,
    getChannelFollowers,
    getChannelViewers,
    getChannelReplays,
    getChannelVideos,
    getChannelWallet,
    getTopContributors,
    sendChatMessage
};