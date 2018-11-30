/**
 * [格式化聊天事件]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
export const chatTime = item => {
    let time = ""
    // 现在
    let now = new Date()
    let nowDate = now.getDate()
    // 传入的时间
    let value = new Date(Number(item))
    let hour = value.getHours()
    let minutes = value.getMinutes() < 10
        ? `0${value.getMinutes()}`
        : value.getMinutes()
    let date = value.getDate()
    let month = value.getMonth() + 1
    if (date === nowDate) {
        time = `${hour}:${minutes}`
    } else if (nowDate - date === 1) {
        time = `昨天${hour}:${minutes}`
    } else {
        time = `${month}-${date} ${hour}:${minutes}`
    }
    if (!item)
        time = ""
    return time
}
export const filterTime = item => {
    if (!item) {
        return ''
    }
    let time = ""
    // 现在
    let now = new Date()
    let nowDate = now.getDate()
    // 传入的时间
    let value = new Date(Number(item))
    let hour = value.getHours()
    let minutes = value.getMinutes() < 10
        ? `0${value.getMinutes()}`
        : value.getMinutes()
    let date = value.getDate()
    let month = value.getMonth() + 1
    time = `${month}月${date}日 ${hour}:${minutes}`
    return time
}
/* 针对字典的过滤
规定字典格式：
  是否有库存
  isStock: [
    {
      label: '需要开机',
      value: '0'
    }, {
      label: '有库存',
      value: '1'
    }
  ], */
export const filterDict = (val, $arr, {
    value = 'title',
    key = 'value'
} = {}) => {
    if (!val) {
        return ''
    }
    let result = $arr.find(item => item[key] === val)
    if (result) {
        return result[value]
    }
}
// 金额
export const formatLevel = (val) => {
    if(!val) {
      return 'Lv0'
    }
    return `Lv${val}`
}
export const filterMoney = (val) => {
    if (!val) {
        return ''
    }
    return `¥ ${Number(val).toFixed(2)}`
}
// 时间秒数格式化
// @param time 时间戳（单位：秒）
export const formatSecToTime = time => {
    let word = ''
    if (time > -1) {
        let hour = Math.floor(time / 3600)
        let min = Math.floor(time / 60) % 60
        let sec = time % 60
        if (hour <= 0) {
            word = ''
        } else if (hour < 10) {
            word = '0' + hour + '时'
        } else {
            word = hour + '时'
        }
        if (min < 10) {
            word += '0'
        }
        word += min + '分'
        if (sec < 10) {
            word += '0'
        }
        word += sec + '秒'
    }
    return word
}
