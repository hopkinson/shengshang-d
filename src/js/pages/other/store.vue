<!-- 用户商城 -->
<style lang="css" scoped>
</style>
<template>
<div class="cs-store">
    <!-- 轮播图 -->
    <c-slider :data="Data.imgList"></c-slider>
    <!-- 商品列表 -->
    <c-scroll-list @refresh="handleRefresh" @loadmore="handleLoadMore" :data="Data.productList">
        <store-list slot-scope="props" :data="props.row"></store-list>
    </c-scroll-list>
</div>
</template>
<script>
import {
    WxcCell
} from 'weex-ui'
import StoreList from './modules/StoreList'
export default {
    data: () => ({
        Data: {
            imgList: [],
            productList: []
        },
        Params: {
            pageNo: '',
            pageSize: 10
        }
    }),
    created() {
        this.Params.pageNo = 1
        this.loadImgList()
    },
    watch: {
        Params: {
            handler(val) {
                this.$notice.loading.show('加载商品中...')
                this.$fetch({
                    method: 'POST',
                    name: 'product/list',
                    data: val
                }).then(data => {
                    this.Data.productList = val.pageNo === 1 ? data.productList : this.Data.productList.concat(data.productList)
                    this.$notice.loading.hide()
                })
            },
            deep: true
        }
    },
    methods: {
        // 点击列表
        handleClick(item) {
            this.$emit('click', item)
        },
        handleLoadMore() {
            this.Params.pageNo++
        },
        handleRefresh(e) {
            this.Params.pageNo = 1
            e.done()
        },
        // 热门商品列表接口
        loadImgList() {
            this.$fetch({
                method: 'POST',
                name: 'product/hot/list'
            }).then(resData => {
                this.Data.imgList = resData.productList.map(item => item.coverImg)
            })
        }
    },
    components: {
        WxcCell,
        StoreList
    }
}
</script>
