import NavBar from './components/Navbar'
import Alert from './components/Alert'

const GlobalComponents = {
    install(Vue) {
        Vue.component('nav-bar', NavBar)
        Vue.component('alert', Alert)
    }
}

export default GlobalComponents