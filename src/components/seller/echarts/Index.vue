<template>
	<div class="container echart-index">
		<!-- 头部标签 -->
		<head-title title="统计分析"
			:iconleft="require('../../../assets/image/icon2/icon-white-back.png')"
			bgcolor='#626771'
			color="#FFFFFF">
		</head-title>
		
    <div class="search_cont">
      <!-- 文本搜索条件 -->
      <div class="s_text">
        <ul>
          <li
						@click="fun_clickTabbar(v)"
            v-for="(v,i) in list"
            :key="(i)"
            :class="{brand_active: sabrand_id == v.id}" >
            {{v.name}}
            <p class="line"></p>
          </li>
        </ul>
      </div>
    </div>

		<!-- 主题内容 -->
		<div class="over-scroll">
			<echart-sales v-if="sabrand_id == 1"></echart-sales>
			<conversion-rate v-if="sabrand_id == 2"></conversion-rate>
			<echart-user v-if="sabrand_id == 3"></echart-user>
			<echart-order v-if="sabrand_id == 4"></echart-order>
		</div>
		<!-- <div class="cont">
			<ul>
				<li v-for="(v, i) in evaluateList" :key="i" @click="fun_goModule(v.path)">
					<div>{{ v.name }}</div>
					<img class="img-back" src="@/assets/image/brand/h5_right.png" alt="" />
				</li>
			</ul>
		</div> -->

	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import EchartSales from './EchartSales';
import ConversionRate from './ConversionRate';
import EchartUser from './EchartUser';
import EchartOrder from './EchartOrder';
export default {
	data() {
		return {
			sabrand_id:1,
			list:[
				{ name:"销售走势", id:1 },
				{ name:"转化率分析", id:2 },
				{ name:"用户分析", id:3 },
				{ name:"订单分析", id:4 },
			],
			evaluateList: [
				{
					name: '转化率分析',
					id: 0,
					path:"SellerEchartsCVR"
				},
				{
					name: '用户分析',
					id: 1,
					path:"SellerEchartsUser"
				},
				{
					name: '订单分析',
					id: 2,
					path:"SellerEchartsOrder"
				},
			]
		};
	},
	components: {
		HeadTitle,
		'echart-sales':EchartSales,
		ConversionRate,
		'echart-user':EchartUser,
		'echart-order':EchartOrder
	},
	created() {
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		fun_goModule(path){
			this.$router.push({ name: path })
		},
		fun_clickTabbar(v){
			this.sabrand_id = v.id;
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	background-color: #f4f5f7;
}
.echart-index{
	display: flex;
	height: 100vh;
	flex-direction: column;

	.over-scroll{
		height: auto;
		overflow: scroll;
	}

	&/deep/.head_title_cont .header-wrap{
		height: auto;
	}
}
.list-wrap {
	padding-bottom: 16rem;
	margin-top: 0.95rem;
	min-height: 60vh;
	background-color: #fff;
}
// 弹性布局
@mixin item_flex {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
// 边距
$pmvw: 4vw;
@mixin fs_big {
	font-size: 4.58vw;
}
.cont {
	// height: 94vh;
	// border: 1px solid red;
	padding: 2vw $pmvw;
	overflow: scroll;
	box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.04);
	border-radius: 16px;
	li {
		@include item_flex;
		@include fs_big;
		margin: 2vw 0;
		background: #ffffff;
		color: #fff;
		box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;
		height: 11vw;
		line-height: 2.5;
		padding: 0 4vw;
		&:nth-child(1) {
			background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
		}
		&:nth-child(2) {
			background: #626771 linear-gradient(139deg, #66aeff 0%, #1369fa 100%);
		}
		&:nth-child(3) {
			background: linear-gradient(139deg, #3cd3ad 1%, #4cb8c4 100%);
		}
		&:nth-child(4) {
			background: #f4f5f7 linear-gradient(109deg, #8f94fb 0%, #6167d7 55%, #4e54c8 99%);
		}
		div {
			// background: #ffffff;
			height: 100%;
			width: 78vw;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		img {
			width: 4vw;
			height: 4vw;
			margin-top: 3.5vw;
		}
	}
}

  // 上面搜索条件
  .search_cont{
    font-size: 1.2rem;
    color: #666;
		background: #626771;
		margin-top: -1px;
    // height: 12.2vh;
    padding:0 0 0 0;
    // 搜索文本
    .s_text{
      // height: 3.3rem;
      // border: 1px solid pink;
      overflow: auto;
      /* padding-top: .4rem; */
      padding: 2.4vw 0;
      padding:2.4vw .7rem;
			padding: 1rem 1.43rem;
      // height: 11.734vw;

      ul{
        // font-size: 3.734vw;
    		font-size: 1.46rem;
        display: flex;
        justify-content: flex-start;
				justify-content: space-between;
        flex-wrap: nowrap;
        li{
          // padding: 0 .22rem;
          // background: pink;
          text-align: center;
          height: 2.4rem;
          line-height: 2.2rem;
          flex-shrink: 0;
          margin: 0 2vw 0 0;
          color: #A4ABB3;

					.line{
						margin-top: 2px;
						width: 2.36vw;
						height: 0.885vw;
						margin: 0 auto;
						border-radius: 3px;
						width: 20%;
						height: 2px;
						margin: 0 auto;
						border-radius: 4px;
					}

        }
				
				.brand_active{
					// font-weight: 600;
					color:#fdfdfd !important;
					// font-size: 4.66667vw;
					.line{
						// background: linear-gradient(270deg, #FF8F7A 0%, #E73919 100%);
						background: linear-gradient(270deg, #FF8F7A 0%, #fff 100%);
					}
				}
      }
    }
	}
</style>
