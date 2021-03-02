<template>
<div>
	<div class="container FullDeliveryAdd" >
		<!-- 头部 -->
		<head-title title="新增满即送" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" bgcolor='#626771' color="#FFFFFF"></head-title>
		

		<div class="add-cook hsy_main">

			<div class="add-cook-list">
				<span>活动名称:</span>
				<input type="text" maxlength="30" placeholder="请输入活动名称" v-model="mansong_name" />
			</div>

			<div class="add-cook-list" @click="showCookLvPicker">
				<span>活动类别:</span>
				<input type="text" placeholder="请选择" readonly="readonly" v-model="typeName" />
				<img src="@/assets/image/icon2/icon-right.png" alt="" />
			</div>
			

			<div class="add-cook-list" @click="onDate('start')">
				<span>开始时间:</span>
				<input type="text" placeholder="请选择开始时间" readonly="readonly" v-model="nameStartTime" />
				<img src="@/assets/image/icon2/icon-right.png" alt="" />
			</div>

			<div class="add-cook-list" @click="onDate('end')">
				<span>结束时间:</span>
				<input type="text" placeholder="请选择结束时间" readonly="readonly" v-model="nameEndTime" />
				<img src="@/assets/image/icon2/icon-right.png" alt="" />
			</div>
			<ul class="none reaArr">
				<li v-for="(v,i) in mansong_rule" :key="i">					
					单笔订单满<span>{{v.oldPrice}}</span>元
					<span v-if="v.newPrice">,  立减现金{{v.newPrice}}元</span>
					<span v-if="v.goods_name">，送礼品{{v.goods_name}}</span>
					<button class="del" @click="deleteArr(i)">×</button>
				</li>
			</ul>
			<!-- 添加保存按钮 -->
			<ul class="data_cont" v-if="newObj">
				<li>
					<div class="add-cook-list">
						<span>单笔订单满:</span>
						<input placeholder="请输入" type="number" v-model="newObj.oldPrice">
					</div>
					<div class="add-cook-list">
						<span>立减现金:</span>
						<input placeholder="请输入" type="number" v-model="newObj.newPrice">
					</div>
					<div class="add-cook-list">
						<span>送礼品</span>
						<span class="chao" v-show="newObj.goods_name">{{newObj.goods_name}}</span>
						<button @click="$refs.qualify.showState = true">选择礼品</button>
						<div class="yes_no">							
							<button @click="yesBtn">确定</button>
							<button @click="noBtn">取消</button>
						</div>
					</div>
				</li>
			</ul>

			<div class="btn_cont" @click="addArr" v-if="!newObj">
				<p>        
					<i>+</i>
					添加规则
				</p>
    	</div>

			
			<div class="add-cook-list none" style="align-items: baseline">
				<span>活动备注:</span>
				<textarea placeholder="请输入活动描述" v-model="remark" name="" id="" cols="80" rows="4"></textarea>
			</div>

			<mt-datetime-picker ref="datePicker1" type="datetime" :startDate="new Date()" yearFormat="{value}年" monthFormat="{value}月"
			dateFormat="{value}日" :value="(new Date())" @confirm="dateConfirm1">
			</mt-datetime-picker>
			<!-- <mt-datetime-picker ref="datePicker1" type="date" :startDate="new Date()" yearFormat="{value}年" monthFormat="{value}月"
			dateFormat="{value}日" :value="(new Date())" @confirm="dateConfirm1">
			</mt-datetime-picker> -->


		<mt-button class="hsy_btn hsy_f"
			@click="submit"
			>保存</mt-button>
		</div>
		<one-drop-down @pickOneDropDown="pickSlectResult" ref="CookLvPicker" :items="values"></one-drop-down>
		<qualify-checklist @onQualifyChoose="fun_receiveQualify" ref="qualify"/>
	</div>
</div>
</template>

<script>
import '@/assets/style/hsy-mint.scss';
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast, Indicator, MessageBox } from 'mint-ui';

import OneDropDown from '@/components/OneDropDown';
import { saveMansong } from '../../../api/sellerPromotion';
import QualifyChecklist from "./QualifyChecklist"

export default {
	data() {
		return {	
			mansong_name: null,  // 活动名称
      start_time: null,       // 活动开始 时间
      end_time: null,           // 活动结束时间
      mansong_type: null,   // 类型
			mansong_rule: [],    // 多个
			remark:null,  // 备注
			
			newObj: null,    // 新的 内容
			
			values: [{ name: '仅零售', id: 1 }, { name: '仅社团', id: 2 }, { name: '零售和社团', id: 3 }],
			typeName:null,

			timeType:null,  // 时间类型
			nameStartTime:null,
			nameEndTime:null,
		};
	},
	components: {
		'one-drop-down':OneDropDown,
    "qualify-checklist":QualifyChecklist,
		HeadTitle
	},

	// filters:{
	// 	nameFilte(v){
	// 		console.log(v);
	// 	}
	// },

	created(){
	},

	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// 添加
		addArr(){
			if( !this.newObj ){
				this.newObj = {				
					oldPrice: null,
					newPrice: null,
					goods_id:null,
					goods_name:null,
				};
			}else{
				this.newObj = null;
			}
		},
		

		dateTimeReturn(v){
			var d=new Date(v);
			var year=d.getFullYear();
			var month=change(d.getMonth()+1);
			var day=change(d.getDate());
			var hour=change(d.getHours());
			var minute=change(d.getMinutes());
			// var second=change(d.getSeconds());
			function change(t){
					if(t<10){
						return "0"+t;
					}else{
						return t;
					}
			}
			var time=year+'-'+month+'-'+day+' '+hour+':'+minute+':00';
			return time;
		},
		
		// 确定
		yesBtn(){
			// console.log('你好');
			// console.log('是5');
			// console.log(this.newObj.oldPrice,this.newObj.newPrice);
			// console.log( (+this.newObj.oldPrice) > (+this.newObj.newPrice) && (+this.newObj.newPrice)>0);
			if( (+this.newObj.oldPrice) > (+this.newObj.newPrice) ){
				if( (+this.newObj.newPrice <= 0 ) && !this.newObj.goods_id ){
					Toast("请输入满减金额或者选择赠送商品");
				}else{					
					this.mansong_rule.push(
						{
							oldPrice:this.newObj.oldPrice,
							newPrice:this.newObj.newPrice,
							goods_id:this.newObj.goods_id,
							goods_name:this.newObj.goods_name,
						}
					);
					this.newObj = null;
				}
			}else{
				Toast("请检查满减价格");
			}
		},
		// 取消
		noBtn(){
			this.newObj = null;
		},

		// 删除
		deleteArr(index){
      MessageBox.confirm('确定要删除此规格吗？').then(action => {		
				this.mansong_rule.splice(index,1);
			})
			// console.log(this.mansong_rule);
		},

    // 选择合格证
    fun_receiveQualify(item){
			// console.log(item);
			this.newObj.goods_name = item.goods_name;
			this.newObj.goods_id = item.goods_id;
    },

		// 调用 类型
		showCookLvPicker() {
			this.$refs.CookLvPicker.currentValue = true;
		},

		pickSlectResult(values) {
			// console.log(values, 'pickOneDropDown');
			this.mansong_type = values[0].id;
			this.typeName = values[0].name;
		},

		// 选择时间
		
		onDate(values) {
			this.timeType = values;
			this.$refs.datePicker1.open();
		},
		//获取当前时间，格式YYYY-MM-DD
    getNowFormatDate(v) {
        var date = new Date(v);
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
		dateConfirm1(v) {
			// var day = this.getNowFormatDate(v);

			// var nameTime = v.toLocaleDateString();
			// var reallyTime =  Date.parse( new Date( new Date(day).getTime() - 8*60*60*1000) );
			// reallyTime /= 1000;
			var reallyTime = new Date(v).getTime();
			reallyTime -= reallyTime%(60*1000);
			reallyTime = reallyTime/1000;
			// console.log(this.start_time,this.end_time,reallyTime);
			// console.log(this.obj.start_time,this.obj.end_time,reallyTime);
			// console.log(reallyTime);
			if( this.timeType == 'start' ){
				if( !this.end_time || this.end_time > reallyTime){
					this.nameStartTime =  this.dateTimeReturn(v);
					this.start_time = reallyTime;
				}else{
					Toast("开始时间不得大于结束时间");
				}
			}else{
				if( !this.start_time || this.start_time < reallyTime){
					this.nameEndTime = this.dateTimeReturn(v);
					this.end_time = reallyTime;
				}else{					
					Toast("结束时间不得小于开始时间");
				}
			}
			
		},

		// 提交
		submit() {
			var arr = [];
			// console.log(arr);
			if( !this.mansong_name ){
				Toast("请输入活动名称");
				return false;
			}
			if( this.mansong_name.length>30 ){
				Toast("活动名称不得大于三十个字符");
				return false;
			}
			if( !this.mansong_type ){
				Toast("请选择折扣类型");
				return false;
			}
			if( !this.start_time ){
				Toast("请选择开始时间");
				return false;
			}
			if( !this.end_time ){
				Toast("请选择结束时间");
				return false;
			}
			for(var item of this.mansong_rule ){
				arr.push(`${item.oldPrice},${item.newPrice?item.newPrice:0},${item.goods_id?item.goods_id:0}`)
			}
			if( !arr.length ){
				Toast("请添加满减规则");
				return false;
			}
			// console.log(this.obj);
			// return false;
			Indicator.open();
			saveMansong( this.mansong_name, this.mansong_type, this.start_time,this.end_time,arr, this.remark).then(res=>{
				Indicator.close();
				Toast(res.message);
				this.$router.go(-1);
			}).catch(err=>{
				Indicator.close();
				Toast(err.message);
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.FullDeliveryAdd {
	&/deep/.picker-items {
		.picker-slot{
			font-size: 1.34rem;
		}
	}
	.header-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.24rem 1.43rem;
		font-size: 1.52rem;
		font-weight: 400;
		color: #161616;
		margin-bottom: 1.43rem;
		img {
			width: 1.71rem;
			height: 1.71rem;
		}
	}
	.add-cook {
		padding-bottom: 8.8rem;
		.reaArr{
			li{
				position: relative;
				padding: 1.19rem 3rem 1.19rem 1rem;
				margin-left: 1.43rem;
				border-bottom: 1px solid #eee;
				.del{
					position: absolute;
					right: 1.43rem;
					top: 1rem;
					width: auto;
					padding: .1rem 0.68rem;
					background: #e53216;
					z-index: 1;
					color: #fff;
					border-radius: 8px
				}
			}
		}

		.data_cont{
			background: #eee;
			input{
				background: #eee;
			}
			li{
				border-bottom: 1px solid #fff;
			}
		}
    // 添加 按钮
    .btn_cont{
      display: flex;
      justify-content: center;
      flex-direction: column;

      font-size: 1.24rem;
      font-weight: 400;
      color: #6f6f6f;
      text-align: center;
      color: #E53216;
      min-height: 48px;

      background-color: #fff;
      box-sizing: border-box;

			p{
				margin: 0 1.43rem;
				background: #eee;
				padding: .5rem 0;
			}
    }

		.add-cook-list {
			position: relative;
			display: flex;
			justify-content: space-between;
			padding: 1.19rem 1.43rem 1.19rem 1rem;
			margin-left: 1.43rem;
			align-items: center;
			border-bottom: 1px solid #eee;

			.yes_no{
				button{
					margin: 0 .2rem;
					background: #999;

					&:first-child{
						background: #fc6952;
					}
				}
			}

			button{
				width: auto;
				padding: .1rem 1rem;
				background: #3480c1;
				color: #fff;
				border-radius: 8px;
			}
			
			&:after {
				content: '*';
				color: red;
				font-size: 1.2rem;
				position: absolute;
				left: 0.1rem;
				top: 1.5rem;
			}
			span {
				font-size: 1.33rem;
				font-weight: 400;
				color: #161616;
				margin-right: 1.43rem;
				flex-shrink: 0;
			}
			.chao{			
				max-width: 6.2rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			input {
				flex-grow: 1;
				font-size: 1.33rem;
			}
			img {
				width: 1.33rem;
				height: 1.33rem;
			}
			textarea{
				resize: none;
			}
		}
		.addcooknone{
			border: 0;
		}
		.none{
			&:after {
				content: '';
				display: none;
			}

		}
		.submit-button {
			position: absolute;
			bottom: 3.5rem;
			left: 1.43rem;
			right: 1.43rem;
			height: 3.8rem;
			line-height: 3.8rem;
			text-align: center;
			background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
			box-shadow: 0rem 0rem 0.95rem 0rem rgba(251, 104, 84, 0.5);
			border-radius: 1.9rem;
			font-size: 1.33rem;
			font-weight: 400;
			color: #ffffff;
		}
	}
}
</style>
