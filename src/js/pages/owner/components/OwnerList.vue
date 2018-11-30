<style lang="scss" scoped>
@import 'src/js/css/base';
.cs-list {
    margin-top: 20px;
    margin-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
}
.cs-list__value {
    padding-right: 20px;
    text-align: right;
}
.cs-list__desc {
    font-size: 26px;
    lines: 2;
    text-overflow: ellipsis;
    width: 630px;
    color: #666;
}
.cs-list__title {
    flex-direction: row;
    justify-content: space-between;
    width: 650px;
}
.cs-list__title--text {
    font-size: 30px;
    font-weight: 650;
    color: orange;
}
.cs-list__avatar {
    position: relative;
}
.cs-list__avatar--tag {
    position: absolute;
    right: 0;
    bottom: 0;
}
.cs-list__title--container{
    align-items: center;
}
.cs-list__title--name {
    font-weight: 700;
    font-size: 35px;
    margin-left: 20px;
    padding-right: 6px;
}


.cs-list--img{
  width: 130px;
  height: 130px;
  border-radius: 10px;
}
.cs-list__carcover{
  width: 90px;
  height: 90px;
  text-align: right;
}
.center{
  align-items: center;
  margin-bottom: 20px;
}
</style>
<template>
<div class="cs-list">
    <!-- 货主简介 -->
    <wxc-cell @wxcCellClicked="handleClick">
        <div slot="label" class="cs-list__avatar">
            <image class="cs-list--img" :src="data.headImgUrl" />
            <wxc-tag type="solid" class="cs-list__avatar--tag" tag-color="grey" font-color="#ffffff" :value="data.distance"></wxc-tag>
        </div>
        <div class="row cs-list__title--container" slot="title">
            <text class="cs-list__title--name">{{data.userName}}</text>
            <wxc-tag type="hollow" tag-color="#ff5000" font-color="#ff5000" :value="data.level | formatLevel"></wxc-tag>
        </div>
        <div class="cs-list__value">
            <!-- data.carCover -->
            <image class="cs-list__carcover" :src="data.goodsThumImg" />
        </div>
    </wxc-cell>
    <!-- 地址&简介 -->
    <wxc-cell :has-bottom-border="false" :cell-style="setCellStyle" @wxcCellClicked="handleClick">
        <div slot="title">
            <div class="row center">
                <c-icon value="&#xe6ed;" color="green" size="20px"></c-icon> <text class="cs-list__desc">{{data.originDistrict}}·{{data.originName}}</text>
            </div>
            <div class="row center">
                <c-icon value="&#xe6ed;" color="red" size="20px"></c-icon> <text class="cs-list__desc">{{data.destinationDistrict}}·{{data.destinationName}}</text>
            </div>
            <div class="row center">
                <c-icon value="&#xe730;" color="grey" size="20px"></c-icon> <text class="cs-list__desc">{{data.goodsDesc}}</text>
            </div>
        </div>
    </wxc-cell>
</div>
</template>
<script>
import {
    WxcTag,
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
        handleClick() {
            this.$emit('click', this.data)
        }
    },
    components: {
        WxcCell,
        WxcTag
    }
}
</script>
