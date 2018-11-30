export default {
    data: () => ({curHomeBackTriggerTimes: 1, maxHomeBackTriggerTimes: 2}),
    created() {
        this.androidFinishApp()
    },
    methods: {
        androidFinishApp() {
            const globalEvent = weex.requireModule('globalEvent')
            globalEvent.addEventListener('homeBack', options => {
                (this.curHomeBackTriggerTimes === this.maxHomeBackTriggerTimes) && this.$router.finish()
                this.curHomeBackTriggerTimes++;
            })
        }
    }
}
