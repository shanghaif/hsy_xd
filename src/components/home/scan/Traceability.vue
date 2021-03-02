<template>
<div class="Traceability">
  <!-- 顶部返回栏 -->
  <div class="head-title"> 
		<img @click="$router.go(-2)" src="@/assets/image/brand/h5_l_f.png" alt="" />   
    <!-- 标题 -->
    <div class="title">
      <p>好食源食品溯源</p>
      <span>FOOD TRACEABILITY</span>
    </div>
    <p class="Source-code">
      溯源码：{{goodsInfo.suyuan}}
    </p>
  </div>
  <!-- 主体 -->
  <div class="cont">
    <!-- 食品信息  -->
    <div class="line2">
      <span class="msg_text">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAtCAMAAABLcrECAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEUz1ZQFj1kz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQy1JMGkFoFj1kFj1kFj1kFj1kFj1kFj1kFj1kFj1kz1ZQy1JMy05Ix0pEw0JAvz48uzY0ty4wsyooqyIkpxocoxIUmwoQlwIIjvYAiu34huXwft3oetHgcsncasHUZrXMXq3EWqW8Vp20TpGsSomkQoGgPnmYOnGQMmmMLmWEKl2AJlV4IlF0HklwGkVsGkFoFj1kAAAC8cs3rAAAAFXRSTlMAAAmB3PkKxYKA3fz83N6DgQrFCfm78318AAAAAWJLR0Q8p2phzwAAAAd0SU1FB+QLGhAHIo9yAY0AAACKSURBVBjTNcbnWoIAAEDRywgyRAG11MpRmjYcuVrv/159hff8OhBG8UUchZCkvT9pwmWv1iA+74rsupZxI/piIIbiVtyJezESYzERU/EgHsVMzMWTWIileBYv4lW8iZVYi43YinexE3txEEdxEh/iU3yJ5netSf5Ta9E+r6Cs/lOVBJ0i7+ZFJ/gFXFk6zWMd4JwAAAAASUVORK5CYII=" class="jx">
        食品信息
      </span>
      <ul class="van-cell-group">
        <li><div>食品名称</div>
          <div>
            {{goodsInfo.goods_name}}
          </div>
        </li>
        <li><div>食品分类</div>
          <div>
            {{goodsInfo.gc_name}}
          </div>
        </li>
        <li v-if="!goodsInfo.port_province"><div>产地</div>
          <div>
            {{goodsInfo.goods_chandi}}
          </div>
        </li>
        <li><div>供货商</div>
          <div>
            {{goodsInfo.goods_gonghuo}}
          </div>
        </li>
        <li v-if="goodsInfo.license_plate"><div>运输车辆</div>
          <div>
            {{goodsInfo.license_plate}}
          </div>
        </li>
        <li><div>平台进货商</div>
          <div>
            {{goodsSuyuan[0]}}
          </div>
        </li>
        <li><div>平台销售商</div>
          <div>
            {{goodsSuyuan[1]}}
          </div>
        </li>
      </ul>
    </div>

    <div class="line2"
      v-if="goodsInfo.port_province">
      <span class="msg_text">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAtCAMAAABLcrECAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEUz1ZQFj1kz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQy1JMGkFoFj1kFj1kFj1kFj1kFj1kFj1kFj1kFj1kz1ZQy1JMy05Ix0pEw0JAvz48uzY0ty4wsyooqyIkpxocoxIUmwoQlwIIjvYAiu34huXwft3oetHgcsncasHUZrXMXq3EWqW8Vp20TpGsSomkQoGgPnmYOnGQMmmMLmWEKl2AJlV4IlF0HklwGkVsGkFoFj1kAAAC8cs3rAAAAFXRSTlMAAAmB3PkKxYKA3fz83N6DgQrFCfm78318AAAAAWJLR0Q8p2phzwAAAAd0SU1FB+QLGhAHIo9yAY0AAACKSURBVBjTNcbnWoIAAEDRywgyRAG11MpRmjYcuVrv/159hff8OhBG8UUchZCkvT9pwmWv1iA+74rsupZxI/piIIbiVtyJezESYzERU/EgHsVMzMWTWIileBYv4lW8iZVYi43YinexE3txEEdxEh/iU3yJ5netSf5Ta9E+r6Cs/lOVBJ0i7+ZFJ/gFXFk6zWMd4JwAAAAASUVORK5CYII=" class="jx">
        冷链信息
      </span>
      <ul class="van-cell-group">
        <li><div>生产批次</div>
          <div>
            {{goodsInfo.batch_number}}
          </div>
        </li> 
        <li><div>食品流入地类型</div>
          <div>
            {{goodsInfo.port_province==1?'口岸':'省份'}}
          </div>
        </li>
        <li><div>食品流入地名称</div>
          <div>
            {{goodsInfo.access_information}}
          </div>
        </li>
        <li><div>报关单号</div>
          <div>
            {{goodsInfo.odd_numbers}}
          </div>
        </li>
        <li><div>入境日期</div>
          <div>
            {{new Date(goodsInfo.entry_date*1000).toLocaleDateString()}}
          </div>
        </li>
        <li><div>入境口岸</div>
          <div>
            {{goodsInfo.entry_ka}}
          </div>
        </li>     
        <li v-if="goodsInfo.sourcecold_storage"><div>来源地冷库</div>
          <div>
            {{goodsInfo.sourcecold_storage}}
          </div>
        </li>
        <li v-if="goodsInfo.cold_storage"><div>存储冷库</div>
          <div>
            {{goodsInfo.cold_storage}}
          </div>
        </li>
        <li><div>入库日期</div>
          <div>
            {{new Date(goodsInfo.join_warehouse_time*1000).toLocaleDateString()}}
          </div>
        </li>
        <li><div>原产国</div>
          <div>
            {{goodsInfo.goods_chandi}}
          </div>
        </li>
        <li><div>报检重量</div>
          <div>
            {{goodsInfo.inspection_weight}}
          </div>
        </li>
        <li><div>收货人</div>
          <div>
            {{goodsInfo.consignee}}
          </div>
        </li>
        <li><div>发货人</div>
          <div>
            {{goodsInfo.consignor}}
          </div>
        </li>
        <li><div>规格</div>
          <div>
            {{goodsInfo.specifications}}
          </div>
        </li>
      </ul>
    </div>
    
    
    <!-- 冷链证明 -->
    <div class="line2">
      <span class="msg_text">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAtCAMAAABLcrECAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEUz1ZQFj1kz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQy1JMGkFoFj1kFj1kFj1kFj1kFj1kFj1kFj1kFj1kz1ZQy1JMy05Ix0pEw0JAvz48uzY0ty4wsyooqyIkpxocoxIUmwoQlwIIjvYAiu34huXwft3oetHgcsncasHUZrXMXq3EWqW8Vp20TpGsSomkQoGgPnmYOnGQMmmMLmWEKl2AJlV4IlF0HklwGkVsGkFoFj1kAAAC8cs3rAAAAFXRSTlMAAAmB3PkKxYKA3fz83N6DgQrFCfm78318AAAAAWJLR0Q8p2phzwAAAAd0SU1FB+QLGhAHIo9yAY0AAACKSURBVBjTNcbnWoIAAEDRywgyRAG11MpRmjYcuVrv/159hff8OhBG8UUchZCkvT9pwmWv1iA+74rsupZxI/piIIbiVtyJezESYzERU/EgHsVMzMWTWIileBYv4lW8iZVYi43YinexE3txEEdxEh/iU3yJ5netSf5Ta9E+r6Cs/lOVBJ0i7+ZFJ/gFXFk6zWMd4JwAAAAASUVORK5CYII=" class="jx">
        追溯证明
      </span>
      <ul class="van-cell-group">
        <li v-if="goodsInfo.goods_chandipic">
          <div>产地证明</div>
          <img-viewer :options="options" @inited="inited" class="viewer" ref="viewer">
            <template>
              <img :src="goodsInfo.goods_chandipic" :style="getBannerStyle1" />
            </template>
          </img-viewer>
        </li>
        <li v-if="goodsInfo.goods_gonghuopic">
          <div>供货商证明</div>
          <img-viewer :options="options" @inited="inited" class="viewer" ref="viewer">
            <template>
              <img :src="goodsInfo.goods_gonghuopic" :style="getBannerStyle1" />
            </template>
          </img-viewer>
        </li>
        <li v-if="goodsInfo.goods_jianyan">
          <div>检验报告</div>
          <img-viewer :options="options" @inited="inited" class="viewer" ref="viewer">
            <template>
              <img :src="goodsInfo.goods_jianyan" :style="getBannerStyle1" />
            </template>
          </img-viewer>
        </li>
      </ul>
    </div>
    
    <!-- 商家信息 -->
    <div class="line2">
      <span class="msg_text">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAtCAMAAABLcrECAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEUz1ZQFj1kz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQy1JMGkFoFj1kFj1kFj1kFj1kFj1kFj1kFj1kFj1kz1ZQy1JMy05Ix0pEw0JAvz48uzY0ty4wsyooqyIkpxocoxIUmwoQlwIIjvYAiu34huXwft3oetHgcsncasHUZrXMXq3EWqW8Vp20TpGsSomkQoGgPnmYOnGQMmmMLmWEKl2AJlV4IlF0HklwGkVsGkFoFj1kAAAC8cs3rAAAAFXRSTlMAAAmB3PkKxYKA3fz83N6DgQrFCfm78318AAAAAWJLR0Q8p2phzwAAAAd0SU1FB+QLGhAHIo9yAY0AAACKSURBVBjTNcbnWoIAAEDRywgyRAG11MpRmjYcuVrv/159hff8OhBG8UUchZCkvT9pwmWv1iA+74rsupZxI/piIIbiVtyJezESYzERU/EgHsVMzMWTWIileBYv4lW8iZVYi43YinexE3txEEdxEh/iU3yJ5netSf5Ta9E+r6Cs/lOVBJ0i7+ZFJ/gFXFk6zWMd4JwAAAAASUVORK5CYII=" class="jx">
        商家信息
      </span>
      <ul class="van-cell-group">
        <li>
          <div>商家名称</div>
          <div>{{storeInfo.store_name}}</div>
        </li>
        <li>
          <div>法人</div>
          <div>{{storeInfo.lianxiren}}</div>
        </li>
        <li>
          <div>商家地址</div>
          <div>{{storeInfo.area_info}}</div>
        </li>
        <li>
          <div>商家编号</div>
          <div>{{storeInfo.bianhao}}</div>
        </li>        
      </ul>
    </div>

    

  </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import { getGoodsQrcodeInfo } from '../../../api/homegoodsdetail';

import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer/src/component.vue';

export default {
  data () {
    return {
      goods_commonid:this.$route.query.goods_commonid,//传过来的id
      goodsInfo: {
        suyuan:null,
      } ,  //  商品信息
      storeInfo: {
        store_name:null,
      } ,  //  店铺信息
      
			options: {
				button: true, //右上角按钮
				zoomable: true, //是否可以缩放
				movable: true, //是否可以移动
				transition: true, //使用 CSS3 过度
				fullscreen: true, //播放时是否全屏
				keyboard: true, //是否支持键盘
				title: false, //当前图片标题
				tooltip: false, //显示缩放百分比
				navbar: false, //底部缩略图
				toolbar: false, //底部工具栏
				rotatable: false, //是否可旋转
				scalable: false //是否可翻转
			},
    }
  },
  
  computed:{  
		getBannerStyle1: function() {
			const { width, height } = window.screen;
			var width1 = (width - 0) * 0.3;
			var height1 = (height - 0) * 0.3;
			return {
				maxWidth: width1 + 'px',
				maxHeight: height1 + 'px'
			};
    },
    // 供货商 销售商
    goodsSuyuan(){
			if ( this.goodsInfo.goods_suyuan != null) {
				var sA = this.goodsInfo.goods_suyuan.split('|');
        return [sA[0],sA.pop()];
			} else {
				return ['暂无信息','暂无信息']
      }
    }
  },

  components:{
		'img-viewer': Viewer
  },

  created () {
    this.loading();
  },

  mounted(){
		let sw = document.documentElement.clientWidth;
    let html = document.documentElement;
    
    html.style.fontSize = (sw/7.5) + 'px';
		window.onresize = () => {
			let sw = document.documentElement.clientWidth;
			let html = document.documentElement;
      html.style.fontSize = (sw/7.5) + 'px';
    };
  },

  methods: {
    // 初始化函数
    loading(){
      // console.log(this.goods_commonid);
      // this.goods_commonid = 628;
      getGoodsQrcodeInfo(this.goods_commonid).then(res=>{
        // console.log(res);
        this.goodsInfo = res.result.goods_info;
        this.storeInfo = res.result.store_info;
      }).catch(err=>{
        Toast(err.mnessage);
      })
    },

    // 放大查看图片
		inited(viewer) {
			this.$viewer = viewer;
		}
  }
}
</script>

<style scoped lang="scss">
.Traceability{
  font-size: 0.14rem;
  height: 100vh;
  background: #f2f2f2;
  
  .head-title{
    height: 2.8rem;
    flex-grow: 0;
    width: 100vw;
    background: linear-gradient(139deg, #3CD3AD 0%, #4CB8C4 100%);
    box-shadow: 0px 0px 0.4rem 0px rgba(63, 206, 177, 0.4);
    position: relative;
    img{
      position: absolute;
      left: 0.3rem;
      top: 0.26rem;
      width: 0.4rem;
    }
    .title{
      position: absolute;
      top: 0.8rem;
      left: 0.8rem;
      color: #fff;
      font-size: 0.42rem;
      span{
        font-size: 0.32rem;
      }
    }
    .Source-code{
      margin: 0.6rem auto;
      border-radius: 0.1rem;
      padding: 0.2rem 0.32rem;
      background: #fff;
      margin: 0 auto;
      font-size: 0.26rem;
      position: absolute;
      bottom: -0.3rem;
      left: 0.3rem;
      width: 6.3rem;

    }
  }

  .cont{
    padding: 0.3rem;
    background: #f2f2f2;


    .line2{
      margin: 0.3rem auto;
      background-color: #fff;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      border-radius: 0.1rem;
      padding: 0 0 0.1rem 0;
      display: flex;

      .msg_text{
        color: #333;
        font-size: 0.32rem;
        padding: 0.2rem 0.3rem;
        background-color: #f3fffa;
        font-weight: 700;
        border-radius: 0.1rem 0.1rem 0 0;
        border-width: 0.1rem;
        .jx{
          width: 0.08rem;
          -ms-flex-item-align: center;
          align-self: center;
          margin-right: 0.1rem;
        }
      }

      .van-cell-group {
        width: 100%;
        position: relative;
        background-color: #fff;

        >li {
          position: relative;
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          box-sizing: border-box;
          width: 100%;
          padding: 0.2rem 0.32rem;
          overflow: hidden;
          color: #323233;
          font-size: 0.26rem;
          line-height: 0.48rem;
          background-color: #fff;
          &:not(:last-child):after {
            position: absolute;
            box-sizing: border-box;
            content: " ";
            pointer-events: none;
            right: 16px;
            bottom: 0;
            left: 16px;
            border-bottom: 1px solid #ebedf0;
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
          }

          >div{
            >img{
              border-radius: 0.16rem;
              border: 1px solid #eee;
            }
            &:last-child {
              flex: 1;
              position: relative;
              overflow: hidden;
              color: #969799;
              text-align: right;
              vertical-align: middle;
              word-wrap: break-word;
            }
          }

         
        }
      }
    }

  }
}
</style>