<template>
    <div id="room">
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-large-size-70 md-small-size-100">
                <div id="player"></div>
            </div>
            <div class="md-layout-item md-large-size-30 md-small-size-100">
                <chat/>
            </div>
        </div>
        <alert :activeAlert="alert" :message="alertMsg"/>
    </div>
</template>
<script>
import request from '../services/request.sv'
import chat from '../components/Chat'

export default {
    name: 'Room',
    components: {
        chat
    },
    data() {
        return {
            roomData: {},
            alert: false,
            alertMsg: null,
            player: null
        }
    },
    methods: {
        getRoom() {
            request.get(this.$route.params.room).then(res => {                
                if (!res.status) {
                    this.alert = true
                    this.alertMsg = res.message
                } else {
                    this.roomData = res.room                    
                    if (res.room.videos.length > 0) {
                        this.initPlayer()
                    }
                }
            })
        },
        initPlayer() {
            this.player = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: this.roomData.videos
            })
        }
    },
    beforeMount() {
        this.getRoom()
    }
}
</script>
<style>
iframe#player {
    width: 100% !important;
    height: 100%;
    min-height: 200px;
    max-height: 600px;
}
</style>
