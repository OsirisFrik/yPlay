<template>
    <md-snackbar md-position="center" :md-duration="duration" :md-active.sync="activeAlert" md-persistent>
        <span>{{message}}</span>
    </md-snackbar>
</template>
<script>
export default {
    name: 'Alert',
    props: {
        activeAlert: Boolean,
        message: String
    },
    data() {
        return {
            duration: 4000            
        }
    }
}
</script>

