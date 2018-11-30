<!-- 引导页 -->
<style lang="css" scoped>
.cs-guide{
  padding: 20px;
}
.cs-guide__title{
  font-size: 30px;
  color:#666;
  line-height: 50px;
  padding-bottom: 20px;
}
.cs-guide--img{
  padding-bottom: 20px;
  width: 720px;
}
.step1{
  height: 340px;
}
.step2{
  height: 1077px;
}
.step3{
  height: 1092px;
}
</style>
<template>
<scroller class="cs-guide">
    <text class="cs-guide__title">为了保障应用能顺利使用，建议用户都打开定位服务，以便司机能够准确获得您的位置信息。下面将以小米手机为例：</text>
    <text class="cs-guide__title">1. 请到系统设置->更多应用，找到该应用名称</text>
    <image class="cs-guide--img step1" src="bmlocal://assets/step-1.png"></image>
    <text class="cs-guide__title">2. 找到“权限管理”</text>
    <image class="cs-guide--img step2" src="bmlocal://assets/step-2.png"></image>
    <text class="cs-guide__title">3. 选择定位->选择“允许”</text>
    <image class="cs-guide--img step3" src="bmlocal://assets/step-3.png"></image>
</scroller>
</template>
<script>
export default {
    data: () => ({

    }),
    created() {},
    methods: {

    },
    components: {

    }
}
</script>
