<style lang="css" scoped>
.cs-carInfo{
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
}
.cs-carInfo__item{
  justify-content: center;
  flex:1;
  text-align: center;
}
.value{
  color: orange;
  margin-bottom: 16px;
  font-size: 40px;
  text-align: center;
}
.key{
  color: grey;
  text-align: center;
}
</style>
<template>
<div class="cs-carInfo">
    <div class="cs-carInfo__item">
        <text class="value">{{data.capacity || data.carCapacity}}</text>
        <text class="key">载重</text>
    </div>
    <div class="cs-carInfo__item">
        <text class="value">{{data.size || data.carSize}}</text>
        <text class="key">长*宽*高</text>
    </div>
    <div class="cs-carInfo__item">
        <text class="value">{{data.load || data.carLoad}}</text>
        <text class="key">载货体积</text>
    </div>
</div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object
        }
    }
}
</script>
