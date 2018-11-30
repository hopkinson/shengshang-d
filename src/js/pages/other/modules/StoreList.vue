<style lang="css" scoped>
.cs-list--img{
  width: 120px;
  height: 120px;
  border-radius: 4px;
}
.cs-list__money{
  font-size: 32px;
  color: orange;
}
.cs-list__desc{
  font-size: 26px;
  margin-top: 20px;
  margin-bottom: 20px;
  lines:2;
  text-overflow: ellipsis;
  width: 500px;
  color:#666;
}
.cs-list__title{
  font-size: 30px;
  font-weight: 700;
}
</style>
<template>
<wxc-cell>
    <div slot="label">
        <text class="cs-list__title">{{data.name}}</text>
        <text class="cs-list__desc">{{data.desc}}</text>
        <text class="cs-list__money">{{data.price | filterMoney}}</text>
    </div>
    <image class="cs-list--img" :src="data.thumImg"></image>
</wxc-cell>
</template>
<script>
import {
    WxcCell
} from 'weex-ui'
export default {
    data: () => ({
    }),
    props: {
        data: {
            type: Array
        }
    },
    methods: {

    },
    components: {
        WxcCell
    }
}
</script>
