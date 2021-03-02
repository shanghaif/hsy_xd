<template>
	<div class="full_delivery_d hsy_main">
		<!-- 头部 -->
		<head-title title="满即送详情" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" bgcolor='#626771' color="#FFFFFF"></head-title>
	
		<!-- 详情 -->
		<div class="det">
			<p class="tit">{{info.mansong_name}}</p>
			<div class="top">
				<p>活动类型：{{info.mansong_type|nameFilter}}</p>
				<p>活动状态：{{info.mansong_state_text}}</p>
				<p>开始时间：{{info.mansong_starttime|filterReturndateTime}}</p>
				<p>结束时间：{{info.mansong_endtime|filterReturndateTime}}</p>
			</div>

			<ul>
				<li v-for="(v,i) in list" :key="i">
					<p>
						单笔订单满
						<span class="old_price">{{v.mansongrule_price}}</span>
						元
					</p>
					<p v-if="v.mansongrule_discount">
						,立减现金
						<span class="new_price">{{v.mansongrule_discount}}</span>
						元
					</p>
					<p v-if="v.mansong_goods_name">送礼品:{{v.mansong_goods_name}}</p>
				</li>
			</ul>
			<p v-if="info.mansong_remark">备注：{{info.mansong_remark}}</p>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { Indicator, Toast, MessageBox } from 'mint-ui';
import { getMansongGetails } from '../../../api/sellerPromotion';
import '@/assets/style/hsy-mint.scss';
import HeadTitle from '../../HeadTitle';

export default {
	name: 'Goodsonline',
	components: {
		HeadTitle
	},
	data() {
		return {
			mansong_id:this.$route.query.mid,
			info:{
				mansong_starttime:new Date().getTime()/1000,
				mansong_endtime:new Date().getTime()/1000,
			},
			list:[],
		};
	},

	filters:{
		nameFilter(v){
			if(v==1){
				return "仅零售";
			}else if(v == 2){
				return "仅团购";
			}else{
				return "零售和团购";
			}
		},
		filterReturndateTime(v){
			var d=new Date(v*1000);
			var year=d.getFullYear();
			var month=change(d.getMonth()+1);
			var day=change(d.getDate());
			var hour=change(d.getHours());
			var minute=change(d.getMinutes());
			var second=change(d.getSeconds());
			function change(t){
					if(t<10){
						return "0"+t;
					}else{
						return t;
					}
			}
			var time=year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
			return time;
		},
	},
	created() {
		// console.log(this.$route.query.mid);
		this.fun_goDetails()
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// 去详情
		fun_goDetails(){
			// this.$router.push
			Indicator.open();
			getMansongGetails(this.mansong_id).then(res=>{
				Indicator.close();
				this.info = res.result.mansong_info;
				this.list = res.result.rule_list;
			}).catch(err=>{
				Indicator.close();
				Toast(err.message);
			})
		}
	}
};
</script>

<style scoped lang="scss">
.full_delivery_d{
	.det{
		padding: 1rem 1.43rem;
		font-size: 1.6rem;
		.tit{
			font-size: 1.8rem;
			margin: 1rem 0;
			font-weight: 500;
			text-align: center;
		}
		.old_price{
			color: #40CDB2;
		}
		.new_price{
			color: #F05949;
		}

		.top{
			p{
				border-bottom: 1px solid #bbb;
				margin: .8rem 0;
			}
		}

		ul{
			li{
				border-bottom: 1px solid #bbb;
				margin: .8rem 0;
				display: flex;
				flex-wrap: wrap;
				p{
					width: 48%;
				}
			}
		}
	}
}
</style>
