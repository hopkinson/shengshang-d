<!--
@Author: hopkinson
@Date:   2018-04-06T11:10:10+08:00
@Last modified by:   hopkinson
@Last modified time: 2018-10-28T16:54:08+08:00
-->



<style lang="css" scoped>
.cs-chat__content, .cs-chat__footer {
  position: fixed;
  left: 0;
  right: 0;
  overflow: auto;
}
.cs-chat__footer {
  bottom: 0;
}
.cs-chat__content {
  top:0;
  bottom: 120px;
}
</style>

<template>
<div class="cs-chat">
    <chat-content class="cs-chat__content" :data="Data.sessionList" @loadMore="handleLoadMore"></chat-content>
    <chat-footer class="cs-chat__footer" @input="handleSend"></chat-footer>
</div>
</template>

<script>
import ChatFooter from './modules/FooterInput'
import ChatContent from './modules/Content'
import {
    unRepeatObject
} from 'Utils/utils'
export default {
    data: () => ({
        Params: {
            pageNo: 1,
            pageSize: 10,
            otherUserId: '',
            sessionId: ''
        },
        Timer: {
            session: null
        },
        Data: {
            sessionList: []
        },
        Temp: {
            scroller: false,
            oneScroll: true
        }
    }),
    computed: {
        userInfo() {
            return this.$storage.getSync('userInfo')
        }
    },
    eros: {
        beforeAppear(params) {
            this.Params = Object.assign({}, this.Params, params)
        },
        beforeDisappear() {
            clearTimeout(this.Timer.session)
            this.Timer.session = null
        }
    },
    watch: {
        Params: {
            handler(val) {
                this.loadMess()
            },
            deep: true
        },
    },
    methods: {
        // 读取信息
        loadMess() {
            this.$fetch({
                method: 'POST',
                data: this.Params,
                name: 'sys/msg/list'
            }).then(data => {
                if (this.Params.pageNo === 1) {
                    this.Data.sessionList = data.msgList
                    if (this.Temp.scroller || this.Temp.oneScroll) {
                        this.$event.emit('scroller-bottom')
                    }
                    this.Temp.oneScroll = false
                } else {
                    this.Temp.scroller = true
                    let arr = data.msgList.concat(this.Data.sessionList)
                    this.Data.sessionList = unRepeatObject(arr, 'id')
                }
                this.Timer.session = setTimeout(this.loadMess, 1000)
            })
        },
        handleLoadMore(e) {
            this.Params.pageNo++
                e.done()
        },
        // 发送
        handleSend(content) {
            this.$fetch({
                method: 'POST',
                data: Object.assign(this.Params, {
                    content: content
                }),
                name: 'sys/msg/send'
            }).then(data => {
                this.$event.emit('scroller-bottom')
            })
        }
    },
    mounted() {
        this.$event.on('send-message', data => {
            this.Data.sessionList = this.Data.sessionList.concat(data)
        })
    },
    components: {
        ChatFooter,
        ChatContent
    }
}
</script>
