<template>
<div class="Traceability">
  <!-- 顶部返回栏 -->
  <div class="head-title"> 
		<img @click="$router.go(-1)" src="@/assets/image/brand/h5_l_f.png" alt="" />   
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

    <!-- 树形结构 -->
    <div class="line2">
      <span class="msg_text">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAtCAMAAABLcrECAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEUz1ZQFj1kz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQz1ZQy1JMGkFoFj1kFj1kFj1kFj1kFj1kFj1kFj1kFj1kz1ZQy1JMy05Ix0pEw0JAvz48uzY0ty4wsyooqyIkpxocoxIUmwoQlwIIjvYAiu34huXwft3oetHgcsncasHUZrXMXq3EWqW8Vp20TpGsSomkQoGgPnmYOnGQMmmMLmWEKl2AJlV4IlF0HklwGkVsGkFoFj1kAAAC8cs3rAAAAFXRSTlMAAAmB3PkKxYKA3fz83N6DgQrFCfm78318AAAAAWJLR0Q8p2phzwAAAAd0SU1FB+QLGhAHIo9yAY0AAACKSURBVBjTNcbnWoIAAEDRywgyRAG11MpRmjYcuVrv/159hff8OhBG8UUchZCkvT9pwmWv1iA+74rsupZxI/piIIbiVtyJezESYzERU/EgHsVMzMWTWIileBYv4lW8iZVYi43YinexE3txEEdxEh/iU3yJ5netSf5Ta9E+r6Cs/lOVBJ0i7+ZFJ/gFXFk6zWMd4JwAAAAASUVORK5CYII=" class="jx">
        追溯信息
      </span>
      
      <ul id="tree" class="ztree" style="overflow:auto;"></ul>
    </div>
    <mt-button v-if="goodsInfo.goods_state==1 && keepInfo.type != 99" class="btn_new" @click="submitInformation" >
      商品下架
    </mt-button>
    

  </div>
  <div class="foot">
			<ul>
				<li :class="{ active: $route.name == 'KeepIndex' }">
					<router-link :to="{ name: 'KeepIndex' }" class="item">
						<i :style="{color:$route.name == 'KeepIndex'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe682;</i>
						<span class="text">首页</span>
					</router-link>
				</li>
				<li :class="{ active: $route.name == 'KeepStoreclass' }">
					<router-link :to="{ name: 'KeepStoreclass' }" class="item">
						<i :style="{color:$route.name == 'KeepStoreclass'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe62d;</i>
						<span class="text">商家</span>
					</router-link>
				</li>
				<li :class="{ active: $route.name == 'KeepGoodsclass' }">
					<router-link :to="{ name: 'KeepGoodsclass' }" class="item">
						<i :style="{color:$route.name == 'KeepGoodsclass'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe6e7;</i>
						<span class="text">商品</span>
					</router-link>
				</li>
				<li :class="{ active: $route.name == 'KeepMapdh' }">
					<router-link :to="{ name: 'KeepMapdh' }" class="item">
						<i :style="{color:$route.name == 'KeepMapdh'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe657;</i>
						<span class="text">网格</span>
					</router-link>
				</li>
				<li :class="{ active: $route.name == 'KeepTransparent' }">
					<router-link :to="{ name: 'KeepTransparent' }" class="item">
						<i :style="{color:$route.name == 'KeepTransparent'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe68f;</i>
						<span class="text">透明</span>
					</router-link>
				</li>
			</ul>
		</div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { Toast,MessageBox } from 'mint-ui'
import { getGoodsQrcodeInfo } from '../../../api/homegoodsdetail';
import { keepGetGoodsZS, keepSetGoodsLockup } from '../../../apikeep/goods';

import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer/src/component.vue';

import '../../../assets/css/jquery.ztree.core.js';


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
    ...mapState({
      keepInfo : state => state.keep.keepInfo,    // 获取 登录信息
    }),
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
    // 下架 上架
    submitInformation(){
			MessageBox.confirm('您确定要下架此商品吗？').then(action => {        
        keepSetGoodsLockup(this.goods_commonid).then(res=>{
          Toast(res.message);
          this.goodsInfo.goods_state = 10;
        }).catch(err=>{
          Toast(err.message);
        })
			});
    },
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
      });
      keepGetGoodsZS(this.goods_commonid).then(res=>{
        // console.log(res);
        var setting = {
          view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false
          },
          data: {
            simpleData: {
              enable: true,
              idKey: "goods_commonid",
              pIdKey: "supplier_goods_id",
              rootPId: ""
            }
          },
          callback: {
            beforeClick: function (treeId, treeNode) {
              var zTree = $.fn.zTree.getZTreeObj("tree");
              if (treeNode.isParent) {
                zTree.expandNode(treeNode);
                return false;
              } else {
                return true;
              }
            }
          }
        };
        for(var item of res.result){
          item.name =  `[ ${item.store_name?item.store_name:"暂无"} ]  ( ${item.goods_storage} / ${item.goods_jhl} )`;
          // if( item.certificate_no == 0 ){
          //   item.certificate_no = new Date().getTime()+Math.random()*5;
          // }
          // if( !item.child ){
          //   if( !item.child_fa ){
          //     item.name =  `暂无 [${item.store_name?item.store_name:"暂无"}](${item.goods_name})`;
          //   }else{
          //     item.name =  `${item.child_fa.product_name} [${item.store_name?item.store_name:"暂无"}]（${item.goods_name}）`;
          //   }
          // }else{
          //   item.name = `${item.child.product_name} [${item.store_name?item.store_name:"暂无"}]（${item.goods_name}）`;
          // }
        }
        var zNodes = res.result;
        // console.log(zNodes)
        // return false;
        $(document).ready(function () {
          var t = $("#tree");
          t = $.fn.zTree.init(t, setting, zNodes);
          // demoIframe = $("#testIframe");
          // demoIframe.bind("load", loadReady);
          // var zTree = $.fn.zTree.getZTreeObj("tree");
          // zTree.selectNode(zTree.getNodeByParam("id", 101));

        });
        
      }).catch(err=>{
        Toast(err.mnessage);
      })
    },

    // 放大查看图片
		inited(viewer) {
			this.$viewer = viewer;
    },
    
    
    fun_getData(){
      getCertificate().then(res=>{      
        var zTree;
        var demoIframe;
        var zNodes;

        var setting = {
          view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false
          },
          data: {
            simpleData: {
              enable: true,
              // idKey: "id",
              // pIdKey: "pId",
              // idKey: "goods_id",
              // pIdKey: "goods_fa",
              idKey: "certificate_no",
              pIdKey: "certificate_pno",
              rootPId: ""
            }
          },
          callback: {
            beforeClick: function (treeId, treeNode) {
              var zTree = $.fn.zTree.getZTreeObj("tree");
              if (treeNode.isParent) {
                zTree.expandNode(treeNode);
                return false;
              } else {
                // demoIframe.attr("src", treeNode.file + ".html");
                return true;
              }
            }
          }
        };
        for(var item of res.result){
          if( item.certificate_no == 0 ){
            item.certificate_no = new Date().getTime()+Math.random()*5;
          }
          if( !item.child ){
            if( !item.child_fa ){
              item.name =  `暂无 [${item.store_name?item.store_name:"暂无"}](${item.num})`;
            }else{
              item.name =  `${item.child_fa.product_name} [${item.store_name?item.store_name:"暂无"}]（${item.num}）`;
            }
          }else{
            item.name = `${item.child.product_name} [${item.store_name?item.store_name:"暂无"}]（${item.num}）`;
          }
        }
        zNodes = res.result;
        // console.log(zNodes)
        $(document).ready(function () {
          var t = $("#tree");
          t = $.fn.zTree.init(t, setting, zNodes);
          // demoIframe = $("#testIframe");
          // demoIframe.bind("load", loadReady);
          // var zTree = $.fn.zTree.getZTreeObj("tree");
          // zTree.selectNode(zTree.getNodeByParam("id", 101));

        });

        function loadReady() {
          var bodyH = demoIframe.contents().find("body").get(0).scrollHeight,
            htmlH = demoIframe.contents().find("html").get(0).scrollHeight,
            maxH = Math.max(bodyH, htmlH), minH = Math.min(bodyH, htmlH),
            h = demoIframe.height() >= maxH ? minH : maxH;
          if (h < 530) h = 530;
          demoIframe.height(h);
        }
      
      })
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
    padding-bottom: 2.1rem;

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
  
  // 按钮
  .btn_new {
    background: linear-gradient(90deg, rgba(252, 105, 82, 1) 0%, rgba(229, 50, 22, 1) 100%);
    box-shadow: 0px 0px 20px 0px rgba(251, 104, 84, 0.5);
    border-radius: 40px;
    color: #fff;
    width: 92%;
    margin: 0 auto;
    bottom: 1.1rem;
    left: 4%;
    z-index: 1;
    position: fixed;
  }
  .foot{
    height: 1.1rem;
    background: #fbfbfb;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
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
          i{
            margin-top: .198rem;
            font-size: 0.52rem;
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
}

.ztree * {padding:0; margin:0; font-size:12px; font-family: Verdana, Arial, Helvetica, AppleGothic, sans-serif}
.ztree {
  margin:0; padding:5px; color:#333;
  &/deep/ li{
    padding:0; margin:.85rem 0; list-style:none; line-height:14px; text-align:left; white-space:nowrap; outline:0;
    // color:red;
    ul{ 
      margin:0; padding:0 0 0 18px;

    }
    ul.line{ background:url(../../../assets/css/img/line_conn.gif) 0 0 repeat-y;}

    a {
      padding:1px 3px 0 0; margin:0; cursor:pointer; height:17px; color:#333; background-color: transparent;
      text-decoration:none; vertical-align:top; display: inline-block;
      &:hover {text-decoration:underline}
      
      &.curSelectedNode {padding-top:0px; background-color:#FFE6B0; color:black; height:16px; border:1px #FFB951 solid; opacity:0.8;}
    }
    // a.curSelectedNode {padding-top:0px; background-color:#FFE6B0; color:black; height:16px; border:1px #FFB951 solid; opacity:0.8;}
    a.curSelectedNode {padding-top:0px; background-color:#FFE6B0; color:black; height:16px; border:1px #FFB951 solid; opacity:0.8;}
    a.curSelectedNode_Edit {padding-top:0px; background-color:#FFE6B0; color:black; height:16px; border:1px #FFB951 solid; opacity:0.8;}
    a.tmpTargetNode_inner {padding-top:0px; background-color:#316AC5; color:white; height:16px; border:1px #316AC5 solid;
      opacity:0.8; filter:alpha(opacity=80)}
    a.tmpTargetNode_prev {}
    a.tmpTargetNode_next {}
    a input.rename {height:14px; width:80px; padding:0; margin:0;
      font-size:12px; border:1px #7EC4CC solid; *border:0px}
 
 

 span {line-height:16px; margin-right:2px}
  span.button {
    line-height:0; margin:0;
    width:16px; height:16px;
    display: inline-block; vertical-align:middle;
    border:0 none; cursor: pointer;outline:none;
    background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
    background-image:url("../../../assets/css/img/zTreeStandard.png");
    *background-image:url("../../../assets/css/img/zTreeStandard.gif")
  }

 span.button.chk {width:13px; height:13px; margin:0 3px 0 0; cursor: auto}
 span.button.chk.checkbox_false_full {background-position:0 0}
 span.button.chk.checkbox_false_full_focus {background-position:0 -14px}
 span.button.chk.checkbox_false_part {background-position:0 -28px}
 span.button.chk.checkbox_false_part_focus {background-position:0 -42px}
 span.button.chk.checkbox_false_disable {background-position:0 -56px}
 span.button.chk.checkbox_true_full {background-position:-14px 0}
 span.button.chk.checkbox_true_full_focus {background-position:-14px -14px}
 span.button.chk.checkbox_true_part {background-position:-14px -28px}
 span.button.chk.checkbox_true_part_focus {background-position:-14px -42px}
 span.button.chk.checkbox_true_disable {background-position:-14px -56px}
 span.button.chk.radio_false_full {background-position:-28px 0}
 span.button.chk.radio_false_full_focus {background-position:-28px -14px}
 span.button.chk.radio_false_part {background-position:-28px -28px}
 span.button.chk.radio_false_part_focus {background-position:-28px -42px}
 span.button.chk.radio_false_disable {background-position:-28px -56px}
 span.button.chk.radio_true_full {background-position:-42px 0}
 span.button.chk.radio_true_full_focus {background-position:-42px -14px}
 span.button.chk.radio_true_part {background-position:-42px -28px}
 span.button.chk.radio_true_part_focus {background-position:-42px -42px}
 span.button.chk.radio_true_disable {background-position:-42px -56px}

 span.button.switch {width:18px; height:18px}
 span.button.root_open{background-position:-92px -54px}
 span.button.root_close{background-position:-74px -54px}
 span.button.roots_open{background-position:-92px 0}
 span.button.roots_close{background-position:-74px 0}
 span.button.center_open{background-position:-92px -18px}
 span.button.center_close{background-position:-74px -18px}
 span.button.bottom_open{background-position:-92px -36px}
 span.button.bottom_close{background-position:-74px -36px}
 span.button.noline_open{background-position:-92px -72px}
 span.button.noline_close{background-position:-74px -72px}
 span.button.root_docu{ background:none;}
 span.button.roots_docu{background-position:-56px 0}
 span.button.center_docu{background-position:-56px -18px}
 span.button.bottom_docu{background-position:-56px -36px}
 span.button.noline_docu{ background:none;}

  span.button.ico_open{
    margin-right:2px;
    // background-position:-110px -16px;
    background-position: -110px -32px;
    vertical-align:top; *vertical-align:middle}
 span.button.ico_close{
    margin-right:2px;
    // background-position:-110px 0;
    background-position: -110px -32px;
    vertical-align:top; *vertical-align:middle}
 span.button.ico_docu{
   margin-right:2px;
   background-position:-110px -32px;
   vertical-align:top; *vertical-align:middle}
 span.button.edit {
   margin-right:2px;
  //  background-position:-110px -48px;
    background-position: -110px -32px;
   vertical-align:top; *vertical-align:middle}
 span.button.remove {
   margin-right:2px;
  //  background-position:-110px -64px;
    background-position: -110px -32px;
   vertical-align:top; *vertical-align:middle}

 span.button.ico_loading{margin-right:2px; background:url(../../../assets/css/img/loading.gif) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}

ul.tmpTargetzTree {background-color:#FFE6B0; opacity:0.8; filter:alpha(opacity=80)}

span.tmpzTreeMove_arrow {width:16px; height:16px; display: inline-block; padding:0; margin:2px 0 0 1px; border:0 none; position:absolute;
	background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
	background-position:-110px -80px; background-image:url("../../../assets/css/img/zTreeStandard.png"); *background-image:url("../../../assets/css/img/zTreeStandard.gif")}

ul.ztree.zTreeDragUL {margin:0; padding:0; position:absolute; width:auto; height:auto;overflow:hidden; background-color:#cfcfcf; border:1px #00B83F dotted; opacity:0.8; filter:alpha(opacity=80)}
.zTreeMask {z-index:10000; background-color:#cfcfcf; opacity:0.0; filter:alpha(opacity=0); position:absolute}
 }

}
/* level style*/
/* span.button.level0 {
	display:none;
}
 ul.level0 {
	padding:0;
	background:none;
}*/
</style>