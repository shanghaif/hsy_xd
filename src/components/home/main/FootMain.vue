<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-26 15:22:46
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-02 15:48:30
-->
<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-15 17:18:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-26 14:44:08
-->
<template>		
  <div class="foot">
    <ul>
      <li :class="{ active: $route.name == 'HomeIndex' }">
        <router-link :to="{ name: 'HomeIndex' }" class="item">
          <img :src="$route.name == 'HomeIndex' ? iconHomeSe : iconHome" alt="" />
          <span class="text">首页</span>
        </router-link>
      </li>
      <li :class="{ active: $route.name == 'HomeGoodsclass' }">
        <router-link :to="{ name: 'HomeGoodsclass' }" class="item">
						<img :src="$route.name == 'HomeGoodsclass' ? iconFenleiSe : iconFenlei" alt="" />
          <span class="text">分类</span>
        </router-link>
      </li>
      <li :class="{ active: $route.name == 'HomeMapdh' }">
        <router-link :to="{ name: 'HomeMapdh' }" class="item">
          <img :src="$route.name == 'HomeMapdh' ? iconMapdhSe : iconMapdh" alt="" />
          <span class="text">导航</span>
        </router-link>
      </li>
      <li :class="{ active: $route.name == 'HomeFaxian' }">
        <router-link :to="{ name: 'HomeFaxian' }" class="item">
          <img :src="$route.name == 'HomeFaxian' ? iconFaxianSe : iconFaxian" alt="" />
          <span class="text">发现</span>
        </router-link>
      </li>
      <li :class="{ active: $route.name == 'MemberIndex' }">
        <router-link :to="{ name: 'MemberIndex' }" class="item">
          <img :src="$route.name == 'MemberIndex' ? iconMySelect : iconMy" alt="" />
          <span class="text">我的</span>
        </router-link>
      </li>
    </ul>
	</div>
</template>

<script>
export default {
	data(){
		return{
			iconHome:  require('../../../assets/image/icon2/tabbar-index.png'),
			iconHomeSe: require('../../../assets/image/icon2/tabbar-index2.png'),
			
			iconFenlei: require('../../../assets/image/icon2/tabbar-fenlei.png'),
			iconFenleiSe: require('../../../assets/image/icon2/tabbar-fenlei2.png'),
			
			iconMapdh:require('../../../assets/image/icon2/tabbar-nav.png'),
			iconMapdhSe: require('../../../assets/image/icon2/tabbar-nav2.png'),
			
			iconFaxian: require('../../../assets/image/icon2/tabbar-faxian.png'),
			iconFaxianSe: require('../../../assets/image/icon2/tabbar-faxian2.png'),
			
			iconMySelect:require('../../../assets/image/icon2/tabbar-my2.png'),
			iconMy:require('../../../assets/image/icon2/tabbar-my.png')
		}
	},

	methods:{	
		
	},
}
</script>

<style scoped lang="scss">
// 底部	
.foot{
  $bor:0px;
  div,ul,li,p,span,input,img{
    box-sizing: border-box;
  }
  flex: 0;
  height: 1.1rem;
  background: #fbfbfb;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .active{
    .item{
      span{
        color: #e93b3d;
      }
    }
  }
  ul{
    height: 100%;
    display: flex;
    justify-content: space-between;
    li{
    height: 100%;
      width:20%;
      .item{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        img{    
          width: 0.4rem;
          margin-top: 0.22rem;
        }
        span{
          font-size: 0.20rem;
          color: #666;
          position: absolute;
          bottom: 0.08rem;
        }
      }
    }
  }
}
</style>