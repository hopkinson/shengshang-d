import StatusBar from 'Components/statusBar'
import Footer from 'Components/footer'
import ScrollList from 'Components/scrollList'
import Slider from 'Components/slider'
import Icon from 'Components/icon'
import UploadPic from 'Components/uploadPic'
import MiniBar from 'Components/MiniBar'
const Components = {
    StatusBar,
    ScrollList,
    Footer,
    Slider,
    MiniBar,
    Icon,
    UploadPic
}
const install = function(Vue) {
    for (let i in Components) {
        Vue.component(`c${i}`, Components[i])
    }
}
install(Vue)
Components.install = install
export default Components