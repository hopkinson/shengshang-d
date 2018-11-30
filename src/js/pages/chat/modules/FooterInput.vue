<!--
@Author: hopkinson
@Date:   2018-04-16T23:11:36+08:00
@Last modified by:   hopkinson
@Last modified time: 2018-10-28T16:54:22+08:00
-->



<style lang="css" scoped>
.operations {
    height: 120px;
    flex: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    border-top-width: 2px;
    border-top-style: solid;
    border-top-color: #DDD;
    background-color: #FFFFFF;
  }
  .input {
    width: 600px;
    height: 120px;
    padding-left: 30px;
    color: #606060;
    font-size: 40px;
  }
  .btn {
    justify-content: center;
  }
  .btn-text {
    text-align: center;
    color: #808080;
  }
  .btn-send {
    width: 120px;
    border-left-width: 2px;
    border-left-style: solid;
    border-left-color: #DDD;
    background-color: #F5F5F5;
  }
.btn-send:active {
    background-color: #E0E0E0;
}
</style>
<template>
<div class="operations">
    <input type="text" @focus="handleFocus" class="input" lines="2" singleline="false" placeholder="输入内容..." v-model="Form.content" @return="handleSend" />
    <div class="btn btn-send" @click="handleSend" v-if="Form.content">
        <c-icon value="&#xe9a0;" color="#808080" size="70px" class="btn-text" @click="handleSend"></c-icon>
    </div>
</div>
<!-- TODO: 2期 -->
<!-- <wxc-cell :cell-style="setCellStyle" v-if="Show.menu">
        <div slot="label" class="cs-input__menu--item">
            <c-icon value="&#xe71b;" size="100px"></c-icon>
            <text class="cs-input__menu--text">定位</text>
        </div>
    </wxc-cell> -->
</template>
<script>
const dom = weex.requireModule('dom')
export default {
    data() {
        return {
            Show: {
                menu: false
            },
            Form: {
                content: ''
            }
        }
    },
    methods: {
        handleSend() {
            const value = this.Form.content && this.Form.content.trim()
            if (value) {
                this.$emit('input', this.Form.content)
                this.Form.content = ''
            }
        },
        handleFocus() {
            this.$event.emit('scroller-bottom')
            this.Show.menu = false
        }
    },
    computed: {
        setCellStyle() {
            return {
                height: 'auto',
                padding: '14px',
                margin: 0
            }
        }
    }
}
</script>
