<style lang="css" scoped>
.cs-list{
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
.cs-list__desc{
  font-size: 26px;
  margin-top: 20px;
  margin-bottom: 20px;
  lines:2;
  text-overflow: ellipsis;
  width: 700px;
  color:#666;
}
.cs-list__title{
  flex-direction: row;
  justify-content: space-between;
  width: 650px;
}
.cs-list__title--text{
  font-size: 30px;
  font-weight: 650;
  color: orange;
}
.cs-list__title--time{
  font-size: 26px;
  color: #666;
}
</style>
<template>
<div class="cs-list">
    <wxc-cell  @wxcCellClicked="handleClick">
        <div slot="label">
            <div class="cs-list__title">
                <text class="cs-list__title--text">{{data.title}}</text>
                <text class="cs-list__title--time">{{data.sendTime | filterTime}}</text>
            </div>
            <text class="cs-list__desc">{{data.content}}</text>
        </div>
    </wxc-cell>
    <wxc-cell title="点击查看" has-arrow :has-bottom-border="false" @wxcCellClicked="handleClick"></wxc-cell>
</div>
</template>
<script>
import {
    WxcCell
} from 'weex-ui'
export default {
    props: {
        data: {
            type: Array
        }
    },
    methods: {
        handleClick() {
            this.$emit('click', this.data)
        }
    },
    components: {
        WxcCell
    }
}
</script>
