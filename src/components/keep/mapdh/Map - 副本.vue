<template>
  <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15" :scroll-wheel-zoom="true" :style="select" >

<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
  
    <bm-copyright
      anchor="BMAP_ANCHOR_TOP_RIGHT"
      :copyright="[{id: 1, content: '', bounds: {ne: {lng: 110, lat: 40}, sw:{lng: 0, lat: 0}}}, {id: 2, content: '<a>@好食源</a>'}]">
    </bm-copyright>

    <bm-marker :position="markerPoint" :dragging="true" @mouseout="infoWindowClose" @mouseover="infoWindowOpen" @click="infoWindowOpen" :icon="{url:tubiao, size: {width: 32, height: 32}}">
      <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">{{Cname}}</bm-info-window>
    </bm-marker>

</baidu-map>
</template>
<script>

import icon1 from '../../../assets/image/home/home-search-hot.png';
 export default {
	data () {
  		return {
    			select:{width:'100%', height:'',marginBottom: '10px'},
			markerPoint:{lng: 116.404, lat: 39.915},
			autoLocationPoint: {lng: 0, lat: 0},
       			 initLocation: false,
			Cname:'背景',
			tubiao:icon1,
			show: false
   		 }
	},
computed: {

},
	methods: {  
  		hh(){this.select.height=(window.innerHeight)-30+'px'},
   		infoWindowClose () {  this.show = false  },
    		infoWindowOpen () { this.show = true },

   	 },
	mounted(){
  		this.hh();
	}
}
</script>
<style>
.map {
  width: 100%;
}
</style>