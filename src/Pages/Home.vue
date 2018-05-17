<template>
  <div id="home">    
    <form v-on:submit="createRoom()" v-on:submit.prevent="'onSubmit'">
      <div class="md-layout">
        <div class="md-layout-item md-large-size-20"></div>
        <div class="md-layout-item md-medium-size-10 md-small-size-40 md-large-size-60">
          <md-field>
            <label>YouTube Link</label>
            <md-input v-model="link"></md-input>
          </md-field>
        </div>
        <div class="md-layou-item md-medium-size-10 md-small-size-10 md-large-size-10">
          <md-button class="md-raised md-primary">Create Room</md-button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  import request from '../services/request.sv'
  export default {
    name: 'Home',
    data() {
      return {
          link: null
      }
    },
    methods: {
      createRoom() {
        if (this.validateLink(this.link)) {
            let body = {
                v_id: this.link.split('?v=')[1]
            }
            request.post('createroom', body).then(res => {
                if (res.status) {
                    this.$router.push(`/${res.room}`)                    
                }
            })
        }
      },
      validateLink(link) {
        if (link.indexOf('youtube.com/') > -1 && link.indexOf('?v=') > -1) {
            return true 
        } else {
            return false
        }
      }
    }
  }

</script>
