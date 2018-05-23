<template>
  <div id="chat">
    <md-content class="chat" id="chat-view">
      <div class="messages md-scrollbar">
        <md-card v-for="(msg, index) in messages" :key="index">
          <md-card-header>
            <div class="md-title">{{msg.username}}</div>
          </md-card-header>
          <md-card-content>
            {{msg.message}}
          </md-card-content>
        </md-card>
      </div>
    </md-content>
    <form class="txt-section" v-on:submit.prevent="'onSubmit'" v-on:submit="process()">
      <md-field>
        <label>Send message</label>
        <md-input v-model="message"></md-input>
      </md-field>
    </form>
    <md-dialog-prompt :md-active.sync="reqUsername" v-model="username" md-title="What's your name?" md-input-maxlength="20" md-input-placeholder="Type your name..."
      md-confirm-text="Done" :mb-submit="sendMessage"></md-dialog-prompt>
  </div>
</template>
<script>
  import request from "../services/request.sv";

  export default {
    name: 'chat',
    data() {
      return {
        message: null,
        messages: [],
        username: localStorage.getItem('username'),
        reqUsername: false
      }
    },
    props: {
      onSend: Function
    },
    methods: {
      setHeight(el) {
        let dom = document.getElementById(el || 'chat-view')
        let videoH = document.getElementById('player').height

        dom.setAttribute('style', `height: ${window.innerHeight - 70}px`)
      },
      process() {
        if (this.message !== null) {
          if (this.message.indexOf('/add') > -1) {
            this.addVideo(this.message)
            return
          }

          let body = {
            username: this.username,
            message: this.message
          }

          this.sendMessage(body)
        }
      },
      sendMessage(data) {
        if (this.username !== null) {
          if (localStorage.getItem('username') === null) {
            localStorage.setItem('username', this.username)
          }
          request.post(`${this.$route.params.room}/newmessage`, data).then(res => {
            if (res.status) {
              this.message = null
            }
          })
        } else {
          this.reqUsername = true
        }
      },
      addVideo(link) {
        var id

        function validateLink() {
          if (link.indexOf('youtube.com/') > -1 && link.indexOf('?v=') > -1) {
            return 1
          }

          if (link.indexOf('youtu.be/') > -1) {
            return 2
          }
        }

        switch (validateLink()) {
          case 1:
            id = link.split('?v=')[1]
            break
          case 2:
            id = link.split('/')[1]
            break
        }

        let body = {          
          username: this.username,
          v_id: id
        }

        request.post(`${this.$route.params.room}/addvideo`, body).then(res => {
          if (res.status) {
            this.message = null
          }
        })
      }
    },
    beforeMount() {
      window.onresize = this.setHeight
    },
    mounted() {
      this.setHeight()
    },
    created() {
      let pusher = new Pusher('e3237afa97c0003ea749', {
        cluster: 'us2',
        encrypted: true
      })

      var channel = pusher.subscribe(this.$route.params.room)

      channel.bind('new-msg', data => {
        this.messages.push(data)
      })
    }
  }

</script>
<style>
  .txt-section {
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: 310px;
  }

</style>
