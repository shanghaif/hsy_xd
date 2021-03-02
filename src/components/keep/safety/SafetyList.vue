<template>
	<div class="brand_item">
    <head-title  id="a-top" title="安全员管理"></head-title>
    
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
						@click="$router.push({ name: 'KeepSafetyForm', query: { safety_id: item.safety_id } })">
						<div class="p-info">
							<div class="iten-content">安全员姓名：{{ item.safety_name }}</div>
							<div class="name">安全员地址：{{item.area_name}}&nbsp;{{ item.area_info }}</div>
							<div class="buyer-info">手机号： {{ item.safety_phone }}</div>
              <span v-if='item.status==1'>待审核</span>
              <span v-if='item.status==2'>已开启</span>
              <span v-if='item.status==3'>已撤销</span>
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
import { keepSafetyList } from '../../../apikeep/safety';
export default {
	data() {
		return {
      list:[
        { name : '已开启', id:'2' },
        { name : '已撤销', id:'3' },
        { name : '待审核', id:'1' },
      ],
			params: {
        page      : 0,    //页数
        per_page  : 10,   // 一次的条数
        status: '2',   // 类型
      },
      
      
			loading      : false,   // 是否加载更多
			isMore       : true,    // 是否有更多
			complaintList: false,   // 安全员列表
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
        page      : 0,    //页数
        per_page  : 10,   // 一次的条数
        status: id,   // 类型
      },
      this.getComplaintList(false);
    },

    
    // 滑动加载
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getComplaintList(true);
			}
		},
    
    // 查询函数
		getComplaintList(ispush) {
			Indicator.open();
      let params = this.params;
      keepSafetyList(params).then(res => {
        Indicator.close();
				if (res) {
					if (ispush && this.complaintList) {
						this.complaintList = this.complaintList.concat(res.result.store_list);
					} else {
						this.complaintList = res.result.store_list;
          };
          
          this.isMore = res.result.hasmore;
				}
			}).catch(err=>{
        Indicator.close();
        Toast(err.message);
      })
    },
    
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
