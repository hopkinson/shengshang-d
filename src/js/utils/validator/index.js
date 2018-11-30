import strategies from './rules'
var modal = weex.requireModule('bmModal')
export class Validator {
    constructor(strategies) {
        this.cache = []
    }
    add(value, rules) {
        if (!rules instanceof Array)
            throw 'rules should be Array'
        for (var i = 0, rule; rule = rules[i++];) {
            ((rule) => {
                var strategyArr = rule.strategy.split(':')
                var errorMsg = rule.errorMsg
                this.cache.push(() => {
                    var strategy = strategyArr.shift();
                    strategyArr.unshift(value)
                    strategyArr.push(errorMsg)
                    return strategies[strategy].apply(null, strategyArr)
                })
            })(rule)
        }
    }
    start() {
        for (var i = 0, fn; fn = this.cache[i++];) {
            var errorMsg = fn()
            if (errorMsg) {
                return errorMsg
            }
        }
    }
}
