const strategies = {
    // 必填
    isNonEmpty(value, errorMsg) {
        return value === '' ?
            errorMsg :
            void 0
    },
    // 最小长度
    minLength(value, length, errorMsg) {
        return value.length < length ?
            errorMsg :
            void 0
    },
    // 最大长度
    maxLength(value, length, errorMsg) {
        return value.length > length ?
            errorMsg :
            void 0
    },
    // mobile
    isMoblie(value, errorMsg) {
        return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ?
            errorMsg :
            void 0
    },
    // e-mail
    isEmail(value, errorMsg) {
        return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?
            errorMsg :
            void 0
    },
    // 身份证
    isIDCard(value, errorMsg) {
        return !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) ?
            errorMsg :
            void 0
    }
}
export default strategies
