"use strict";
const util = require("./util");
const languages = require("./constants/languages.json").languages;
const { webRequest } = require("./webrequest");

class dliveUtil {
    constructor (authKey) {
        this.authKey = authKey;
    }

    getDliveGlobalLanguages () {
        return new Promise((resolve) => {
            resolve(languages);
        });
    }

    getDliveStreamingCategories () {
        return new Promise((resolve, reject) => {
            if (!this.authKey) {
                reject(new TypeError("No Access token was provided"));
            }
            this.searchCategory("", 125).then(
                (result) => { // Temporarily till i find another solution (Max categories are 125)
                    resolve(result);
                }).catch(reject);
        });
    }

    getTrendingStreams (language, showNSFW = false, amountToShow = 10) {
        return new Promise((resolve, reject) => {
            if (!this.authKey) {
                reject(new TypeError("No Access token was provided"));
            }
            language = language.toLowerCase();
            languages.forEach(el => {
                if (el.language.toLowerCase() === language || el.code.toLowerCase() === language) {
                    language = el.code;
                }
            });
            if (language) {
                const postData = util.generatePostData("HomePageLivestream",
                    {
                        first: amountToShow,
                        showNSFW: showNSFW,
                        userLanguageCode: language
                    });
                webRequest(this.authKey, postData).then((result) => {
                    result.errors !== undefined
                        ? reject(new Error(result.errors["0"].message))
                        : resolve(result.data.livestreams.list);
                }).catch(reject);
            } else {
                reject(new TypeError("Invalid language code provided"));
            }
        });
    }

    getRisingCreators () {
        return new Promise((resolve, reject) => {
            if (!this.authKey) {
                reject(new TypeError("No Access token was provided"));
            }
            const postData = util.generatePostData("HomePageLeaderboard", {});
            webRequest(this.authKey, postData).then((result) => {
                result.errors !== undefined
                    ? reject(new Error(result.errors["0"].message))
                    : resolve(result.data.leaderboard.list);
            }).catch(reject);
        });
    }

    searchTerm (term, amountToShow = 10) {
        return new Promise((resolve, reject) => {
            if (!this.authKey) {
                reject(new TypeError("No Access token was provided"));
            }
            const postData = util.generatePostData("SearchPage",
                {
                    text: term,
                    first: amountToShow,
                    isLoggedIn: true
                });
            webRequest(this.authKey, postData).then((result) => {
                const searchData = result.data.search;
                const results = {};
                Object.keys(searchData).forEach((key) => {
                    if (searchData[key]) {
                        results[key] = searchData[key].list;
                    }
                });
                resolve(results);
            }).catch(reject);
        });
    }

    searchCategory (term, amountToShow = 10) {
        return new Promise((resolve, reject) => {
            if (!this.authKey) {
                reject(new TypeError("No Access token was provided"));
            }
            const postData = util.generatePostData("BrowsePageSearchCategory",
                {
                    text: term,
                    first: amountToShow
                });
            webRequest(this.authKey, postData).then((result) => {
                result.errors !== undefined
                    ? reject(new Error(result.errors["0"].message))
                    : resolve(result.data.search.trendingCategories.list);
            }).catch(reject);
        });
    }
}

module.exports = {
    dliveUtil: dliveUtil
};