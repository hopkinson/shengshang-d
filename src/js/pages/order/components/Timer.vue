<!-- 计时 -->
<style lang="css" scoped>
.cs-timer--text{
  color: orange;
}
</style>
<template>
<text class="cs-timer--text">{{time | formatSecToTime}}</text>
</template>
<script>
export default {
    data: () => ({
        timer: null,
        time: 0
    }),
    props: {
        data: {
            type: Number
        }
    },
    watch: {
        data(val) {
            this.time = val
        }
    },
    created() {
        this.handleStart()
    },
    methods: {
        handleStart() //开始
        {
            this.timer = setInterval(this.handleTimer, 1000)
        },
        handleStop() {
            clearInterval(this.timer)
        },
        handleTimer() {
            this.time++
        }
    },
    components: {

    }
}
</script>
