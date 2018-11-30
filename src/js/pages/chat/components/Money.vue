<!-- 红包 -->
<style lang="css" scoped>
.cs-money{
  width: 320px;
  height: 150px;
  background-color: #ffd000;
  border-radius: 10px;
  border-style: solid;
  border-color: #eaeaea;
  border-width: 1px;
  margin-left: 20px;
  margin-right: 20px;
}
.cs-money__order{
  padding:6px;
  background-color: white;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.cs-money__order--title{
  color:#666;
  font-size: 26px;
}
.cs-money__order--number{
  color:orange;
  font-size: 26px;
}
.cs-money__container{
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex:1;
}
.cs-money__order--money{
  font-size: 60px;
  font-weight: 700;
}
</style>
<template>
<div class="cs-money" @click="handleClick">
    <div class="cs-money__order">
        <text class="cs-money__order--title">订单报价</text>
        <text class="cs-money__order--number">{{orderId}}</text>
    </div>
    <div class="cs-money__container">
        <c-icon value="&#xe71b;" size="65"></c-icon>
        <text class="cs-money__order--money">{{price}}</text>
    </div>
</div>
</template>
<script>
export default {
    props: {
        price: {
            type: [String, Number]
        },
        orderId: {
            type: [String, Number]
        }
    },
    methods: {
        handleClick() {
            this.$emit('click')
        }
    },
    components: {

    }
}
</script>
