import NavBar from './components/Navbar'

const GlobalComponents = {
    install(Vue) {
        Vue.component('nav-bar', NavBar)
    }
}

export default GlobalComponents