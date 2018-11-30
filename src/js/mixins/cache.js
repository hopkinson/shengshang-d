export default {
    computed : {
        device() {
            return this.$storage.getSync('device') || null
        },
        loginName() {
            return this.$storage.getSync('loginName') || null
        },
        userToken() {
            return this.$storage.getSync('userToken') || null
        },
        dict() {
            return this.$storage.getSync('dict') || null
        },
        userGeo() {
            return this.$storage.getSync('userGeo') || null
        },
        userInfo() {
            return this.$storage.getSync('userInfo') || null
        },
        showAd() {
            return this.$storage.getSync('showAd') || null
        },
        customGeo() {
            return this.$storage.getSync('customGeo') || null
        }
    }
}
