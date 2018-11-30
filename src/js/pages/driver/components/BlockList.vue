<!--
@Author: hopkinson
@Date:   2018-04-13T09:19:21+08:00
@Last modified by:   hopkinson
@Last modified time: 2018-11-25T20:59:25+08:00
-->



<style lang="scss" scoped>
@import 'src/js/css/base';
.cs-list__title {
    padding-left: 20px;
    padding-right: 20px;
}

.cs-list__value {
    padding-right: 20px;
    text-align: right;
}

.cs-list__title--name {
    font-weight: 700;
    font-size: 35px;
    padding-bottom: 8px;
    padding-right: 6px;
}

.cs-list__title--container {
    align-items: center;
}

.cs-list__title--info {
    lines: 2;
    text-overflow: ellipsis;
    color: #666;
    font-size: 28px;
}

.cs-list__time {
    color: red;
    font-size: 26px;
    padding-bottom: 10px;
}

.cs-list__avatar {
    position: relative;
}
.cs-list__avatar--tag {
    position: absolute;
    right: 0;
    bottom: 0;
}
.cs-list__carcover {
    width: 90px;
    height: 90px;
    text-align: right;
}
.cs-list--img {
    width: 130px;
    height: 130px;
    border-radius: 6px;
}
</style>

<template>
<wxc-cell :has-arrow="hasArrow" @wxcCellClicked="handleClick">
    <!-- data.headImgUrl -->
    <div slot="label" class="cs-list__avatar">
        <image class="cs-list--img" :src="data.headImgUrl" />
        <wxc-tag type="solid" class="cs-list__avatar--tag" tag-color="grey" font-color="#ffffff" v-if="isEmptyCar" :value="data.distance" />
    </div>
    <div slot="title" class="cs-list__title">
        <div class="cs-list__title--container row">
            <text class="cs-list__title--name">{{data.userName}}</text>
            <wxc-tag type="hollow" tag-color="#ff5000" font-color="#ff5000" :value="data.level | formatLevel" />
        </div>
        <text class="cs-list__title--info" v-if="!$slots.desc">{{data.leaveMsg || data.content}}</text>
        <slot name="desc">
        </slot>
    </div>
    <div class="cs-list__value" v-if="!$slots.value">
        <text class="cs-list__time" v-if="!isEmptyCar">{{data.leaveTime | filterTime}}</text>
        <!-- data.carCover -->
        <image class="cs-list__carcover" v-if="hideCarcover" :src="data.carCover" />
    </div>
    <slot name="value">
    </slot>
</wxc-cell>
</template>

<script>
import {
    WxcTag,
    WxcCell
} from 'weex-ui'
export default {
    props: {
        data: {
            type: Object
        },
        hideRight: {
            type: Boolean,
            default: true
        },
        hideCarcover: {
            type: Boolean,
            default: true
        },
        hasArrow: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        handleClick(e) {
            this.$emit("click", e);
        }
    },
    computed: {
        // setCellStyle() {
        //     return {
        //         height: "100%"
        //     }
        // },
        isEmptyCar() {
            return this.data.type === '0'
        }
    },
    components: {
        WxcCell,
        WxcTag
    }
};
</script>
