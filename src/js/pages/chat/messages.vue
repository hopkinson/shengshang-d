<!-- 我的消息 -->
<style lang="css" scoped>
.cs-message{
  flex:1;
}
.cs-message__time{
  color: #999;
  font-size: 26px;
}
.cs-navbar__right{
  position: relative;
}
.pot{
  width: 15px;
  height: 15px;
  position: absolute;
  right: 0;
  top:0;
  background-color: red;
  border-radius:15px;
}
</style>
<template>
<div class="cs-message">
    <c-mini-bar title="我的消息">
        <div slot="right" class="cs-navbar__right">
            <c-icon value="&#xe69f;" @click="goMessage"></c-icon>
            <div class="pot" v-if="Data.tagNum">
            </div>
        </div>
    </c-mini-bar>
    <c-scroll-list :emptySet="Empty" @refresh="handleRefresh" @loadmore="handleLoadMore" :data="Data.sessionList">
        <!-- <bui-swipe-cell height="150px"  @click="goChat(props.row)" @actionClick="handleDelMess($event)" :items="menus"> -->
        <block-list :has-arrow="false" slot-scope="props" :data="props.row" @click="goChat(props.row)">
            <text slot="value" class="cs-message__time">{{props.row.sendTimeLen}}</text>
        </block-list>
        <!-- </bui-swipe-cell> -->
    </c-scroll-list>
</div>
</template>
<script>
import {
    unRepeatObject
} from 'Utils/utils'
import BlockList from 'Pages/driver/components/BlockList'
export default {
    data: () => ({
        Data: {
            sessionList: [],
            tagNum: 0
        },
        Timer: {
            session: null
        },
        Params: {
            pageNo: '',
            pageSize: 10
        },
        Empty: {
            noGoods: {
                button: null,
                pic: 'bmlocal://assets/empty-chat.png',
                content: '没有新的对话'
            }
        },
    }),
    watch: {
        Params: {
            handler(val) {
                this.loadMess()
            },
            deep: true
        }
    },
    eros: {
        beforeDisappear(options) {
            this.clear()
        }
    },
    methods: {
        // 删除信息
        handleDelMess(e, a) {
            this.$notice.toast({
                message: e
            })
        },
        handleLoadMore(e) {
            this.Params.pageNo++
        },
        handleRefresh(e) {
            this.Params.pageNo = 1
            e.done()
        },
        // 查看聊天内容
        goChat(item) {
            this.$router.open({
                name: 'chat.chat',
                params: {
                    otherUserId: item.userId,
                    sessionId: item.sessionId
                },
                navShow: true,
                navTitle: item.userName
            })
        },
        // 去往系统信息
        goMessage() {
            this.$router.open({
                name: 'other.system'
            })
        },
        // 设置右边导航条
        setNav(num, show = true) {
            this.$navigator.setRightItem({
                text: show ? `通知(${num})` : '',
                fontSize: 26
            }, () => {
                this.goMessage()
            })
        },
        // 读取信息
        loadMess() {
            this.$fetch({
                method: 'POST',
                name: 'sys/msg/session/list'
            }).then(data => {
                this.Data.sessionList = this.Params.pageNo === 1 ? data.sessionList : unRepeatObject(this.Data.sessionList.concat(data.msgList), 'id')
                this.Timer.session = setTimeout(this.loadMess, 1000)
            })
        },
        clear() {
            clearTimeout(this.Timer.session)
            this.Timer.session = null
        }
    },
    created() {
        this.Params.pageNo = 1
    },
    mounted() {
        this.$event.on('online-data', data => {
            this.Data.tagNum = data.myNoticeNum
        })
    },
    destroyed() {
        this.clear()
    },
    components: {
        BlockList
    }
}
</script>
