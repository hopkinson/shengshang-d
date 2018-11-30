export default {
    computed: {
        // 还没支付
        noPay() {
            return this.Data.detail.status < '2'
        },
        // 状态 - 已完成
        statusFinish() {
            return this.Data.detail.status === '4'
        },
        // 状态 - 待支付
        statusPay() {
            return this.Data.detail.status === '1'
        },
        // 状态 - 运输中
        statusTransport() {
            return this.Data.detail.status === '3'
        },
        // 状态 - 代接货
        statusTakeGoods() {
            return this.Data.detail.status === '2'
        },
        // 状态 - 取消
        statusCancel() {
            return this.Data.detail.status === '5'
        },
        // 状态 - 取消中
        statusCanceling() {
            return this.Data.detail.status === '6'
        },
        // 状态 - 代接单
        statusWaiting() {
            return this.Data.detail.status === '0'
        }
    }
}
