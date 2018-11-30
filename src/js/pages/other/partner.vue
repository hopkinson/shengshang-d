<!-- 合作伙伴 -->
<style lang="css" scoped>
.cs-parnter__item{
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.cs-parnter--text{
  padding-top: 10px;
  font-size: 26px;
}
</style>
<template>
<div class="cs-partner">
    <div class="cs-parnter__item" v-for="item in dict.partner">
        <cImage :src="item.extVariable ? item.extVariable.url: ''"></cImage>
        <text class="cs-parnter--text">{{item.label}}</text>
    </div>
</div>
</template>
<script>
import cImage from './components/img'
import cache from 'Mixins/cache'
export default {
    data: () => ({

    }),
    mixins: [cache],
    created() {},
    computed: {
        partner() {
            return this.dict.partner && this.dict.partner
        }
    },
    methods: {

    },
    components: {
        cImage
    }
}
</script>
