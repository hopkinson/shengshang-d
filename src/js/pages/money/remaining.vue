<!-- 余额 -->
<style lang="scss" scoped>
@import 'src/js/css/base';
.cs-withdraw__total {
    background-color: $base-color;
    height: 240px;
    justify-content: center;
    padding-left: 40px;
}
.cs-withdraw__total--tip{
  color: #666;
}
.cs-withdraw__total--num{
  font-weight: 700;
  font-size: 100px;
  margin-top: 30px;
}
</style>
<template>
<div class="cs-withdraw">
    <!-- 总金额 -->
    <div class="cs-withdraw__total">
        <text class="cs-withdraw__total--tip">余额(元)</text>
        <text class="cs-withdraw__total--num">{{userInfo.money}}</text>
    </div>
    <wxc-cell title="提现" :has-arrow="true" @wxcCellClicked="handleWithDraw">
      <c-icon value="&#xe69e;" slot="label"></c-icon>
    </wxc-cell>
</div>
</template>
<script>
import {
    WxcCell
} from 'weex-ui'
export default {
    data: () => ({

    }),
    computed: {
        userInfo() {
            return this.$storage.getSync('userInfo')
        }
    },
    methods: {
        handleWithDraw() {
            this.$router.open({
                name: 'money.withdraw'
            })
        }
    },
    components: {
        WxcCell
    }
}
</script>
