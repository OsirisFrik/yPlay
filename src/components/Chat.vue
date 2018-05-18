<template>
    <div id="chat">
        <md-content class="chat" id="chat-view">
            hola
        </md-content>
    </div>
</template>
<script>
export default {
    name: 'chat',
    props: {
        onSend: Function,
        messages: Array        
    },
    methods: {
        setHeight(el) {
            let dom = document.getElementById(el || 'chat-view')
            let videoH = document.getElementById('player').height

            dom.setAttribute('style', `height: ${window.innerHeight - 70}px`)            
        }
    },
    beforeMount() {
        window.onresize = this.setHeight
    },
    mounted() {
        this.setHeight()
    }
}
</script>

