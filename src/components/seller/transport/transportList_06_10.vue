<template>
    <div class="container">
        <div class="common-header-wrap">
            <mt-header title="配送区域" class="common-header">
                <mt-button slot="left" icon="back" @click="goBack"></mt-button>
                <mt-button slot="right" @click="onSave">保存</mt-button>
            </mt-header>
        </div>
        <div class="mt-5"  style="height:300px;width:100%">

  	<el-cascader
		v-model="selarr"
    		:options="options"
   		 :props="props"
 		@change="change"
		ref="cascader"
		popper-class="elcss"
		collapse-tags
    		clearable>
	</el-cascader>

        </div>
    </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import { getAreaTree } from '../../../api/area'
import { offPayList,offPaySave } from '../../../api/homesearch'
export default {
  name: 'CostList',

  data () {
    return {
       props: { 
	multiple: true,
	value:'area_id',
	label:'area_name',
	children:'child' },
        options: [],
        selarr:[[37170000,37172100,37172101]],
      selarr1:[]
    }
  },
  computed: {
  
  },
  created: function () {
    getAreaTree().then(res => {
      this.options = res.result.area_list
    // console.log(res)
    })
  offPayList().then(res => {
	let n1
	let n2
	let n
	let arr1=[]
	let arr=[]
	let len = res.result.length
	for (var  i = 0; i <len; i++) {
		n=parseInt(res.result[i])
		if(n%100>0){
			n1=parseInt(n/10000)*10000
			n2=parseInt(n/100)*100
			arr1=[n1,n2,n]
			arr.push(arr1)
		}

	}
      //	console.log(res.result)
 //	console.log(arr)
	this.selarr=arr
    })
  },
  methods: {
	change(){
		let nodesObj = this.$refs['cascader'].getCheckedNodes()
		console.log(nodesObj )
		let arr=[]
		nodesObj.forEach((item) => {
          			arr.push(item.value)
       		 });
        
       		 console.log(arr);
		this.selarr1=arr;
		},
	onSave(){
//		alert('ddd')
		  offPaySave(this.selarr1).then(res => {
			//console.log(res)
			Toast('ok')
   		 })

	}

  }
}
</script>

<style scoped>
    .item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        background-color: #fff;
        border-bottom: 1px solid #e8eaed;
    }
    .bottom-wrapper {
        height: 2.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: stretch;
    }
    .bottom-left-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .bottom-right-wrapper {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: stretch;
    }
    .edit-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .delete-wrapper {
        margin-right: 0.5rem;
    }
    .subtitle {
        font-size: 0.7rem;
        color: #7c7f88;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        margin-left: 1rem;
        margin-right: 0.5rem;
    }
    .subtitle i{font-size:0.8rem;margin-right:.5rem;}
.el-cascader-panel{
width:400px;
height:300px;
overFlow-x:scroll; 
}
.elcss{
width:200px;
height:300px;
overFlow-x:scroll; 
}
</style>
