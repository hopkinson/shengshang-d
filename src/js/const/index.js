// 公司资料
export const Company = {
    phone: '0182-213213',
    name: '盛商联合运输',
    fullName: '河源市盛商互联科技有限公司'
}
// 排序方式
export const OrderBy = [
    {
        title: '距离',
        value: '0'
    }, {
        title: '等级',
        value: '1'
    }
]
// 用户认证 & tag
export const Verify = [
    {
        title: '已认证',
        color: 'orange',
        value: '1'
    }, {
        title: '审核中',
        color: 'red',
        value: '2'
    }, {
        title: '未认证',
        color: 'grey',
        value: '0'
    }
]
// 联系人
export const ContactPerson = [
    {
        title: '本人',
        value: '1'
    }, {
        title: '他人',
        value: '0'
    }
]
export const YesNo = [
    {
        title: '是',
        value: '1'
    }, {
        title: '否',
        value: '0'
    }
]

export const Orderstatus = {
    0: '待接单',
    1: '待支付',
    2: '待接货',
    3: '待运输',
    4: '已完成',
    5: '已取消',
    6: '取消中'
}
// 微信支付结果
export const WxPayResult = {
    '0': '支付成功',
    '-1': '普通错误类型',
    '-2': '取消支付订单',
    '-3': '发送失败',
    '-4': '微信授权失败',
    '-5': '微信不支持'
}
