<style scoped="">
.cs-record {
    flex: 1;
}
</style>
<template>
<div class="cs-record">
    <c-mini-bar title="全部订单"></c-mini-bar>
    <am-tabs v-model="Tab.active" :tabs="Tab.menu" />
    <c-scroll-list :emptySet="Empty" @emptyClick="handleAddOrder" class="cs-record" :data="Data.orderList" @refresh="handleRefresh" @loadmore="handleLoadMore">
        <record-list :data="props.row" slot-scope="props" @click="handleClick(props.row)"></record-list>
    </c-scroll-list>
</div>
</template>

<style scoped>

</style>
<script>
import {
    Utils
} from 'weex-ui'
import {
    AmTabs
} from 'weex-amui'
import RecordList from './modules/RecordList'
export default {
    components: {
        AmTabs,
        RecordList
    },
    data: () => ({
        Tab: {
            active: 0,
            menu: []
        },
        Data: {
            orderList: []
        },
        Empty: {
            noGoods: {
                pic: 'bmlocal://assets/empty-car.png',
                content: '哎呀，没有找到订单',
                button: '修改拉货信息'
            }
        },
        tabPageHeight: 0,
        Params: {
            statusType: '',
            pageNo: 1,
            pageSize: 10
        }
    }),
    created() {
        this.Tab.menu = ['全部', '进行中', '已完成', '已取消']
        this.tabPageHeight = Utils.env.getPageHeight() - 140
        this.Params.statusType = 0
    },
    watch: {
        'Tab.active'(val) {
            this.Params = Object.assign({}, this.Params, {
                pageNo: 1,
                statusType: val
            })
        },
        Params: {
            handler(val) {
                this.$notice.loading.show('订单加载中...')
                this.$fetch({
                    method: 'POST',
                    name: 'd/order/list',
                    data: val
                }).then(data => {
                    this.Data.orderList = val.pageNo === 1 ? data.orderList : this.Data.orderList.concat(data.orderList)
                    this.$notice.loading.hide()
                })
            },
            deep: true
        }
    },
    methods: {
        handleAddOrder() {
            this.$router.open({
                name: 'product.pull'
            })
        },
        handleClick(item) {
            this.$router.open({
                name: item.status === '0' ? 'order.wait' : 'order.detail',
                params: item
            })
        },
        handleRefresh(e) {
            this.Params = Object.assign({}, this.Params, {
                pageNo: 1
            })
            e.done()
        },
        handleLoadMore(e) {
            this.Params.pageNo++
        }
    }
};
</script>

<style scoped>
.list {
    width: 750px;
}

.cs-list__empty {
    justify-content: center;
    align-items: center;
}

.cs-list__empty--text {
    font-size: 50px;
    color: #999;
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>
