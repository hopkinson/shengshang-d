<style lang="css" scoped>

.cs-list__address {
    height: 150px;
    padding-left: 20px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: whitesmoke;
}

.cs-list__address--item {
    flex-direction: row;
    flex: 1;
    align-items: center;
}

.is-text {
    text-overflow: ellipsis;
    lines: 1;
    width: 600px;
    font-size: 28px;
}

.cs-list {
    margin-bottom: 15px;
    margin-top: 15px;
    width:750px;
}

.cs-list__total {
    flex-direction: row;
    align-items: center;
}

.cs-list__total--label {
    color: #666;
}

.cs-list__total--text {
    font-size: 40px;
    color: red;
}
.cs-list__status{
  font-size: 28px;
  color: orange;
  padding-right: 10px;
}
</style>

<template>
<div class="cs-list">
    <wxc-cell has-arrow :title="`订单号：${data.orderCode}`" :has-bottom-border="false" has-top-border @wxcCellClicked="handleClick">
        <text class="cs-list__status">{{Orderstatus[data.status]}}</text>
    </wxc-cell>
    <div class="cs-list__address" @click="handleClick">
        <div class="cs-list__address--item">
            <c-icon value="&#xe6ed;" color="green"></c-icon>
            <text class="is-text">{{data.originDistrict}}{{data.originName}}{{data.originAddress}}</text>
        </div>
        <div class="cs-list__address--item">
            <c-icon value="&#xe6ed;" color="red"></c-icon>
            <text class="is-text">{{data.destinationDistrict}}{{data.destinationName}}{{data.destinationAddress}}</text>
        </div>
    </div>
    <wxc-cell :desc="data.createTimeLen" @click="handleClick">
        <div slot="value" class="cs-list__total" v-if="!isWaiting">
            <bmrichtext class="hd-txt flex">
                <bmspan value="合计："></bmspan>
                <bmspan class="cs-list__total--text" :value="data.fee | filterMoney"></bmspan>
            </bmrichtext>
        </div>
    </wxc-cell>
</div>
</template>

<script>
import {
    WxcCell,
    WxcButton
}
from 'weex-ui'
import {
    Orderstatus
} from 'Const'
export default {
    data: () => ({
        Orderstatus: Orderstatus
    }),
    props: {
        data: {
            type: Object
        }
    },
    computed: {
        // 待接单 状态
        isWaiting() {
            return this.data.status === '0'
        }
    },
    methods: {
        handleClick() {
            this.$emit('click')
        }
    },
    components: {
        WxcCell,
        WxcButton
    }
}
</script>
