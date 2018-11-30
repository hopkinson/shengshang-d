<!-- 系统消息 -->
<style lang="css" scoped>
</style>
<template>
<c-scroll-list emptyType="errorLocation" :emptySet="Empty" @refresh="handleRefresh" @loadmore="handleLoadMore" :data="Data.systemList">
    <system-list slot-scope="props" :data="props.row" @click="handleClick(props.row)"></system-list>
</c-scroll-list>
</template>
<script>
import SystemList from './modules/SystemList'
import {
    loadUserInfo,
    go
} from 'Mixins/notification'
export default {
    data: () => ({
        Data: {
            systemList: []
        },
        Params: {
            pageNo: '',
            pageSize: 10
        },
        Empty: {
            errorLocation: {
                button: null,
                pic: 'bmlocal://assets/empty-chat.png',
                content: '没有新的系统消息'
            }
        }
    }),
    created() {
        this.Params.pageNo = 1
    },
    watch: {
        Params: {
            handler(val) {
                this.$notice.loading.show('加载系统消息中...')
                this.$fetch({
                    method: 'POST',
                    name: 'sys/notice/list',
                    data: val
                }).then(data => {
                    this.Data.systemList = val.pageNo === 1 ? data.noticeList : this.Data.systemList.concat(data.noticeList)
                    this.$notice.loading.hide()
                })
            },
            deep: true
        }
    },
    methods: {
        // 点击列表
        handleClick(item) {
            let type = {
                userinfo: () => {
                    loadUserInfo(() => {
                        go('user.info')
                    })
                },
                orderdetail: (item) => {
                    go('order.detail', item)
                }
            }
            return type[item.page].call(null, item)
        },
        handleLoadMore() {
            this.Params.pageNo++
        },
        handleRefresh(e) {
            this.Params.pageNo = 1
            e.done()
        }
    },
    components: {
        SystemList
    }
}
</script>
