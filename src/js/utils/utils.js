// 模糊匹配
export const fuzzyQuery = (list, key, keyWord) => {
        var arr = []
        for (var i = 0; i < list.length; i++) {
            if (list[i][key].indexOf(keyWord) >= 0) {
                arr.push(list[i])
            }
        }
        return arr
    }
    // 分类
export const sortOut = ($arr, key) => {
        let result = $arr.reduce((prev, item) => {
            prev[item[key]] ?
                prev[item[key]].push(item) :
                prev[item[key]] = [item]
            return prev
        }, {})
        return result
    }
    // 去重
export const unRepeatObject = (arr, key) => {
        let arrItem = {}
        let result = arr.reduce((item, next) => {
            arrItem[next[key]] ?
                '' :
                arrItem[next[key]] = true && item.push(next)
            return item
        }, [])
        return result
    }
    // 获取分钟
export const getMins = (time) => {
        return Number(time) / 60
    }
    // 把扁平化的数据转换成树形结构的JSON
export const jsonTree = function(data, config) {
    let id = config.id || 'id',
        pid = config.pid || 'pid',
        children = config.children || 'children'

    let idMap = [],
        jsonTree = []

    data.forEach(v => {
        idMap[v[id]] = v
    })

    data.forEach(v => {
        let parent = idMap[v[pid]]
        if (parent) {
            !parent[children] && (parent[children] = [])
            parent[children].push(v)
        } else {
            jsonTree.push(v)
        }
    })
    return jsonTree
}