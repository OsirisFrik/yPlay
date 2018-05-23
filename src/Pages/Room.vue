<template>
  <div id="room">
    <div class="md-layout">
      <div class="md-layout-item md-large-size-70 md-xsmall-size-100 md-small-sieze-30">
        <div id="player"></div>
      </div>
      <div class="md-layout-item md-large-size-30 md-small-size-100">
        <chat/>
      </div>
    </div>
    <alert :activeAlert="alert" :message="alertMsg" />
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
        player: null,
        onPlay: null
      }
    },
    methods: {
      getRoom() {
        request.get(this.$route.params.room).then(res => {
          console.log(res);

          if (!res.status) {
            this.alert = true
            this.alertMsg = res.message
            setTimeout(() => {
              this.$router.push({
                name: "Home"
              })
            }, 1000);
          } else {
            this.roomData = res.room
            if (res.room.videos.length > 0) {
              setTimeout(() => {
                this.initPlayer()
              }, 1000);
            }
          }
        })
      },
      initPlayer() {
        this.player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: this.roomData.videos[0],
          playerVars: {
            autoplay: false
          },
          events: {
            onStateChange: this.playerChangeEvent,
            onReady: this.playerReady
          }
        })
        this.onPlay = this.roomData.videos[0]
        this.roomData.videos.splice(0, 1)
      },
      playerChangeEvent(e) {
        console.log(e);
        switch (e.data) {
          case 0:
            e.target.loadVideoById(this.roomData.videos[0])
            this.deleteVideo(this.onPlay)
            break;
        }
      },
      playerReady(e) {
        console.log(e);
      },
      deleteVideo(video) {
        request.delete(`${this.$route.params.room}/deletevideo`, video).then(res => {
          if (res.status) {
            this.onPlay = this.roomData.videos[0]
            this.roomData.videos.splice(0, 1)
          }
        }).catch(err => {
            console.log(err);
            
        })
      }
    },
    beforeMount() {
      this.getRoom()
    },
    created() {
      let pusher = new Pusher('e3237afa97c0003ea749', {
        cluster: 'us2',
        encrypted: true
      })

      var channel = pusher.subscribe(this.$route.params.room)

      channel.bind('addVideo', data => {
        this.roomData.videos.push(data)
      })
    }
  }

</script>
<style>
  iframe#player {
    width: 100% !important;
    height: 100%;
    min-height: 200px;
    max-height: 500px;
  }

</style>
