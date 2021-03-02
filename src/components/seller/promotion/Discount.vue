<template>
	<div class="hsy_main">
		<div class="p_discount">	
			<div class="top-wrap">
				<!-- 头部 -->
				<head-title title="多买惠管理" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" bgcolor='#626771' color="#FFFFFF"></head-title>
				
				<!-- header -->
				<div class="order-header">
					<div class="seller-search">
						<input type="text" placeholder="请输入您要搜索的活动" v-model="keyword" />
						<img src="@/assets/image/icon2/icon-white-search.png" alt="" @click="setOrderNavActive(goods_type)" />
					</div>
					<ul>
						<li class="item" 
							v-for="item in orderNav"
							v-bind:key="item.id"
							v-bind:class="{ active: goods_type == item.id }"
							v-on:click="setOrderNavActive(item.id)">
							{{ item.name }}
						</li>
					</ul>
				</div>

			</div>
			<!-- 主题 -->
      <div class="cont" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">

        <ul  v-if="xianshi_list.length>0">

          <li  class="details" v-for="(item,index) in xianshi_list" :key="index" >
            <div class="top">
              <span>{{item.xianshi_name}}</span>
              <span>{{item.xianshi_title}}</span>
              <span>{{item.xianshi_type}}</span>
            </div>
            <div class="top top48">
              <span>{{ item.xianshi_starttime|filterReturndateTime}}</span>
              <span>{{ item.xianshi_end_time|filterReturndateTime}}</span>
            </div>
            <div class="bottom">
              <span>{{item.xianshi_state_text}}</span>
              <span>{{item.xianshi_explain?item.xianshi_explain:"暂无描述"}}</span>
            </div>

            <div class="item-more" 
              @click="popupMore(item.xianshi_id)"
              >
              <span></span>
              <span></span>
            </div>

            
            <ul class="goods-btn" v-show="item.xianshi_id == nowIndex">
              <li v-show="item.editable" @click="fun_goDetails('SellerDiscountEdit')">编辑</li>
              <li @click="fun_goDetails('SellerDiscountTube')">管理</li>
              <li @click="fun_Delete(item.xianshi_id)">删除</li>
            </ul>

          </li>
          <li  class="end_loading" v-show="isMore">
            <span>加载中...</span>
          </li>
        </ul>
			  <empty-record2 isFrom='content' v-else></empty-record2>
      </div>
		</div>
		
		<!-- 新增 按钮 -->
		<mt-button class="hsy_btn hsy_f"
			@click="$router.push( { name: 'SellerDiscountEdit'})"
			>
			新增
		</mt-button>
	</div>
</template>

<script>
import { Toast, Indicator, MessageBox } from 'mint-ui'
import { resetRem, resumeRem } from '@/util/rem';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import HeadTitle from '../../HeadTitle';
import '@/assets/style/hsy-mint.scss';

import { duomaihList, deleteDiscount } from '../../../api/sellerPromotion';

export default {
	components: {
		HeadTitle,
		EmptyRecord2
	},
	data() {
		return {
			keyword:'',
			goods_type: '0',
      params: { page: 0, per_page: 10 },
      
			busy: false, // 是否加载更多
      isMore: true, // 是否有更多
      
			xianshi_list: [],  // 数据
			nowIndex : null,
			orderNav: [
				{
					name: '全部',
					id: '0'
				},
				{
					name: '正常',
					id: '1'
				},
				{
					name: '已结束',
					id: '2'
				},
				{
					name: '管理员关闭',
					id: '3'
				}
			],

      sendTime:null,
		}
	},
	filters:{
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
    // this.setOrderNavActive(0);
    this.sendTime = new Date().getTime();
	},

	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},

	methods: {
		setOrderNavActive(index) {
      var nowTime = new Date().getTime();
      if( nowTime > this.sendTime + 680 ){
        // this.nowIndex = -1;
        // this.goods_type = index;

        // this.params.page = 1;
        // this.xianshi_list = [];
        // this.isMore = true;
        // this.getduomaihList();
        
        
        this.nowIndex = -1;
        this.goods_type = index;
        
        this.params.page = 1;
        this.xianshi_list = [];
        this.isMore = true;
        this.getduomaihList();
        this.sendTime = nowTime;
      }
		},

		loadMore() {
			this.busy = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.getduomaihList(true);
			}
    },

		// 获取 列表参数
		getduomaihList(ispush){
			if (this.isMore) {
        Indicator.open();
        duomaihList(this.params.page,this.keyword,this.goods_type).then(res=>{
          Indicator.close();
          if (ispush) {
            this.xianshi_list = this.xianshi_list.concat(res.result.xianshi_list);
          } else {
            this.xianshi_list = res.result.xianshi_list;
          }

          
          this.busy = false;  //  繁忙
          this.isMore = res.result.hasmore;  //  是否有更多数据
          
        }).catch(err=>{
          Indicator.close();
          Toast(err.message);
        })
      }
		},
		// 点击 小图标
		popupMore(i) {
			// console.log(i)
			// console.log(this.nowIndex);
			if(this.nowIndex == i) {
				this.nowIndex = -1;
				return
			}
			this.nowIndex = i;
		},

		// 点击 去编辑
		fun_goDetails(path){
			this.$router.push( { name: path, query:{mid: this.nowIndex} } );
		},

		// 点击 删除
		fun_Delete(id){
			// console.log(id);
      MessageBox.confirm('确定要删除此活动吗？').then(action => {			
				deleteDiscount(id).then(res=>{
					Toast(res.message);
			    this.params.page = 1;
					this.setOrderNavActive('0');
				}).catch(err=>{
					Toast(err.message);
				})
			}).catch(err=>{
				this.nowIndex = -1;
			})
		}

	}
};
</script>

<style scoped lang="scss">
.p_discount {
  background-color: #f4f5f7;
  display: flex;
  flex-direction: column;
  height: 100vh;

  div, ul, li {
    box-sizing: border-box;
  }

  .top-wrap {
    background-color: #626771;
    height: 11.17rem;
  }

  .order-header {
    width: 100%;

    ul {
      list-style: none;
      width: auto;
      display: flex;
      justify-content: space-around;
      align-content: center;
      align-items: center;
      height: 4.43rem;
      border-bottom: 1px solid #e8eaed;

      li {
        font-size: 1.24rem;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        height: 4.43rem;
        line-height: 4.43rem;

        &.active {
          font-weight: 600;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            bottom: 0.8rem;
            left: 50%;
            height: 0.24rem;
            width: 70%;
            background-color: #fff;
            transform: translate(-50%, 0);
            border-radius: 0.14rem;
          }
        }
      }
    }

    .seller-search {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 3rem;
      margin: 0 0;

      input {
        box-sizing: border-box;
        width: 80%;
        border-radius: 1.64rem;
        padding: 0.52rem 2rem 0.52rem 3rem;
        margin-right: 2rem;
      }

      img {
        width: 1.8rem;
        height: 1.8rem;
      }

      .mint-cell {
        min-height: 0;

        &:after {
          background-color: #fff !important;
        }
      }
    }
  }

  .cont {
    flex: 1;
    overflow: scroll;
    padding-bottom: 8.2rem;

    .details {
      padding: 1.43rem;
      position: relative;
      border-bottom: 2px solid #f4f5f7;
      background: #fff;
	    background-color: #fff;
      // padding: 0.43rem;
      // position: relative;
      // border-bottom: 2px solid #f4f5f7;
      // background: #fff;
      // margin: 1rem;
      .top {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding-right: 4rem;

        &:nth-child(2) {
          margin: 0.5rem 0;
        }

        span {
          &:nth-child(2){
            text-align: center;
          }
          &:last-child{
            text-align: right;
          }
          width: 33%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .top48{
        span{
          width: 48%;
        }
      }

      .bottom {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding-right: 4rem;

        span {
          // width: 72%;
          // flex: 1;
          width: 80%;
          &:first-child{
            width: 10%;
            margin-right: .5rem;
          }
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .item-more {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.74rem;
      position: absolute;
      width: 3rem;
      height: 2rem;
      background: #f4f5f7;
      border-radius: 0.74rem;
      position: absolute;
      right: 2rem;
      bottom: 50%;
      transform: translateY(50%);

      span {
        width: 0.39rem;
        height: 0.39rem;
        background: #D6D6D6;
        border-radius: 50%;

        &:first-child {
          margin-right: 0.33rem;
        }
      }
    }

    .goods-btn {
      position: absolute;
      right: 6rem;
      background: #fff;
      bottom: 38%;
      transform: translateY(50%);
      z-index: 100;
      -webkit-box-shadow: 0rem 0rem 0.95rem 0rem rgba(220, 220, 220, 0.5);
      box-shadow: 0rem 0rem 0.95rem 0rem rgba(220, 220, 220, 0.5);
      border-radius: 0.48rem;

      &::after {
        content: "";
        position: absolute;
        border-top: 0.8rem solid transparent;
        border-left: 0.8rem solid #fff;
        border-bottom: 0.8rem solid transparent;
        bottom: 50%;
        transform: translateY(50%);
        right: -0.8rem;
      }

      li {
        width: 6.72rem;
        text-align: center;
        height: 3.7rem;
        line-height: 3.7rem;
        border-bottom: 1px solid #EFEFEF;
        font-size: 1.14rem;
      }
    }

    

    .end_loading{
      text-align: center;
      background: #fff;
      padding: 1.43rem;
    }
  }
}
</style>
