<template>
	<div class="brand_item">
    <head-title  id="a-top" title="信息处理"></head-title>
    
    <div class="s_text">
      <ul>
        <li
          v-for="(v,i) in list"
          :key="(i)"
          :class="{brand_active: params.status == v.id}" @click="fun_changeSabrand_id(v.id)" >
          {{v.name}}
          <p class="line"></p>
        </li>
      </ul>
    </div>
    <!-- 列表 -->
    <div class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div v-if="complaintList && complaintList.length">
				<div class="goods-item" v-for="(item, index) in complaintList" :key="index">
					<div class="goods-info"
						@click="$router.push({ name: 'KeepMessageForm', query: { text_id: item.text_id } })">
						<div class="p-info">
							<div class="buyer-info">上报人员: {{ item.safety_name }}</div>
							<div class="buyer-info">上报时间: {{ new Date(item.add_time*1000).toLocaleString() }}</div>
							<div class="iten-content">上报标题：{{ item.text_title }}</div>
							<!-- <div class="name">内容：{{ item.text_desc?item.text_desc:"暂无描述" }}</div> -->
              <span v-if="item.end_time">已处理</span>
						</div>
					</div>
				</div>
			</div>
			<empty-record2 isFrom='content' v-else-if="complaintList && !complaintList.length"></empty-record2>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { Toast, Indicator } from 'mint-ui'
import { mapState } from 'vuex';

import HeadTitle from '../HeadTitle';
import EmptyRecord2 from '../EmptyRecord2';
import { getComplaintList } from '../../../apikeep/report';
export default {
	data() {
		return {
      list:[
        { name : '待处理', id:'1' },
        { name : '已处理', id:'2' },
      ],
			params: { 
        page: 0,
				per_page: 10,
        status: 1,
				store_id: 30,
      },
      
      
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			complaintList: false, // 商品列表
			goodsList: false,
		}
  },
  components:{
    'head-title' : HeadTitle,
    'empty-record2' : EmptyRecord2
  },
	computed: {
    ...mapState({
      keepInfo : state => state.keep.keepInfo,   // 获取 登录信息
      keepToken : state => state.keep.keepToken,  // token
    }),

  },
  created(){
    if(!this.keepInfo){
      this.$router.push( { name : 'KeepLogin'} );
      return false;
    }
   
  },
	mounted() {
    resetRem();
	},
	destroyed() {
    resumeRem();
	},
	methods: {
    // 切换 标题
    fun_changeSabrand_id(id){
      this.params ={ 
        page: 1,
				per_page: 10,
        status: id,
				store_id: 30,
      },
      this.getComplaintList(false);
    },
    
    // 查询函数
		getComplaintList(ispush) {
			Indicator.open();
      let params = this.params;
      console.log(params);
			getComplaintList(params).then(res => {
        Indicator.close();
				if (res) {
					if (ispush && this.complaintList) {
						this.complaintList = this.complaintList.concat(res.result.safetytext_list);
					} else {
						this.complaintList = res.result.safetytext_list;
					}
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
          }          
				}
			});
		},
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getComplaintList(true);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.brand_item{

  // 搜索文本
  .s_text{
    overflow: auto;
    padding: 1rem 1.43rem;
    height: 2.4rem;
    padding-bottom: 0;
    position: fixed;
    top: 3.74rem;
    width: 100%;
    background: #fff;
    z-index: 9;
    ul{
      font-size: 1.56rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      li{
        padding: 0 .22rem;
        text-align: center;
        height: 2.4rem;
        line-height: 2.2rem;
        flex-shrink: 0;
        margin: 0 2vw 0 0;
        color: #A4ABB3;
        p{
          width: 2.36vw;
          height: 0.885vw;
          margin: 0 auto;
          border-radius: 3px;
        }
      }
      
      .brand_active{
        color:#2A303C;
        .line{
          background: linear-gradient(270deg, #FF8F7A 0%, #E73919 100%);
        }
      }
    }
  }

.list{
  margin-top: 4rem;
}
  .goods-item {
    background: #fff;
    padding: 0.95rem 1.43rem;
    margin-bottom: 0.95rem;
    margin: 0.95rem;
    border-radius: 1rem;
    position: relative;
    box-shadow: 0px 0px 2vw 0px rgba(6, 6, 7, 0.08);
  }
  
	.p-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		span{
			position: absolute;
			top: 1rem;
			right: 1rem;
			color: #D83A15;
		}
		div {
			font-size: 1.14rem;
			font-weight: 400;
			color: #6F6F6F;
			margin: 1rem 0;
		}
		.iten-content {
			display: -webkit-box;
			    -webkit-box-orient: vertical;
			    -webkit-line-clamp: 2;
		}
		.name {
			
		}
		.buyer-info {
			
		}
	}
}
</style>
