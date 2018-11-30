<!--
@Author: hopkinson
@Date:   2018-04-24T15:51:26+08:00
@Last modified by:   hopkinson
@Last modified time: 2018-10-28T16:55:15+08:00
-->



<style lang="css" scoped>
.cs-content--img {
    width: 80px;
    height: 80px;
    border-radius: 8px;
}

.cs-content__cell {
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 20px;
    justify-content: flex-start;
    flex-direction: row;
}

.big {
    width: 100px;
    height: 100px;
}

.is-reverse {
    justify-content: flex-end;
}

.cs-content {
    flex: 1;
}

</style>

<template>
<scroller ref="list" :showRefresh="true" @refresh="handleRefresh" @click="handleClickContent" class="cs-content">
    <div v-for="(item,index) in data" :key="index">
        <!-- 1.聊天信息 -->
        <bubble type="tip" :text="item.sendTime | chatTime" v-if="isTip(item,index)" />
        <!-- 本人信息 -->
        <div v-if="isContent(item)">
            <div v-if="isOwner(item)" class="cs-content__cell is-reverse">
                <bubble :type="setBubbleType" :text="item.content" />
                <image class="cs-content--img" :src="item.headImgUrl" />
                <!-- <money price="65" orderId="12345678" @click="handleClickMoney" v-if="item.type === 2"></money> -->
            </div>
            <div v-else class="cs-content__cell">
                <image class="cs-content--img" :src="item.headImgUrl" />
                <bubble :type="setBubbleType" :text="item.content" />
                <!-- <money price="65" orderId="12345678" @click="handleClickMoney" v-if="item.type === 2"></money> -->
            </div>
        </div>
        <!-- 2.系统通知 -->
        <bubble v-else type="tip" :text="item.content"></bubble>
    </div>
    <div ref="cell"></div>
</scroller>
</template>

<script>
// import Money from '../components/Money'
import Bubble from '../components/Bubble'
const dom = weex.requireModule('dom')
const BETWEEN_TIME = 20000
export default {
    props: {
        data: {
            type: Array,
            default: () => ([])
        }
    },
    mounted() {
        this.$event.on('scroller-bottom', () => {
            setTimeout(() => {
                dom.scrollToElement(this.$refs.cell)
            }, 300)
        })
    },
    methods: {
        // 间隔显示时间
        showTime(index) {
            return !(index > 0 && (Math.abs(this.data[index].sendTime - this.data[index - 1].sendTime < BETWEEN_TIME)))
        },
        setBubbleType(item) {
            return this.isContent(item) ? 'bar' : 'tip'
        },
        setContentClass(item) {
            return [this.isOwner(item) ? 'is-reverse' : '']
        },
        isText(item) {
            return item.type !== 2
        },
        // 文本消息
        isContent(item) {
            return item.type !== '5'
        },
        // 是否本人的信息
        isOwner(item) {
            return this.isContent(item) && item.owner
        },
        // 若是tip类型 => 隐藏时间
        isTip(item, index) {
            return this.isContent(item) && this.showTime(index)
        },
        handleClickContent() {
            this.$tools.resignKeyboard()
        },
        handleRefresh() {
            this.$emit('loadMore', {
                done: () => {
                    this.$refs['list'].refreshEnd()
                }
            })
        },
        handleClickMoney() {},
    },
    components: {
        // Money,
        Bubble
    }
}
</script>
