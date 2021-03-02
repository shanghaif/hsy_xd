<template>
  <div id="app" ref="main">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {

  },
  watch:{
    $route(){
      let main =this.$refs.main;
      main.scrollTo(0,0)
    }
  },
  created: function () {

  }
}
</script>
<style>
	#app {
		overflow-y: auto;
	}
</style>