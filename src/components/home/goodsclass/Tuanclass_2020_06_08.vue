<template>
	<div class="container">
		<div class="common-header-wrap">
			<mt-header  :title="tlname" class="common-header">
				<mt-button slot="left" icon="back" @click="goBack"></mt-button>
			</mt-header>
		</div>
      <div v-if="type==2"class="ui-form-area" @click="onRegion">
     <div class="ui-form-control"><input type="text" v-model="area_info" placeholder="地区" class="ui-form-input"></div>
    </div>
  <div  v-if="type==2"class="ui-form-area">
  <div class="ui-form-control register-form-select" @change="csel">   
	<select class="ui-form-input" v-model='tid'>
	
 <option value=999>选择社区团</option> 
	<option v-for='(item,index) of c' :key='index' :value='item.member_id' >{{ item.tuan}}</option> 
	</select>

 </div> 
</div>  
<region-picker ref="picker" v-on:onConfirm="onPickerConfirm"></region-picker>
<tuanclass-body ref="tuan"></tuanclass-body>

	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast, Indicator } from 'mint-ui'
import RegionPicker from '../../../components/RegionPicker'
import { tuanlist ,tuangc} from '../../../api/homesearch'
import TuanclassBody from './TuanclassBody'
export default {
  components: {
    RegionPicker,
    TuanclassBody
  },



  data () {
    return {
      popMap: false,
        area_info: '菏泽市 曹县 曹城镇',
        area_id: 37172101,
        c:[],
        tclass:[],
	tid:999,
	tlname:'社区团购',
	tlnames:['',
		'零售市场',
		'社区团购',
		'批发市场',
		' ',
		'集采市场'],
	type:2
    }
  },
  computed: {
    ...mapState({
      token: state => state.member.token,
	tid1:state =>state.member.tid,
	tsids:state =>state.member.tsids,
	tcids:state =>state.member.tcids,
	area_info:state =>state.member.tarea_info,
	area_id:state =>state.member.tarea_id,
               mclass:state => state.member.mclass,
    }),
    getSumitTitle () {
      let isFromCheckout = this.$route.query.isFromCheckout
      if (isFromCheckout) {
        return '保存并使用'
      } else {
        return '保存'
      }
    }
  },
mounted(){
this.tid=this.tid1
this.type= this.$route.query.type
this.tlname=this.tlnames[this.type]
this.gclass()
},
  created: function () {
      tuanlist(this.area_id, this.token).then(res => {
	this.c=res.result
	console.log(this.c)
	})
  },
  methods: {
    ...mapMutations({
       membertuans: 'memberTuans'
    }),
  test () {
	 tuangc(this.tuanid, this.token).then(res => {console.log(res)})
},
csel(){
	tuangc(this.tid, this.token).then(res => {
		var sa=this.$_.map(res.result.cid, function(s){return s.gc_id_3})
		var sa1=this.$_.map(res.result.sid, function(s){return s.store_id})
		this.tcids=sa
		this.tsids=sa1
		this.$refs.tuan.tcids=sa
		this. membertuans({tid:this.tid,tsids:sa1,tcids:sa,tarea_info:this.area_info,tarea_id:this.area_id,mclass:2})
	//	this.$forceUpdate()
console.log(this.tsids)
	})
},
gclass(){
	if(this.type!=2){
	        let n=	this.type*(-1)
	        tuangc(n, this.token).then(res => {
		var sa=this.$_.map(res.result.cid, function(s){return s.gc_id_3})
		var sa1=this.$_.map(res.result.sid, function(s){return s.store_id})
		this.tcids=sa
		this.tsids=sa1
		this.$refs.tuan.tcids=sa
		this. membertuans({tid:0,tsids:sa1,tcids:sa,tarea_info:this.area_info,tarea_id:this.area_id,mclass:this.type})
		this.$forceUpdate()
		console.log(this.tcids)
	     })
	}
},
goBack () {
      this.$router.go(-1)
    },


    submit () {

    },
    onRegion (picker, values) {
      this.$refs.picker.currentValue = true
    },
    onPickerConfirm (values) {
      this.area_info = this.getRegionStr(values)
      this.area_id = values[2].area_id
      tuanlist(this.area_id, this.token).then(res => {
	this.c=res.result
	console.log(this.c)
	})

    },
    getRegionStr (values) {
      let title = ''
      for (let i = 0; i < values.length; i++) {
        const element = values[i]
        if (i !== 0) {
          title = title + ' ' + element.area_name
        } else {
          title = title + element.area_name
        }
      }
      return title
    },

  }
}
</script>

<style lang="scss" scoped>
	.right-arrow{transform: rotate(-90deg);color:#ddd;font-size: .6rem;display: inline-block;}
	.input-wrap{position: relative;
		i{position: absolute;right:0;top:0;line-height: 2.4rem;display: block;width:2rem;text-align: center;font-size: 1rem}
	}

.ui-form-control{padding: 0.2em 0.5em 0.2em; border-radius: 0.1em; background-color: #fff;}
.register-form-select{position: relative; z-index: 1;}
.ui-form-input{width: 100%; background-color: transparent;}
.ui-form-input,
.ui-form-input:focus{outline: none; border: none; color: #2c333a; font-size: 0.6em;}
.ui-form-area{margin-bottom: 0.5em;width: 49%; display:inline-block;}
</style>
