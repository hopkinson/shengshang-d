<style lang="css" scoped>

.cs-bar {
    align-items: center;
    flex-direction: row;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
}
.cs-tip {
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.cs-bar__item {
    background-color: #FFF3CD;
    padding: 20px;
    border-radius: 10px;
    border-style: solid;
    border-color: #eaeaea;
    border-width: 1px;
    justify-content: center;
    align-items: center;
    overflow: auto;
}
.cs-tip__item {
    background-color: #d8d8d8;
    padding: 6px;
}

.cs-bar--text {
    font-size: 32px;
    word-wrap: break-word;
    max-width: 500px;
    line-height: 40px;
}

.cs-tip--text {
    font-size: 24px;
    color: #fff;
    text-overflow: ellipsis;
    lines:1;
}
</style>

<template>
<div :class="setStyle">
    <div :class="setItemSyle">
        <text :class="setTextStyle">{{text}}</text>
    </div>
</div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'bar'
        }
    },
    computed: {
        setStyle() {
            return ['cs-bar', this.type === 'tip' ? 'cs-tip' : '']
        },
        setItemSyle() {
            return ['cs-bar__item', this.type === 'tip' ? 'cs-tip__item' : '']
        },
        setTextStyle() {
            return ['cs-bar--text', this.type === 'tip' ? 'cs-tip--text' : '']
        }
    },
    methods: {

    },
    components: {

    }
}
</script>
