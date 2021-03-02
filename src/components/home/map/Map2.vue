<template>
    <div class="common-header-wrap">
      <mt-header title="定位" class="common-header">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      </mt-header>
  </div>

      <div class="map-wrapper">
	
        <baidu-map
        	class="map" 
        	:center="{lng: 116.404, lat: 39.915}" 
        	:zoom="15" 
        	:scroll-wheel-zoom="true" 
        	:style="select"
        	@click="getPoint"> 
          <bm-control>
	<button class="button small" @click="handleToggleDrawer">Menu</button>
             	<div class="ui-form-area">
            		<div class="ui-form-control">
            		<input v-model="keyword" type="text" placeholder="名称" class="ui-form-input  "></div>
            	</div>
          </bm-control>
         	<bm-local-search :keyword="keyword" :auto-viewport="true" /> 
        	<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="getPoint"></bm-geolocation>
   
        	<bm-marker :position="add.p" >
          
        		<bm-info-window :show="add.show" @close="pWindowClose"  style="font-size: 14px">
         
        		<p>地址：{{ add.site }}</p>
          
        		</bm-info-window>
        	</bm-marker>
        		
          </baidu-map>
      </div>

</template>

<script>


import { mapState, mapMutations } from 'vuex'

export default {
  name: 'HomeMap',
  data () {
    return {
	select:{width:'100%', height:'',marginBottom: '10px'},
      	lng: 0,
      	lat: 0,
	  add: {
	  	show: false,
	  	p:{lng: 0, lat: 0},
	  	 siteName:'',
	  	site: ''
	  },
    }
  },


  created: function () {

  },
  computed: {
    ...mapState({
      member_point: state => state.member.point
    })
  },
  methods: {
...mapMutations({
      memberPoint: 'memberPoint'
    }),


	hh(){this.select.height=(window.innerHeight)-30+'px'},
	getPoint(e){  

    		this.add.show = true;
	
		this.add.p = e.point;
		let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
			
		geocoder.getLocation(e.point,rs=>{

				this.add.site = rs.address;
});
		//this.memberPoint({ point: { lng: this.add.p.lng, lat: this.add.p.lat, address: this.add.site, cityCode: '' } })

	},
	pWindowClose () {
	  this.add.show = false
	},
	
	pWindowOpen () {
	   setInterval(()=>{
	   this.add.show = true
	 },100)
	},
    setPosition (lat, lng, name, cityCode) {
      this.memberPoint({ point: { lng: lng, lat: lat, address: add.site, cityCode: cityCode } })
      this.$router.go(-1)
    }
  },
  mounted(){
  	this.hh();
  }
}
</script>

<style >
.map {
  width: 100%;
}
input,input:focus{outline: none; border: none;}

.ui-form-area{margin-bottom: 1em;}

.ui-form-control{padding: 0.6em 1em 0.65em; border-radius: 1.5em; background-color: #eee;}

.ui-form-input{width: 100%; background-color: transparent;}

.ui-form-input,
.ui-form-input:focus{outline: none; border: none; color: #2c333a; font-size: 0.9em;}

input::-webkit-input-placeholder{color: #7a7a7a;}

input:-moz-placeholder{color: #7a7a7a;}

input::-moz-placeholder{color: #7a7a7a;}

input:-ms-input-placeholder{color: #7a7a7a;}
</style>
