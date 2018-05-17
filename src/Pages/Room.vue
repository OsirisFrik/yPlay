<template>
    <div id="room">
        {{$route.path}}
        {{roomData}}
    </div>
</template>
<script>
import request from '../services/request.sv'

export default {
    name: 'Room',
    data() {
        return {
            roomData: {}
        }
    },
    methods: {
        getRoom() {
            request.get(this.$route.params.room).then(res => {
                this.roomData = res
            })
        }
    },
    beforeMount() {
        this.getRoom()
    }
}
</script>

