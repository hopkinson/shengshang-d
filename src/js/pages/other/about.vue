<style lang="css" scoped>
.cs-about{
  justify-content: center;
  align-items: center;
  text-align: center;
}
.cs-about__name{
  font-size: 40px;
  color: #666;
}
.cs-about--img{
  width:300px;
  height:300px;
  margin-bottom: 30px;
}
.cs-about__container{
  text-align: center;
}
</style>
<template>
<div class="cs-about">
    <image src="bmlocal://assets/logo_mini1.png" class="cs-about--img"></image>
    <text class="cs-about__name">{{Const.Company.name}}{{appVersion}}</text>
    <c-footer>
        <text>{{Const.Company.fullName}} 版权所有</text>
    </c-footer>
</div>
</template>
<script>
import {
    Company
} from 'Const'
export default {
    data: () => ({
        Const: {
            Company: Company
        },
        appVersion: weex.config.env.appVersion
    }),
    created() {},
    methods: {

    },
    components: {

    }
}
</script>
