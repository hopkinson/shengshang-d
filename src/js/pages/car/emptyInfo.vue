<!-- 空车信息 -->
<style lang="css" scoped>
.cs-emptyInfo__carInfo{
  margin-top: 20px;
}
.cs-emptyInfo__label{
  flex-direction: row;
  align-items: center;
}
.cs-emptyInfo-driver{
  margin-bottom:20px;
}
</style>
<template>
<scroller>
    <!-- 司机信息 -->
    <block-list :data="Data.detail" class="cs-emptyInfo-driver" :has-arrow="false"></block-list>
    <!--  列表 -->
    <wxc-cell title="常跑路径">
        <c-icon slot="label" value="&#xe6e0;"></c-icon>
        <text>{{Data.detail.pathMemo}}</text>
    </wxc-cell>
    <wxc-cell title="里程要求">
        <c-icon slot="label" value="&#xe71b;"></c-icon>
        <text>{{Data.detail.distanceMeo}}</text>
    </wxc-cell>
    <wxc-cell title="货物要求">
        <c-icon slot="label" value="&#xe839;"></c-icon>
        <text>{{Data.detail.goodsMemo}}</text>
    </wxc-cell>
    <!-- 轮播 -->
    <c-slider :data="Data.detail.carPhoto"></c-slider>
    <!-- 车辆信息 -->
    <car-info :data="Data.detail" class="cs-emptyInfo__carInfo"></car-info>
    <!-- 文字 -->
    <c-footer>
        <wxc-button text="邀请司机" type="yellow" @wxcButtonClicked="handleInvite"></wxc-button>
    </c-footer>
</scroller>
</template>
<script>
import {
    WxcCell,
    WxcButton
} from 'weex-ui'
import BlockList from 'Pages/driver/components/BlockList'
import CarInfo from './modules/CarInfo'
export default {
    data: () => ({
        Params: {
            id: ''
        },
        Data: {
            detail: {}
        }
    }),
    eros: {
        beforeAppear(params, options) {
            if (Object.keys(params).length !== 0) {
                this.Params.id = params.id
            }
        }
    },
    watch: {
        Params: {
            handler(val) {
                this.$notice.loading.show('信息加载中...')
                this.$fetch({
                    method: 'POST',
                    name: 'u/driver/detail',
                    data: val
                }).then(data => {
                    this.Data.detail = Object.assign({}, this.Data.detail, data)
                    this.$notice.loading.hide()
                })
            },
            deep: true
        }
    },
    methods: {
        handleInvite() {
            this.$router.open({
                name: 'car.vehicles',
                params: {
                    type: 'invite.driver',
                    orderType: '1',
                    ...this.Data.detail
                }
            })
        }
    },
    components: {
        WxcCell,
        WxcButton,
        CarInfo,
        BlockList
    }
}
</script>
