<template>
<div>
	<div class="DiscountEdit" >
		<!-- 头部 -->
		<head-title :title="xianshi_id?'编辑多买惠':'新增多买惠'" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" bgcolor='#626771' color="#FFFFFF"></head-title>
		

		<div class="add-cook">

			<div class="add-cook-list">
				<span>活动名称:</span>
				<input type="text" maxlength="30" placeholder="请输入活动名称" v-model="obj.xianshi_name" />
			</div>
			<div class="add-cook-list">
				<span>活动标题:</span>
				<input type="text" maxlength="30" placeholder="请输入活动标题" v-model="obj.xianshi_title" />
			</div>
			<div class="add-cook-list">
				<span>购买下限:</span>
				<input type="number" maxlength="10" placeholder="请输入购买下限" v-model="obj.lower_limit" />
			</div>

			<div class="add-cook-list" @click="showCookLvPicker">
				<span>活动类别:</span>
				<!-- <input :class="{disabled:this.xianshi_id}" type="text" placeholder="请选择" readonly="readonly" v-model="typeName" /> -->
				<input type="text" placeholder="请选择" readonly="readonly" v-model="typeName" />
				<img src="@/assets/image/icon2/icon-right.png" alt="" />
			</div>
			

			<div class="add-cook-list" @click="onDate('start')">
				<span>开始时间:</span>
				<input :class="{disabled:this.xianshi_id}" type="text" placeholder="请选择开始时间" readonly="readonly" v-model="nameStartTime" />
				<img src="@/assets/image/icon2/icon-right.png" alt="" />
			</div>

			<div class="add-cook-list" @click="onDate('end')">
				<span>结束时间:</span>
				<input :class="{disabled:this.xianshi_id}" type="text" placeholder="请选择结束时间" readonly="readonly" v-model="nameEndTime" />
				<img src="@/assets/image/icon2/icon-right.png" alt="" />
			</div>
			<div class="add-cook-list none" style="align-items: baseline">
				<span>活动描述:</span>
				<textarea placeholder="请输入活动描述" v-model="obj.xianshi_explain" name="" id="" cols="80" rows="4"></textarea>
			</div>

			<mt-datetime-picker ref="datePicker1" type="datetime" :startDate="new Date()" yearFormat="{value}年" monthFormat="{value}月"
			dateFormat="{value}日" :value="(new Date())" @confirm="dateConfirm1">
			</mt-datetime-picker>
			<!-- <mt-datetime-picker ref="datePicker1" type="dateTime" :startDate="new Date()" yearFormat="{value}年" monthFormat="{value}月"
			dateFormat="{value}日" :value="(new Date())" @confirm="dateConfirm1">
			</mt-datetime-picker> -->


			<div class="submit-button" @click="submit">保存</div>
		</div>
		<one-drop-down @pickOneDropDown="pickSlectResult" ref="CookLvPicker" :items="values"></one-drop-down>
	</div>
</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast, Indicator, MessageBox } from 'mint-ui';

import OneDropDown from '@/components/OneDropDown';
import { duomaihAdd, getDiscountDetails, duomaihEditSave } from '../../../api/sellerPromotion';

export default {
	data() {
		return {
			obj:{
				xianshi_name :null,     // 活动名称
				xianshi_title :null,    // 活动标题
				xianshi_type : null,    // 折扣类型
				xianshi_explain : null, // 活动说明
				start_time : null,   // 活动开始时间
				end_time : null, // 活动结束时间
				lower_limit : null,  // 购买下限
			},
			xianshi_id: this.$route.query.mid,
			typeName:null,
			values: [{ name: '仅零售', id: 1 }, { name: '仅社团', id: 2 }, { name: '零售和社团', id: 3 }],

			timeType:null,  // 时间类型
			nameStartTime:null,
			nameEndTime:null,

			editChangeType:null,
		};
	},
	components: {
		'one-drop-down':OneDropDown,
		HeadTitle
	},

	created(){
		if( this.xianshi_id ){
			// console.log( this.xianshi_id );
			getDiscountDetails(this.xianshi_id).then(res=>{
				// console.log(res);
				this.obj = res.result;
				this.typeName = this.values[res.result.xianshi_type-1].name;
				this.nameStartTime = this.dateTimeReturn(res.result.xianshi_starttime*1000);
				// this.nameStartTime = new Date(res.result.xianshi_starttime*1000).toLocaleDateString();
				// this.nameEndTime =  new Date( res.result.xianshi_end_time *1000).toLocaleDateString();
				this.nameEndTime =  this.dateTimeReturn(res.result.xianshi_end_time *1000);

				this.editChangeType = res.result.xianshi_type;
			}).catch(err=>{
				Toast(err.message);
			})
		}
	},

	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {		
		// 调用 类型
		showCookLvPicker() {
			// if( !this.xianshi_id ){
				this.$refs.CookLvPicker.currentValue = true;
			// }
		},

		pickSlectResult(values) {
			if( !this.xianshi_id || (this.xianshi_id && this.editChangeType == values[0].id ) ){
				this.obj.xianshi_type = values[0].id;
				this.typeName = values[0].name;
			}else{
				
      	MessageBox.confirm('更改活动类别将会删除此活动内全部商品，确定更改？').then(action => {
					this.obj.xianshi_type = values[0].id;
					this.typeName = values[0].name;
				})
			}
		},

		// 选择时间
		
		onDate(values) {
			if( !this.xianshi_id ){
				this.timeType = values;
				this.$refs.datePicker1.open();
			}
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
			// console.log(v,this.dateTimeReturn(v));
			// var day = this.getNowFormatDate(v);
			// var reallyTime =  Date.parse( new Date( new Date(day).getTime() - 8*60*60*1000) );
			// reallyTime /= 1000;
			// console.log(reallyTime);

			// var nameTime = v.toLocaleDateString();
			var reallyTime = new Date(v).getTime();
			reallyTime -= reallyTime%(60*1000);
			reallyTime = reallyTime/1000;
			// console.log(this.obj.start_time,this.obj.end_time,reallyTime);
			if( this.timeType == 'start' ){
				if( !this.obj.end_time || this.obj.end_time > reallyTime){
					this.nameStartTime = this.dateTimeReturn(v);
					this.obj.start_time = reallyTime;
				}else{
					Toast("开始时间不得大于结束时间");
				}
			}else{
				if( !this.obj.start_time || this.obj.start_time < reallyTime){
					this.nameEndTime =  this.dateTimeReturn(v);
					this.obj.end_time = reallyTime;
				}else{					
					Toast("结束时间不得小于开始时间");
				}
			}
			console.log(JSON.stringify(this.obj));
			
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

		// 提交
		submit() {
			console.log(JSON.stringify(this.obj));
			// xianshi_name :null,     // 活动名称
			// xianshi_title :null,    // 活动标题
			// xianshi_type : null,    // 折扣类型
			// xianshi_explain : null, // 活动说明
			// start_time : null,   // 活动开始时间
			// end_time : null, // 活动结束时间
			// lower_limit : null,  // 购买下限
			if( !this.obj.xianshi_name ){
				Toast("请输入活动名称");
				return false;
			}
			if( this.obj.xianshi_name.length>30 ){
				Toast("活动名称不得大于三十个字符");
				return false;
			}
			if( !this.obj.xianshi_title ){
				Toast("请输入活动标题");
				return false;
			}
			if( this.obj.xianshi_title.length>30 ){
				Toast("活动名称不得大于三十个字符");
				return false;
			}
			if( !this.obj.xianshi_type ){
				Toast("请选择折扣类型");
				return false;
			}
			if( !this.obj.start_time ){
				Toast("请选择开始时间");
				return false;
			}
			if( !this.obj.end_time ){
				Toast("请选择结束时间");
				return false;
			}
			if( !this.obj.lower_limit ){
				Toast("请输入购买下限");
				return false;
			}
			// console.log(this.obj);
			// return false;
			Indicator.open();
				
			if( this.xianshi_id ){
				this.obj.xianshi_id =  this.xianshi_id;
				duomaihEditSave(this.obj).then(res=>{
					Indicator.close();
					Toast(res.message);
					this.$router.go(-1);
				}).catch(err=>{
					Indicator.close();
					Toast(err.message);
				})
			}else{
				duomaihAdd(this.obj).then(res=>{
					Indicator.close();
					Toast(res.message);
					this.$router.go(-1);
				}).catch(err=>{
					Indicator.close();
					Toast(err.message);
				})
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.DiscountEdit {
	&/deep/.picker-items {
		.picker-slot{
			font-size: 1.34rem;
		}
	}
	.disabled{
		color: #999;
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
		.add-cook-list {
			position: relative;
			display: flex;
			justify-content: space-between;
			padding: 1.19rem 1.43rem 1.19rem 1rem;
			margin-left: 1.43rem;
			align-items: center;
			border-bottom: 1px solid #eee;
			
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
