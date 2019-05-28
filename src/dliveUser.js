const {
    webRequest
} = require("./webrequest")
const util = require("./util")

class DliveUser {
    constructor(authKey) {
        this.authKey = authKey
    }

    getGlobalStatus() {
        return new Promise((resolve, reject) => {
            if (!this.authKey) reject(new TypeError('Access token was not provided'))
            const postData = util.generatePostData('MeGlobal', {})
            webRequest(this.authKey, postData).then(res => {
                res.errors === undefined ? resolve(res.data.me) : reject(res.errors['0'].message);
            }).catch(reject)
        })
    }

    getDashboard() {
        return new Promise((resolve, reject) => {
            if (!this.authKey) reject(new TypeError('Access token was not provided'))
            const postData = util.generatePostData('MeDashboard', {
                isLoggedIn: true
            })
            webRequest(this.authKey, postData).then(res => {
                res.errors === undefined ? resolve(res.data.me) : reject(res.errors['0'].message);
            }).catch(reject)
        })
    }

    getBalance() {
        return new Promise((resolve, reject) => {
            if (!this.authKey) reject(new TypeError('Access token was not provided'))
            const postData = util.generatePostData('MeBalance', {
                isLoggedIn: true
            });
            webRequest(this.authKey, postData).then(res => {
                res.errors === undefined ? resolve(res.data.me.wallet.balance) : reject(res.errors['0'].message);
            }).catch(reject);
        });
    }

    getSubscribers(amountToShow = 10) {
        return new Promise((resolve, reject) => {
            if (!this.authKey) reject(new TypeError('Access token was not provided'))
            const postData = util.generatePostData('MeSubscribing', {
                first: amountToShow
            });
            webRequest(this.authKey, postData).then(res => {
                if (res.data.me) {
                    let data = res.data.me.subscribing;
                    const subscribers = {
                        total: data.totalCount,
                        list: data.list
                    };
                    resolve(subscribers);
                } else {
                    reject(res.errors['0'].message);
                }
            }).catch(reject);
        });
    }

    getPartnerProgress() {
        return new Promise((resolve, reject) => {
            if (!this.authKey) reject(new TypeError('Access token was not provided'))
            const postData = util.generatePostData('MePartnerProgress', {});
            webRequest(this.authKey, postData).then(res => {
                res.errors === undefined ? resolve(res.data.me.private) : reject(res.errors['0'].message);
            }).catch(reject);
        });
    }

    getFollowingLivestreams (amountToShow = 5) {
        return new Promise((resolve, reject) => {
            if (!this.authKey) reject(new TypeError('Access token was not provided'))
            const postData = util.generatePostData('FollowingPageLivestreams', {
                first: amountToShow
            });
            webRequest(this.authKey, postData).then(res => {
                res.errors === undefined ? resolve(res.data.livestreamsFollowing.list) : reject(res.errors['0'].message);
            }).catch(reject);
        });
    }

    getFollowingVideos (amountToShow = 5) {
        return new Promise((resolve, reject) => {
            if (!this.authKey) reject(new TypeError('Access token was not provided'))
            const postData = util.generatePostData('FollowingPageVideos', {
                first: amountToShow
            });
            webRequest(this.authKey, postData).then(res => {
                res.errors === undefined ? resolve(res.data.videosFollowing.list) : reject(res.errors['0'].message);
            }).catch(reject);
        });
    }
}

module.exports = {
    dliveUser: DliveUser
};