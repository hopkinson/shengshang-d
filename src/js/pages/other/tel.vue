<!-- 投诉电话 -->
<style lang="css" scoped>
.cs-tel--text{
  font-size: 30px;
  font-weight: 700;
  margin-right: 16px;
}
</style>
<template>
<div class="cs-tel">
    <!-- 全国  -->
    <wxc-cell label="全国投诉热线" has-margin class="cs-tel__country" @wxcCellClicked="handleCall(Data.tel.globalTel)">
        <text class="cs-tel--text">{{Data.tel.globalTel}}</text>
        <c-icon value="&#xe725;" color="green"></c-icon>
    </wxc-cell>
    <!-- 地区  -->
    <wxc-cell :label="item.name" @wxcCellClicked="handleCall(item.tel)" v-for="item in Data.tel.area">
        <text class="cs-tel--text">{{item.tel}}</text>
        <c-icon value="&#xe725;" color="green"></c-icon>
    </wxc-cell>
</div>
</template>
<script>
import {
    WxcCell
} from 'weex-ui'
export default {
    data: () => ({
        Data: {
            tel: {}
        }
    }),
    created() {
        this.loadTel()
    },
    methods: {
        loadTel() {
            this.$fetch({
                method: 'POST',
                data: this.Params,
                name: 'sys/hotline'
            }).then(data => {
                this.Data.tel = data
            })
        },
        handleCall(tel) {
            this.$coms.call(tel)
        }
    },
    components: {
        WxcCell
    }
}
</script>
